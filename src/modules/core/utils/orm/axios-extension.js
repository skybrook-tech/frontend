import axios from "axios";
import get from "lodash/get";
import merge from "lodash/merge";
import isArray from "lodash/isArray";
import isFunction from "lodash/isFunction";

const processConfig = (config, store) => {
  const headers = isFunction(config.headers)
    ? config.headers(store.getState())
    : config.headers;

  return { ...config, headers };
};

class Api {
  constructor(model) {
    this.model = model;
    this.registerActions();
  }

  createConfig(axiosConfig = {}) {
    const { apiConfig, globalApiConfig, store } = this.model;
    const { actions, ...modelConfig } = apiConfig;

    return merge(
      processConfig(globalApiConfig, store),
      processConfig(modelConfig, store),
      processConfig(axiosConfig, store)
    );
  }

  registerActions() {
    const actions = this.model.apiConfig.actions;

    if (actions) {
      for (const name in actions) {
        this[name] = actions[name].bind(this);
      }
    }
  }

  async request(axiosConfig = {}) {
    return axios.request(axiosConfig);
  }

  async createResponse(config = {}) {
    const { dataKey = "data" } = config;

    const response = await this.request(config);

    const data = get(response, dataKey);

    const entities = { items: [], itemsById: {} };

    if (isArray(data)) {
      data.forEach(entity => {
        entities.items.push(entity.id);
        entities.itemsById[entity.id] = entity;
      });
    }

    if (config.method === "delete") {
      this.model.actions().delete({ data });
    } else {
      this.model.actions().create({ data });
    }

    return { response, entities, config, model: this.model };
  }

  async get(url, axiosConfig = {}) {
    const config = this.createConfig({ ...axiosConfig, url, method: "get" });

    return this.createResponse(config);
  }

  async post(url, axiosConfig = {}) {
    const config = this.createConfig({ ...axiosConfig, url, method: "post" });

    return this.createResponse(config);
  }

  async patch(url, axiosConfig = {}) {
    const config = this.createConfig({ ...axiosConfig, url, method: "patch" });

    return this.createResponse(config);
  }

  async put(url, axiosConfig = {}) {
    const config = this.createConfig({ ...axiosConfig, url, method: "put" });

    return this.createResponse(config);
  }

  async delete(url, axiosConfig = {}) {
    const config = this.createConfig({ ...axiosConfig, url, method: "delete" });

    return this.createResponse(config);
  }

  async fetchAll(config = {}) {
    const { scope = "" } = config;
    const url = `${scope}${this.model.endpoint}`;

    return this.get(url, config);
  }

  async fetchById(id, config = {}) {
    const { scope = "" } = config;
    const url = `${scope}${this.model.endpoint}/${id}`;

    return this.get(url, config);
  }

  async update(data = {}, config = {}) {
    const { scope = "" } = config;
    const url = `${scope}${this.model.endpoint}/${data.id}`;

    return this.patch(url, { data, ...config });
  }

  async create(data = {}, config = {}) {
    const { scope = "" } = config;
    const url = `${scope}${this.model.endpoint}`;

    return this.post(url, { data, ...config });
  }

  async destroy(id, config = {}) {
    const { scope = "" } = config;
    const url = `${scope}${this.model.endpoint}/${id}`;

    return this.delete(url, config);
  }
}

export default Api;
