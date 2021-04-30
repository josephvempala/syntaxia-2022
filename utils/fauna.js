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
    console.log(singleEvent);

    switch (singleEvent) {
      case CALL_OF_DUTY_MOBILE:
        if (data.CALL_OF_DUTY_MOBILE.events === 0) {
          break;
        }
        data.CALL_OF_DUTY_MOBILE.seats -= 1;
        break;
      case CAPTURE_THE_FLAG:
        if (data.CAPTURE_THE_FLAG.events === 0) {
          break;
        }
        data.CAPTURE_THE_FLAG.seats -= 1;
        break;
      case CODE_WAR:
        if (data.CODE_WAR.events === 0) {
          break;
        }
        data.CODE_WAR.seats -= 1;
        break;
      case VALORANT:
        if (data.VALORANT.events === 0) {
          break;
        }
        data.VALORANT.seats -= 1;
        break;
      case CYPHER:
        if (data.CYPHER.events === 0) {
          break;
        }
        data.CYPHER.seats -= 1;
        break;
      case WEB_EYE:
        if (data.WEB_EYE.events === 0) {
          break;
        }
        data.WEB_EYE.seats -= 1;
        break;
      case IT_HOOT:
        if (data.IT_HOOT.events === 0) {
          break;
        }
        data.IT_HOOT.seats -= 1;
        break;
      case SPEAKING_ART:
        if (data.SPEAKING_ART.events === 0) {
          break;
        }
        data.SPEAKING_ART.seats -= 1;
        break;
      case TECH_TALK:
        if (data.TECH_TALK.events === 0) {
          break;
        }
        data.TECH_TALK.seats -= 1;
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
