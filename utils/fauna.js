import faunadb from "faunadb";
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
  console.log(data);
  eventList.map((singleEvent) => {
    switch (singleEvent) {
      case "webeye":
        data.webeye.seats++;
        break;
      case "coding":
        data.coding.seats++;
        break;
      case "quiz":
        data.quiz.seats++;
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
