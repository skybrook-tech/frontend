import currentUser from "@core/utils/current-user";
import { services } from "@config/api";
import axios from "axios";
import globalsCache from "@core/globals-cache";

const securityMiddleware = store => next => action => {
  next(action);

  switch (action.type) {
    case "CHECK_USER_IS_AUTHENTICATED":
      return new Promise(async resolve => {
        const tokenChecked = store.getState().Security.tokenChecked;
        const requestSent = store.getState().Security.requestSent;
        const { token } = currentUser.get();

        const hasToken = !!token;

        const { actions } = globalsCache.get("Security");

        if (!tokenChecked) {
          if (hasToken && !requestSent) {
            try {
              console.log("SENDING REQUEST");

              next(actions.setRequestSent(true));

              await axios.get(
                `${services.users.v1.baseURL}/users/check-token`,
                {
                  headers: { Authorization: `Bearer ${token}` }
                }
              );

              next(actions.setIsAuthenticated(true));
              next(actions.setTokenChecked(true));
            } catch (err) {
              next(actions.setIsAuthenticated(false));
              next(actions.setTokenChecked(true));
            }
          } else if (!requestSent) {
            next(actions.setTokenChecked(true));
          }
        }
      });

      return "foo";

      break;

    default:
      break;
  }
};

export default securityMiddleware;
