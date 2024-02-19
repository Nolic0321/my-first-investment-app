'use client'
import {useContext, useState} from "react";
import Button from "./Button";
import {AuthContext} from "@contexts/AuthContext";
import Input from "@components/Input";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const authContext = useContext(AuthContext);
	const [loginFailed, setLoginFailed] = useState(false);
	const login = async () => {
		const loginSuccess = await authContext?.login({username: username, password: password});
		setLoginFailed(!loginSuccess);
	}

	return (
		<div className={"rounded-md p-4"}>
			<div className={"flex-col mb-3"}>
				<label htmlFor={"username"}>Username</label>
				<Input
					className={"block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
					type={"text"}
					inputText={username}
					inputName={"username"}
					onInputChanged={(e) => setUsername(e)}
					onKeyPress={(event) => {event.key === 'Enter' ? login() : null}}
				/>
			</div>
			<div className={"flex-col mb-3"}>
				<label htmlFor={"password"}>Password</label>
				<Input
					className={"block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
					type={"password"}
					inputName={"password"}
					inputText={password}
					onInputChanged={(e) => setPassword(e)}
					onKeyPress={(event) => {event.key === 'Enter' ? login() : null}}
				/>
			</div>
			{loginFailed ? <div className={"text-red-500"}>Login Failed</div>:null}
			<Button className={"my-4"} buttonText="Login" onButtonPressed={login}/>
		</div>
	);
}
