// orm.js
import { ORM } from "redux-orm";
import Models from "./models";
import Columns from "./columns";
import Projects from "./projects";

const orm = new ORM({ stateSelector: state => state.orm });

orm.register(Models.model, Columns.model, Projects.model);

orm.actions = {
  Models: Models.actions,
  Columns: Columns.actions,
  Projects: Projects.actions
};

export default orm;
