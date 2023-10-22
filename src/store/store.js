import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import  userReducer  from "./slices/userSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userId: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export default store;
