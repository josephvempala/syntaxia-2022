import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";
import {
  Button,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
  List,
} from "reactstrap";
import axios from "axios";
import useSWR from "swr";
import MySpinner from "../components/MySpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
import ReCAPTCHA from "react-google-recaptcha";

const fetcher = async () => {
  const res = await axios
    .get("/api/events")
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return res;
};

const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const RegisterComponent = ({ res }) => {
  const [selected, setSelected] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const recaptchaRef = React.createRef();
  const { data } = useSWR("/api/events", fetcher, {
    initialData: res,
    refreshInterval: 1000,
  });

  const events = data ? Object.values(data[0].data) : [];

  const setOptions = () => {
    const options = events.filter((singleEvent) => singleEvent.seats > 0);

    return options.length > 0 ? options : [];
  };

  // const options = [
  //   { label: "web eye", value: "webeye" },
  //   { label: "Coding", value: "coding" },
  //   { label: "Quiz", value: "quiz" },
  // ];

  const displayRazorpay = async (event, values) => {
    if (disabled) {
      return;
    }
    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue) {
      console.log(recaptchaValue);
      const result = await loadRazorpay(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      setDisabled(true);

      if (!result) {
        return toast.info("Could not load razorpay,are you online", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      const data = await axios
        .post(`/api/razorpay`)
        .then((response) => response.data)
        .catch(function (error) {
          console.log(error);
        });
      const options = {
        key: process.env.RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        name: "St Joseph's College",
        description: "Test Transaction",
        order_id: data.id,
        image: "",
        handler: function (response) {
          return toast.success("Payment Successful", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        prefill: {
          name: values.name,
          email: "",
          contact: "",
        },
        notes: {
          eventNames: `${selected.map((select) => select.value)}`,
          college: values.collegeName,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        return toast.error(
          `Payment Failed,due to:${response.reason} for ${payment_id} `,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
      });
      paymentObject.open();
      setDisabled(false);
    } else {
      return toast.error("ReCAPTCHA required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleInvalidSubmit = () => {
    return toast.error("All fields are required", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Container>
      <ToastContainer />
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
              supposed to register individually).
            </li>
            <li>
              Participants can pay once and participate in any number of events.
            </li>
            <li>
              {" "}
              Please avoid paying more than once. Refund of registration fee
              will not be entertained.
            </li>
          </ul>
        </ListGroupItem>
      </ListGroup>
      <Row className=" w-60 h-30 mx-auto mt-4">
        <Col sm={{ size: 6, order: 2, offset: 1 }}>
          <AvForm
            onValidSubmit={displayRazorpay}
            onInvalidSubmit={handleInvalidSubmit}
          >
            <h3 className="text-center">Select Events</h3>
            <AvField
              name="name"
              label="Enter your Name"
              type="text"
              errorMessage="Enter a valid name"
              validate={{
                required: { value: true },
                pattern: { value: "^[A-Za-z0-9]" },
                minLength: { value: 4 },
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
                  errorMessage: "Your name must be composed only with letter",
                },
                minLength: {
                  value: 4,
                  errorMessage: "Your name must have 4 or more characters",
                },
              }}
            />
            <pre>{JSON.stringify(selected.label)}</pre>
            <MultiSelect
              options={setOptions}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
              className="mb-4"
            />
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={`${process.env.RECAPTCHA_SITE_KEY}`}
            />
            {selected.length > 0 && (
              <Button
                className="mr-4 mt-2 mb-2"
                color="primary"
                disabled={disabled}
              >
                Pay Now
              </Button>
            )}
            <Button
              color="danger"
              className="mt-2 mb-2"
              onClick={() => setSelected([])}
            >
              cancel
            </Button>
          </AvForm>
        </Col>

        <Col className="mb-4">
          <h3 className="text-center">Events List</h3>

          <ListGroup>
            {events.length > 0 ? (
              events &&
              events.map((singleEvent) =>
                singleEvent.seats === 0 ? (
                  <ListGroupItem color="danger" key={singleEvent.id}>
                    {singleEvent.label} : event closed
                  </ListGroupItem>
                ) : (
                  <ListGroupItem key={singleEvent.id}>
                    {singleEvent.label} : {singleEvent.seats}
                  </ListGroupItem>
                )
              )
            ) : (
              <MySpinner />
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export async function getStaticProps() {
  const res = await fetcher("/api/events");
  return { props: { res } };
}

export default RegisterComponent;
