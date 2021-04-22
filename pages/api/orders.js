import crypto from "crypto";
import { getEventsById, updateSeats } from "../../utils/fauna";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }
  const secret = "dheeraeesultana12345$";
  const { entity } = req.body.payload.payment;
  const { eventNames } = entity.notes;

  // signature verification
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    const eventList = eventNames.split(",");
    try {
      const existingRecord = await getEventsById("296089134289650185");

      if (!existingRecord) {
        res.status(404).json({ alert: "Record not FOUND" });
      }
      const updated = updateSeats(eventList, existingRecord.data);
      return res.status(200).json({ status: "ok" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong." });
    }
  } else {
    return res.status(403).json({ message: "403 Forbidden" });
  }
}
