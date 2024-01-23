'use client'
import {useContext, useState} from "react";
import Button from "./Button";
import {AuthContext, LoginData} from "@contexts/AuthContext";
export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const authContext = useContext(AuthContext);
	const [loginFailed, setLoginFailed] = useState(false);
	const login = async () => {
		if(authContext){
			const credentials: LoginData = {
				username: username,
				password: password
			}
			setLoginFailed(!(await authContext.login(credentials)));
		}
	}

	return (
		<div className={"rounded-md bg-gray-800 p-4"}>
			<div className={"flex-col mb-3"}>
				<label htmlFor={"username"}>Username</label>
				<input
					className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
					type={"text"}
					name={"username"}
					id={"username"}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className={"flex-col mb-3"}>
				<label htmlFor={"password"}>Password</label>
				<input
					className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
					type={"password"}
					name={"password"}
					id={"password"}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{loginFailed ? <div className={"text-red-500"}>Login Failed</div>:null}
			<Button className={"my-4"} buttonText="Login" onButtonPressed={login}/>
		</div>
	);
}
