import faunadb from "faunadb";
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
} from "../actions/action.types";

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
});
const q = faunadb.query;

export const getEvents = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("seats"))),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );
  const events = data.map((event) => {
    event.id = event.ref.id;
    delete event.ref;
    return event;
  });

  return events;
};

export const getEventsById = async (id) => {
  const event = await faunaClient.query(
    q.Get(q.Ref(q.Collection("seats"), id))
  );
  event.id = event.ref.id;
  delete event.ref;
  return event;
};

export const updateSeats = async (eventList, data) => {
  eventList.map((singleEvent) => {
    switch (singleEvent.label) {
      case "webeye":
        if (data.webeye.events === 0) {
          break;
        }
        data.webeye.seats -= 1;
        break;
      case "coding":
        if (data.coding.events === 0) {
          break;
        }
        data.coding.seats -= 1;
        break;
      case "quiz":
        if (data.quiz.events === 0) {
          break;
        }
        data.quiz.seats -= 1;
        break;
      default:
        break;
    }
  });
  return await faunaClient.query(
    q.Update(q.Ref(q.Collection("seats"), "296089134289650185"), {
      data: data,
    })
  );
};
