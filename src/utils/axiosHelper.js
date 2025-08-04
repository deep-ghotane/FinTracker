import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

// axios helper
export const apiProcessor = async ({ method, data, url, isPrivate }) => {
  try {
    let response = await axios({
      method: method,
      url: url,
      data: data,
      headers: isPrivate
        ? {
            Authorization: localStorage.getItem("accessToken"),
          }
        : {},
    });

    return response.data;
  } catch (err) {
    return {
      status: false,
      message: err?.response?.data?.message || err.message,
    };
  }
};

// create user
export const postUser = async (obj) => {
  // let response = await axios.post(`${apiUrl}/auth`, obj);
  // return response.data;

  return apiProcessor({
    method: "post",
    url: `${apiUrl}/auth`,
    data: obj,
  });
};

// login user
export const loginUser = async (obj) => {
  // let response = await axios.post(`${apiUrl}/auth/login`, obj);
  // return response.data;

  return apiProcessor({
    method: "post",
    url: `${apiUrl}/auth/login`,
    data: obj,
  });
};

// get user detail
export const getUserDetail = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/auth/user`,
    isPrivate: true,
  });
};

// get dashboard metrics
export const getDashboardMetrics = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/dashboard`,
    isPrivate: true,
  });
};

// verify user
export const verifyUser = async (token, email) => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/verify-email?t=${token}&email=${email}`,
    isPrivate: false,
  });
};

export const resendToken = async (email) => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/resend-token?email=${email}`,
    isPrivate: false,
  });
};
