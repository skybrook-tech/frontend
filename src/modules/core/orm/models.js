import { fk, many, attr } from "redux-orm";
import createModel from "@core/utils/create-model";
import { api } from "@config/api";

export default createModel({
  name: "Models",
  endpoint: "/models",
  api: api.mockend,
  fields: {
    name: attr()
  }
});
