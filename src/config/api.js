import axios from "axios";

const mockendApiConfig = { baseURL: process.env.REACT_APP_MOCKEND_URL };

const api = { mockend: axios.create(mockendApiConfig) };

const setHeaders = headers => {
  headers.forEach(({ header, value }) => {
    api.defaults.headers.common[header] = value;
  });
};

export { mockendApiConfig, api, setHeaders };
