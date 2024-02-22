import {createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import type {RootState} from "../store";
import IClient from "@models/client";
import MockClient from "../clients/mockClient";
import {GetClient} from "../clients/clientFactory";
import {ClientType} from "../enums/clientType";

export interface ClientState {
	value: IClient;
}

const initialState: ClientState = {
	value: new MockClient()
};

export const clientSlice = createSlice({
	name: "client",
	initialState,
	reducers: {
		setClient: (state, action: PayloadAction<IClient>) => {
			state.value = action.payload;
		}
	}
});

export const {setClient} = clientSlice.actions;

export const selectClient = (state: RootState) => state.client.value;
export default clientSlice.reducer;

export async function fetchClient(dispatch: ThunkDispatch<any, any, any>){
	await fetch('api/client')
		.then(response => response.text())
		.then(data => {
			const newClient = GetClient(data as ClientType);
			if(!newClient) throw new Error("Invalid client type");
			dispatch(setClient(newClient));
		})
		.catch(error => {
			console.log(error);
		});
}
