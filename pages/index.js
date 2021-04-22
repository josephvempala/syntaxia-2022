import Head from "next/head";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import useSWR from "swr";
import MySpinner from "../components/MySpinner";

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

const Home = () => {
  const [selected, setSelected] = useState([]);
  const setDetails = (e) => {
    let fieldVal = e.target.value;
    setName(fieldVal);
  };
  const { data, error } = useSWR("/api/events", {
    refreshInterval: 1000,
  });

  const events = data ? Object.values(data[0].data) : "";

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
      return "you are not online";
    }

    const data = await axios
      .post(`/api/razorpay`)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
    console.log("index", data);
    const options = {
      key: process.env.RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: "St Joseph's College",
      description: "Test Transaction",
      order_id: data.id,
      image: "",
      prefill: {
        name: "rama",
        email: "",
        contact: "",
      },
      notes: {
        eventNames: `${selected.map((select) => select.value)}`,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    // rzp1.on("payment.failed", function (response) {
    //   alert(response.error.code);
    //   alert(response.error.description);
    //   alert(response.error.source);
    //   alert(response.error.step);
    //   alert(response.error.reason);
    //   alert(response.error.metadata.order_id);
    //   alert(response.error.metadata.payment_id);
    // });
    paymentObject.open();
  };

  return (
    <div>
      <h1>Select Events</h1>
      <Form.Control
        onChange={(e) => setDetails(e)}
        type="text"
        placeholder="Enter your name"
      />
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
          variant="primary"
          // disabled={isLoading}
          onClick={() => displayRazorpay()}
        >
          Pay Now
        </Button>
      )}

      <ListGroup className="mt-5 ">
        {events.length > 0 ? (
          events.map((singleEvent) => (
            <ListGroup.Item key={singleEvent.id}>
              {singleEvent.name} :{" "}
              {singleEvent.seats === 0 ? "event closed" : singleEvent.seats}
            </ListGroup.Item>
          ))
        ) : (
          <MySpinner />
        )}
      </ListGroup>
    </div>
  );
};

export default Home;
