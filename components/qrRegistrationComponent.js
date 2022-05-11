import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { MultiSelect } from "react-multi-select-component";
import {
  Button,
  ListGroupItem,
  Table,
  ListGroup,
  Row,
  Col,
  Alert,
} from "reactstrap";
import axios from "axios";
import useSWR from "swr";
import MySpinner from "../components/MySpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
import ReCAPTCHA from "react-google-recaptcha";
import ReactNoSsr from "react-no-ssr";
import FormData from "form-data";

const fetcher = async () => {
  const res = await axios
    .get("/api/events")
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return res;
};

export async function getServerSideProps() {
  const res = await fetcher("/api/events");
  return { props: { res } };
}

const QRRegistrationComponent = ({ res }) => {
  const scrollRef = useRef(null);
  const fileRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState(null);
  const recaptchaRef = React.createRef();
  const { data } = useSWR("/api/events", fetcher, {
    initialData: res,
    refreshInterval: 5000,
  });
  const events = data ?? [];

  const setOptions = (() => {
    const options = events
      .filter((singleEvent) => singleEvent.seats > 0)
      .map((x) => ({ label: x.name, value: x.seq }));
    return options.length > 0 ? options : [];
  })();
  const handleValidSubmit = async (event, values) => {
    console.log(values);
    if (disabled) {
      return;
    }
    const recaptchaValue = recaptchaRef.current.getValue();
    recaptchaRef.current.reset();

    if (!recaptchaValue) {
      return toast.error("ReCAPTCHA required", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const verify = await axios
      .post("/api/auth", {
        recaptchaValue,
      })
      .then((response) => response.data)
      .catch((err) => console.log(err));
    if (verify.success) {
      setDisabled(true);
    }
    const restForm = {
      eventNames: selected.map((x) => x.value),
      college: values.collegeName,
      email: values.email,
      contact: values.contact,
      studentName: values.name,
      groupName: values.groupName,
      name: values.name,
    };
    console.log(restForm);
    try {
      const result = await axios.post("/api/qr", restForm);
      if (result) {
        toast.success("Registration Successful", {
          position: "top-center",
          autoClose: 20000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      return toast.error(
        `Registration Failed, contact the number given in Contact Us page`,
        {
          position: "top-center",
          autoClose: 20000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const validateImage = async (event) => {
    imageFormData.append(event.target.name, event.target.files[0]);
  };

  const handleInvalidSubmit = () => {
    return toast.error("All fields are required", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const cancelSubmit = () => {
    form && form.reset();
    setSelected([]);
  };
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  useEffect(() => {
    if (isMobile) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <div ref={scrollRef} className="container">
        <ListGroup className=" mt-2 w-20 h-20">
          <ListGroupItem color="info">
            <h4>Note :</h4>
            <ul>
              <li>
                Registrations for all the events are only processed through the
                website.
              </li>
              <li>
                Everyone willing to participate in SYNTAXIA must register
                individually (even for group events, all the team members are
                expected to register <b>individually</b>).
              </li>
              <li>
                Participants can pay once and participate in any number of
                events.
              </li>
              <li>
                All team members must decide a unique group name before
                registering for the group events.
              </li>
              <li>
                {" "}
                <b>
                  Please avoid paying more than once. Refund of registration fee
                  will not be entertained.
                </b>
              </li>
              <li>
                {" "}
                Please make a UPI payment of <b>RUPEES 100 ONLY</b> to the below
                QR code and upload the screeenshot of the transaction in the
                form below. <b>INDIVIDUAL TRANSACTIONS ONLY</b>
              </li>
            </ul>
          </ListGroupItem>
        </ListGroup>
        <Row className=" w-60 h-30 mx-auto mt-4">
          <Col sm={{ size: 6 }} className="mb-4">
            <h3 className="text-center">Events List</h3>

            <Table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Slots Left</th>
                </tr>
              </thead>
              <tbody>
                {events.length > 0 ? (
                  events &&
                  events.map((singleEvent) => (
                    <tr key={singleEvent.id}>
                      <td>{singleEvent.name}</td>
                      <td>
                        {singleEvent.seats <= 0
                          ? "event closed"
                          : singleEvent.seats}{" "}
                      </td>
                    </tr>
                  ))
                ) : (
                  <MySpinner />
                )}
              </tbody>
            </Table>
            <img src="./assets/images/QR.jpg" style={{ width: "100%" }}></img>
          </Col>
          <Col sm={{ size: 6 }}>
            <AvForm
              ref={(c) => {
                setForm(c);
              }}
              onValidSubmit={handleValidSubmit}
              onInvalidSubmit={handleInvalidSubmit}
            >
              <h3 className="text-center">Select Events</h3>
              <AvField
                name="name"
                label="Enter your Name"
                type="text"
                errorMessage="Please enter your name"
                validate={{
                  required: { value: true },
                  pattern: { value: "^[A-Za-z]" },
                  minLength: { value: 4 },
                }}
              />
              <AvField
                name="email"
                label="Enter your Email"
                type="email"
                errorMessage="Please enter your name"
                validate={{
                  required: { value: true },
                  pattern: { value: "^[A-Za-z]" },
                  minLength: { value: 4 },
                }}
              />
              <AvField
                name="contact"
                label="Enter your contact number"
                type="tel"
                errorMessage="Please enter a valid 10 digit phone number"
                validate={{
                  required: { value: true },
                  pattern: { value: "[0-9]{9,10}" },
                }}
              />
              <AvField
                name="collegeName"
                label="Enter your college name"
                type="text"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Please enter your college name",
                  },
                  pattern: {
                    value: "^[A-Za-z]",
                    errorMessage:
                      "College name must be composed only with letter",
                  },
                  minLength: {
                    value: 4,
                    errorMessage: "College name must have 4 or more characters",
                  },
                }}
              />
              {
                <Alert color="secondary">
                  Number of events selected : <b>{selected.length}</b>
                </Alert>
              }
              <ReactNoSsr>
                <MultiSelect
                  options={setOptions}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select events"
                  className="mb-4"
                />
              </ReactNoSsr>
              <AvField
                name="groupName"
                label="Enter your group name"
                type="text"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Please enter your group name",
                  },
                  pattern: {
                    value: "^[A-Za-z]",
                    errorMessage:
                      "group name must be composed only with letters",
                  },
                  minLength: {
                    value: 4,
                    errorMessage: "group name must have 4 or more characters",
                  },
                }}
              />
              <p>
                Upload google pay UPI screenshot in jpeg or png with UPI
                transaction ID, amount and UPI IDs clearly visible to this link
              </p>
              <br />
              <a
                href="https://docs.google.com/forms/d/1TQ2F-94BPXF_-wqVG2N5WilR9CnCmCiWcyXk8pmeJeQ/edit"
                target="_blank"
              >
                https://docs.google.com/forms/d/1TQ2F-94BPXF_-wqVG2N5WilR9CnCmCiWcyXk8pmeJeQ/edit
              </a>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onErrored={() =>
                  alert(
                    "Cannot contact reCAPTCHA. Check your connection and try again."
                  )
                }
              />
              {selected.length > 0 && (
                <Button
                  className="mr-4 mt-2 mb-4"
                  color="primary"
                  disabled={disabled}
                >
                  Register Now
                </Button>
              )}
              <Button
                color="danger"
                className="ml-8 mt-2 mb-4"
                onClick={cancelSubmit}
              >
                cancel
              </Button>
            </AvForm>
          </Col>
          <Col sm={{ size: 12 }}></Col>
          <Row></Row>
        </Row>
      </div>
    </>
  );
};

export default QRRegistrationComponent;
