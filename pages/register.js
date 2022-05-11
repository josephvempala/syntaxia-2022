import React from "react";
import RegistrationComponent from "../components/RegistrationComponent";
import Layout from "../components/Layout";
import QRRegistrationComponent from "../components/qrRegistrationComponent";

const register = () => {
  return (
    <Layout title="Syntaxia 2022 | Register">
      <QRRegistrationComponent></QRRegistrationComponent>
    </Layout>
  );
};

export default register;
