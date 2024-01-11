'use client'
import Button from "@components/Button";

const mongoose = require('mongoose');

const onConnectToDBPressed = async () => {
    fetch('/api/hello')
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
