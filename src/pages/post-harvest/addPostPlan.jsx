import React from "react";
import { Helmet } from "react-helmet";
import { NavBar } from "../../components/nav-bar";
import { TopImage } from "../../components/top-section-image";
import { PostHarvestForm } from "../../section/post-harvest/post-harvest-form";
import { PostHarvestView } from "../../section/post-harvest/post-harvest-view";

export const AddPostPlan = () => {
  return (
    <>
      <Helmet>
        <title>postharvest</title>
      </Helmet>
      <NavBar></NavBar>
      <TopImage
        image="../../assets/images/postharvest_form_hero.png"
        title="title"
      />
        <PostHarvestView></PostHarvestView>
    </>
  );
};
