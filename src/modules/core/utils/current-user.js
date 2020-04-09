import get from "lodash/get";
import decodeJWT from "jwt-decode";

const getUser = () => {
  let currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    localStorage.setItem("currentUser", JSON.stringify({ token: null }));
    currentUser = localStorage.getItem("currentUser");
  }

  return JSON.parse(currentUser);
};

const currentUserUtil = {
  init() {
    getUser();
  },
  get(path) {
    if (path) {
      return get(getUser(), path, null);
    }

    return getUser();
  },

  set(newAttributes = {}) {
    const currentUser = getUser();

    if (newAttributes.token) {
      newAttributes.userDetails = decodeJWT(newAttributes.token);
    }

    const updatedUser = { ...currentUser, ...newAttributes };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    return updatedUser;
  }
};

export default currentUserUtil;
