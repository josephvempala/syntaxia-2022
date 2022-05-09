import crypto from "crypto";
import {
  createRegistration,
  getRegistration,
  updateEvents,
} from "../../utils/dbActions";
import dbConnect from "../../utils/mongoConnect";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }
  const secret = process.env.NEXT_PUBLIC_RAZORPAY_SECRET;
  const { entity } = req.body.payload.payment;
  const { eventNames } = entity.notes;

  // signature verification
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    const eventList = eventNames.split(",");
    try {
      const eventIdReg = await getRegistration(
        req.headers["x-razorpay-event-id"]
      );
      if (!eventIdReg.length === 0)
        return res.status(200).json({ status: "ok" });
      const result = await updateEvents(eventList);
      if (!result) {
        res.status(404).json({ alert: "Error while updating seats" });
      }
      await createRegistration(
        entity.email,
        entity.contact,
        entity.order_id,
        req.headers["x-razorpay-event-id"],
        eventList
      );
      return res.status(200).json({ status: "ok" });
    } catch (error) {
      return res.status(500).json({ msg: "Something went wrong." });
    }
  } else {
    return res.status(403).json({ message: "403 Forbidden" });
  }
}
