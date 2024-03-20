import React from "react";
import { Helmet } from "react-helmet";
import { LogisticHandlerAccountView } from "../../section/logistic-handler/account/view";

const LogisticHandlerAccount = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard : Logistic Handler</title>
      </Helmet>
      <LogisticHandlerAccountView />
    </>
  );
};

export default LogisticHandlerAccount;
