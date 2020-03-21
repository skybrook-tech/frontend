import { fk, many, attr } from "redux-orm";
import ExtendedModel from "../../core/utils/orm/extended-model";
import { api } from "../../../config/api";

class Project extends ExtendedModel {
  static modelName = "Project";
  static endpoint = "/projects";

  static apiConfig = {
    baseURL: api.services.projects.v1.baseURL,
    dataKey: "data.data",
    actions: {}
  };
}

export default Project;
