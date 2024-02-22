import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@reducers/userSlice";
import clientReducer from "@reducers/clientSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		client: clientReducer
	}
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
