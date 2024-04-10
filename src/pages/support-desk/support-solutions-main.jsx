import React from "react";
import { Helmet } from "react-helmet";
import SupportDeskView from "../../section/support-desk/support-desk-view";
import { NavBar } from "../../components/nav-bar";
import SupportSolutionsView from "src/section/support-desk/support-solutions-view";

const SupportDeskSolutions = () => {
  return (
    <>
      <Helmet>
        <title>SupportDesk</title>
      </Helmet>

      <SupportSolutionsView></SupportSolutionsView>
    </>
  );
};

export default SupportDeskSolutions;