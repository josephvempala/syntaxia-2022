import Head from "next/head";
import Link from "next/link";

import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";
import {
  Button,
  Input,
  InputGroup,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import axios from "axios";
import useSWR from "swr";
import MySpinner from "../components/MySpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = () => {
  const res = axios
    .get("/api/events")
    .then((response) => response.data)
    .catch((error) => console.log(error));
  return res;
};

export async function getStaticProps() {
  const res = await fetcher("/api/events");
  return { props: { res } };
}

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
  const [name, setName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const setDetails = (e) => {
    let fieldVal = e.target.value;
    setName(fieldVal);
  };

  const { data } = useSWR("/api/events", fetcher, {
    initialData: res,
    refreshInterval: 1000,
  });

  const events = data ? Object.values(data[0].data) : [];
  const options = [
    { label: "web eye", value: "webeye" },
    { label: "Coding", value: "coding" },
    { label: "Quiz", value: "quiz" },
  ];

  const displayRazorpay = async () => {
    const result = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

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
        name,
        email: "",
        contact: "",
      },
      notes: {
        eventNames: `${selected.map((select) => select.value)}`,
        college: collegeName,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      return toast.error(
        `Payment Failed , with reason :${response.reason} for ${payment_id} `,
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
  };

  return (
    <div>
      <ToastContainer />
      <h1>Select Events</h1>
      <InputGroup size="sm">
        <label htmlFor="">Enter your name</label>
        <Input onChange={(e) => setDetails(e)} />
        <label className="ml-4" htmlFor="">
          Enter your college name
        </label>
        <Input onChange={(e) => setCollegeName(e)} />
      </InputGroup>
      <pre>{JSON.stringify(selected.label)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      {selected.length > 0 && (
        <Button
          className="mt-5"
          color="primary"
          // disabled={isLoading}
          onClick={() => displayRazorpay()}
        >
          Pay Now
        </Button>
      )}

      <ListGroup className="mt-5 ">
        {events ? (
          events &&
          events.map((singleEvent) => (
            <ListGroupItem key={singleEvent.id}>
              {singleEvent.name} :{" "}
              {singleEvent.seats === 0 ? "event closed" : singleEvent.seats}
            </ListGroupItem>
          ))
        ) : (
          <MySpinner />
        )}
      </ListGroup>
    </div>
  );
};

export default RegisterComponent;
