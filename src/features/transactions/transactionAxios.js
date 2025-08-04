import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

// get transaction
export const getTransation = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/transactions`,
    isPrivate: true,
  });
};

// create transaction
export const createTransaction = async (obj) => {
  return apiProcessor({
    method: "post",
    url: `${apiUrl}/transactions`,
    data: obj,
    isPrivate: true,
  });
};

// update transaction
export const updateTransaction = async (obj, id) => {
  return apiProcessor({
    method: "patch",
    url: `${apiUrl}/transactions/${id}`,
    data: obj,
    isPrivate: true,
  });
};

//delete transaction
export const deleteTransaction = async (data) => {
  return apiProcessor({
    method: "delete",
    // url: `${apiUrl}/transactions/${id}`,
    url: `${apiUrl}/transactions`,
    isPrivate: true,
    data,
  });
};
