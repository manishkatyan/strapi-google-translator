import instance from "./axiosInstance";

const axios = instance;

export async function translate(data, token) {
  const response = await axios.post(
    `/strapi-google-translator/translate/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}

export async function saveTranslateConfiguration(data) {
  const response = await axios.put(
    `/strapi-google-translator/saveConfiguration`,
    data
  );
  return response;
}

export async function getTranslateConfiguration() {
  const response = await axios.get(
    "/strapi-google-translator/getConfiguration"
  );
  return response;
}
