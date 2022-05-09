import Events from "./events";
import Registrations from "./registration";

export const getEventById = async (id) => {
  return Events.find({ seq: id });
};

export const getEvents = async () => {
  return await Events.find({});
};

export const updateEvents = async (seqIds) => {
  return await Events.updateMany(
    { seq: { $in: seqIds } },
    { $inc: { seats: -1 } }
  );
};

export const createRegistration = async (
  email,
  contact,
  order_id,
  razorpay_event_id,
  seqIds
) => {
  const events = await Events.find({ seq: { $in: seqIds } });
  const result = await Registrations.create({
    email,
    contact,
    order_id,
    events,
    razorpay_event_id,
  });
  return result;
};

export const getRegistration = async (razorpay_event_id) => {
  return await Registrations.find({ razorpay_event_id });
};
