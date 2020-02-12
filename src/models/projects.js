import { fk, many, attr } from "redux-orm";
import createModel from "./create-model";
import { api } from "../config/api";

export default createModel({
  name: "Projects",
  endpoint: "/projects",
  api: api.mockend,
  fields: {
    // name: attr()
    // authors: many("Author", "books")
  }
});
