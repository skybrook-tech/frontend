class Actions {
  constructor(model) {
    this.store = model.store;
    this.types = model.types();
    this.model = model;
  }

  create(payload) {
    const { store, types } = this;

    return store.dispatch({ payload, type: types.UPSERT });
  }

  update(payload) {
    const { store, types } = this;

    return store.dispatch({ payload, type: types.UPSERT });
  }

  delete(payload) {
    const { store, types } = this;

    return store.dispatch({ payload, type: types.DESTROY });
  }
}

export default Actions;
