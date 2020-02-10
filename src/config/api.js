import axios from "axios";

const services = {
  projects: { baseURL: process.env.REACT_APP_PROJECT_SERVICE_URL },
  users: { baseURL: process.env.REACT_APP_USER_SERVICE_URL }
};

const api = {
  projectService: axios.create(services.projects),
  userService: axios.create(services.users)
};

const setAuthorisationHeaders = ({ token }) => {
  ["projectService", "userService"].forEach(service => {
    api[service].defaults.headers.common.Authorization = `Bearer ${token}`;
  });
};

export { services, api, setAuthorisationHeaders };
