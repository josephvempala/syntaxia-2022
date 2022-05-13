import { createRegistration, updateEvents } from "../../utils/dbActions";
const { v4: uuidv4 } = require("uuid");

export default async function handler(req, res) {
  try {
    console.log(req.body);
    const body = req.body;
    const eventsResult = await updateEvents(body.eventNames);
    if (!eventsResult) {
      res.status(404).json({ alert: "Error while updating seats" });
      return;
    }
    const registrationResult = await createRegistration(
      body.email,
      body.contact,
      uuidv4(),
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
}
