'use client'
import Button from "@components/Button";
import {LoginData} from "@contexts/AuthContext";

const mongoose = require('mongoose');

const onConnectToDBPressed = async () => {
    const testUser : LoginData = {
        username: "firstmongouser",
        password: "pass123"
    }
    fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(testUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(e => console.log(e));
};

export default function Home() {
    return (
        <>
            <main>The landing page</main>
            <Button buttonText={"Connect to DB"} onButtonPressed={onConnectToDBPressed}/>
        </>
    )
}
