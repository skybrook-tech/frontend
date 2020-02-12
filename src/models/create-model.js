import { Model, attr } from "redux-orm";
import { createAction } from "@reduxjs/toolkit";
import isArray from "lodash/isArray";
import isNumber from "lodash/isNumber";

const createDefaultThunks = ({ DESTROY, CREATE, api, endpoint }) => {
  const FETCH = (options = {}) => {
    const { scope = "", id } = options;
    let constructedEndpoint = scope + endpoint;

    return async dispatch => {
      try {
        const params = {};

        if (isArray(id)) {
          params.ids = id;
        }

        if (isNumber(id)) {
          constructedEndpoint += `/${id}`;
        }

        const { data } = await api.get(constructedEndpoint, { params });

        dispatch(CREATE(data.data));
      } catch (error) {}
    };
  };

  const COMMIT_DESTROY = () => {
    return dispatch => {
      dispatch(DESTROY());
    };
  };

  let index = 0;

  const COMMIT_CREATE = payload => {
    return async dispatch => {
      try {
        const tempId = Math.random();

        dispatch(CREATE({ ...payload, id: tempId }));

        dispatch(DESTROY(tempId));

        dispatch(CREATE({ ...payload, id: index++ }));
      } catch (error) {}
    };
  };

  return { COMMIT_DESTROY, COMMIT_CREATE, FETCH };
};

const createModel = config => {
  const { name, fields, api, endpoint } = config;

  const CREATE = createAction(`models/${name}/create`);
  const UPDATE = createAction(`models/${name}/update`);
  const DESTROY = createAction(`models/${name}/destroy`);

  const actions = {
    CREATE,
    UPDATE,
    DESTROY,
    ...createDefaultThunks({ CREATE, UPDATE, DESTROY, api, endpoint })
  };

  class NewModel extends Model {
    static reducer(action, Model, session) {
      switch (action.type) {
        case UPDATE.toString():
        case CREATE.toString():
          if (isArray(action.payload)) {
            action.payload.forEach(item => {
              Model.upsert(item);
            });
          } else {
            Model.upsert(action.payload);
          }
          break;

        case DESTROY.toString():
          const modelToDelete = Model.withId(action.payload);

          if (modelToDelete) {
            modelToDelete.delete();
          }
          break;

        default:
          break;
      }
    }

    toString() {
      return `${name}: ${this.name}`;
    }
  }

  NewModel.modelName = name;

  NewModel.fields = {
    id: attr(),
    ...fields
  };

  return { model: NewModel, actions };
};

export default createModel;
