import { Model, attr } from "redux-orm";
import isArray from "lodash/isArray";
import Api from "./axios-extension";
import Actions from "./actions-extension";

class ExtendedModel extends Model {
  static init({ store, orm }) {
    this.store = store;
    this.orm = orm;
  }

  static globalApiConfig = {
    headers: ({ Security }) => ({
      Authorization: `Bearer ${Security.token}`
    })
  };

  static apiConfig = {};

  static actions() {
    return new Actions(this);
  }

  static api() {
    return new Api(this);
  }

  static customReducer() {}

  static types() {
    return {
      UPSERT: `models/${this.modelName}/upsert`,
      DESTROY: `models/${this.modelName}/destroy`
    };
  }

  static reducer(action, ModelInstance, session) {
    const { DESTROY, UPSERT } = this.types();
    const { payload = {} } = action;
    const { data } = payload;

    this.customReducer(action, ModelInstance, session);

    switch (action.type) {
      case UPSERT:
        if (isArray(data)) {
          data.forEach(item => {
            ModelInstance.upsert(item);
          });
        } else {
          ModelInstance.upsert(data);
        }
        break;

      case DESTROY:
        const modelToDelete = ModelInstance.withId(data);

        if (modelToDelete) {
          modelToDelete.delete();
        }
        break;

      default:
        break;
    }
  }
}

export default ExtendedModel;
