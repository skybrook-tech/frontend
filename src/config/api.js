import axios from "axios";

const services = {
  projects: {
    v1: { baseURL: `${process.env.REACT_APP_PROJECT_SERVICE_URL}/v1` }
  },
  users: {
    v1: { baseURL: `${process.env.REACT_APP_USER_SERVICE_URL}/v1` }
  }
};

const api = {
  services
};

const setAuthorisationHeaders = ({ token }) => {
  ["projectService", "userService"].forEach(service => {
    api[service].defaults.headers.common.Authorization = `Bearer ${token}`;
  });
};

export { services, api, setAuthorisationHeaders };
