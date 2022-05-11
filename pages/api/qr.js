import nextConnect from "next-connect";
import multer from "multer";
import { createRegistration, updateEvents } from "../../utils/dbActions";
import { MulterAzureStorage } from "multer-azure-blob-storage";
const { v4: uuidv4 } = require("uuid");

const upload = multer({
  storage: new MulterAzureStorage({
    connectionString:
      "DefaultEndpointsProtocol=https;AccountName=syntaxia;AccountKey=yXRtsWZFBrPJGGwN6Ox15zFeFSfz8+H+7EqMyGWxj+QVzfCoHqX3KSowZOSst8FUj7ODqUF1kj6lzUFIHlRTrA==;EndpointSuffix=core.windows.net",
    accessKey:
      "yXRtsWZFBrPJGGwN6Ox15zFeFSfz8+H+7EqMyGWxj+QVzfCoHqX3KSowZOSst8FUj7ODqUF1kj6lzUFIHlRTrA==",
    accountName: "syntaxia",
    containerName: "files",
    containerAccessLevel: "blob",
    blobName: (req, file) => uuidv4() + file.originalname,
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log(error);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.post(async (req, res) => {
  try {
    const body = JSON.parse(req.body.formdata);
    const eventsResult = await updateEvents(body.eventNames);
    if (!eventsResult) {
      res.status(404).json({ alert: "Error while updating seats" });
      return;
    }
    const registrationResult = await createRegistration(
      body.email,
      body.contact,
      uuidv4(),
      req.file.url,
      body.college,
      body.name,
      body.groupName,
      body.eventNames
    );
    if (!registrationResult) {
      res.status(404).json({ alert: "Error while updating seats" });
      return;
    }
    console.log(req.file);
    res.status(200).json({ data: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ alert: e.message });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
