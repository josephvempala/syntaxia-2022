import axios from "axios";

const secret = process.env.RECAPTCHA_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405);
  }
  const { recaptchaValue } = req.body;

  const data = await axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaValue}`
    )
    .then((response) => response.data);
  if (data.success) {
    return res.status(200).json({ success: data.success });
  }
  return res.status(400).json({ error: "verify RECAPTCHA and try again" });
}
