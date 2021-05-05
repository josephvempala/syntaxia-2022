const Razorpay = require("razorpay");
import {
  CALL_OF_DUTY_MOBILE,
  CAPTURE_THE_FLAG,
  CODE_WAR,
  VALORANT,
  CYPHER,
  WEB_EYE,
  IT_HOOT,
  SPEAKING_ART,
  TECH_TALK,
} from "../../actions/action.types";

const { v4: uuidv4 } = require("uuid");

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
});

const amountHandler = (eventList) => {
  let amount = 0;
  eventList.map((singleEvent) => {
    switch (singleEvent) {
      case CALL_OF_DUTY_MOBILE: //2
        amount = amount + 2 * 40;
        break;
      case CAPTURE_THE_FLAG: //3
        amount = amount + 3 * 40;
        break;
      case CODE_WAR: //1
        amount = amount + 1 * 40;
        break;
      case VALORANT: //5
        amount = amount + 5 * 40;
        break;
      case CYPHER: //2
        amount = amount + 2 * 40;
        break;
      case WEB_EYE: //2
        amount = amount + 2 * 40;
        break;
      case IT_HOOT: //1
        amount = amount + 1 * 40;
        break;
      case SPEAKING_ART: //1
        amount = amount + 1 * 40;
        break;
      case TECH_TALK: //2
        amount = amount + 2 * 40;
        break;
      default:
        break;
    }
  });
  return amount;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "wrong request" });
  }
  const { eventNames } = req.body;
  const totalAmount = amountHandler(eventNames);
  const payment_capture = 1;
  const options = {
    amount: 1 * 100,
    currency: "INR",
    receipt: `syn-${uuidv4()}`,
    payment_capture,
    notes: { events: "" },
  };
  try {
    const response = await instance.orders.create(options);
    return res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
  res.end();
}
