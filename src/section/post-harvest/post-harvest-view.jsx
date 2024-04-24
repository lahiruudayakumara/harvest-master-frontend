import React, { useState } from "react";
import { PostHarvestForm } from "./post-harvest-form";
import { addPostHarvestPlan } from "../../api/postHarvestApi";

export const PostHarvestView = () => {
  const [planData, setPlanData] = useState({
    district: "",
    fieldName: "",
    regNo: "",
    variety: "",
    method: "",
    area: "",
    date: "",
    ownership: "",
    harvestsplit: "",
  });
    
    const handleSubmit = async  (e) => {
        e.preventDefault();
        try {
            const response = addPostHarvestPlan(planData)
            
        } catch (error) {
            
        }
        
    }

  return (
    <>
      <PostHarvestForm formData={planData} setformData={setPlanData}  onSubmit={handleSubmit} />
    </>
  );
};
