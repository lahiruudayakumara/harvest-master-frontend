import axios from "axios";

const URL = "http://localhost:8080";

export const addSupportRequest = async (supportData) => {
    const response= await axios.post (`${URL}/support/add`, {
        topic : supportData.topic,
      issue: supportData.description,
        status: "Pending"
    
    })
}

export const getSupportRequests = async () => {
  const response = await axios.get(`${URL}/support/getall`);
  return response.data;
};


export const addSupportFaq = async (faqData) => {
  const response= await axios.post (`${URL}/faq/add`, faqData)

  return response;
}


export const getFaqRequests = async () => {
  const response = await axios.get(`${URL}/faq/all`);
  return response.data;
};


export const deleteFaq = async (id) => {

  const response = await axios.delete(`${URL}/faq/delete/${id}`)
  return response;

}


export const  updateSupportSolution = async (id,solution) => {

  const response = await axios.patch(`${URL}/support/updatesolution/${id}`,{
    

  
    solution:solution

  })
  return response;

}




export const  updateSupportFaq = async (id,faqData) => {

  const response = await axios.patch(`${URL}/faq/update/${id}`,{
    

    faq_id:faqData.faq_id,
    topic:faqData.topic,
    description:faqData.description,
    solution:faqData.solution

  })
  return response;

}
