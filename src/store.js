import { createSlice, configureStore } from "@reduxjs/toolkit";
import { createReducer, createSelector } from "redux-orm";
import orm from "./models";
// import { Book, Author, Publisher } from "./models";

// const emptyDBState = orm.getEmptyState();

// console.log({ emptyDBState });

const counter = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    multiply: {
      reducer: (state, action) => state * action.payload,
      prepare: value => ({ payload: value || 2 }) // fallback if the payload is a falsy value
    }
  }
});

const user = createSlice({
  name: "user",
  initialState: { name: "", age: 20 },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload; // mutate the state all you want with immer
    }
  },
  // "map object API"
  extraReducers: {
    [counter.actions.increment]: (state, action) => {
      state.age += 1;
    }
  }
});

const store = configureStore({
  reducer: { counter, user, orm: createReducer(orm) }
});

store
  .dispatch(orm.actions.Models.FETCH({ scope: "/projects/33", id: 50 }))
  .then(() => {
    // const books = createSelector(orm.Book);
    // const authors = createSelector(orm.Author);
    // const book = books(store.getState(), 1);

    // book.authors.map(async author => {
    //   let record = authors(store.getState(), author.id);

    //   if (record) {
    //     console.log("record exists");
    //   }

    //   if (!record) {
    //     await store.dispatch(
    //       orm.actions.Author.COMMIT_CREATE({ id: 1, name: "Jon smithers" })
    //     );
    //     record = authors(store.getState(), author.id);
    //     console.log(record);
    //   }
    // });
    // console.log(authors(store.getState(), book.authors));

    console.log("Done!", store.getState());
  });

// store.dispatch(orm.actions.Book.DESTROY(1));

export default store;
