import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";
import {IUser} from "@models/user";

export interface UserState {
	value: IUser | null;
}

const initialState: UserState = {
	value: null
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.value = action.payload;
		},
		clearUser: (state) => {
			state.value = null;
		}
	}
});

export const {setUser, clearUser} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;
export default userSlice.reducer;
