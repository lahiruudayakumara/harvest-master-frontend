import axios from "axios";

const URL = "http://localhost:8080";


export const addPostHarvestPlan = async (planData) => {

    const response = await axios.post(`${URL}/postharvest/add`, {fieldName:planData.fieldName,regNo:planData.regNo,paddyVareity:planData.variety,area:planData.area,ownership:planData.ownership,location:planData.location,plantedDate:planData.date,split:planData.harvestsplit,method:planData.method})
    return response

}






