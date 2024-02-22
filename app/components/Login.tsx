"use client";
import {useState} from "react";
import Button from "./Button";
import Input from "@components/Input";
import {useAppSelector, useAppDispatch} from "@hooks/hooks";
import {selectUser, setUser} from "@reducers/userSlice";
import {selectClient} from "@reducers/clientSlice";

export interface LoginData {
	username: string,
	password: string
}

export default function Login() {
	const user = useAppSelector(selectUser);
	const client = useAppSelector(selectClient);
	const dispatch = useAppDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginFailed, setLoginFailed] = useState(false);
	const login = async () => {
		const user = await client.auth({username: username, password: password});
		const loginSuccess = user !== null;
		if (loginSuccess) {
			dispatch(setUser(user));
		}
		setLoginFailed(!loginSuccess);

	};

	return (
		<div className={"rounded-md bg-gray-800 p-4"}>
			<div className={"flex-col mb-3"}>
				<label htmlFor={"username"}>Username</label>
				<Input
					className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
					type={"text"}
					inputText={username}
					inputName={"username"}
					onInputChanged={(e) => setUsername(e)}
					onKeyPress={(event) => {
						event.key === "Enter" ? login() : null;
					}}
				/>
			</div>
			<div className={"flex-col mb-3"}>
				<label htmlFor={"password"}>Password</label>
				<Input
					className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
					type={"password"}
					inputName={"password"}
					inputText={password}
					onInputChanged={(e) => setPassword(e)}
					onKeyPress={(event) => {
						event.key === "Enter" ? login() : null;
					}}
				/>
			</div>
			{loginFailed ? <div className={"text-red-500"}>Login Failed</div> : null}
			<Button className={"my-4"} buttonText="Login" onButtonPressed={login}/>
		</div>
	);
}
