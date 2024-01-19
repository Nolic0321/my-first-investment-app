import React, {useContext, useState} from "react";
import {Dialog} from "@headlessui/react";
import Button from "@components/Button";
import LabelledInput from "@components/LabeledInput";
import {ChildAccount} from "@models/child-account";
import {AuthContext} from "@contexts/AuthContext";
import {guid} from "../helper-functions";

interface CreateChildAccountDialogProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onCreateChildAccount: (child: ChildAccount) => void;
}

export const CreateChildAccountDialog: React.FC<CreateChildAccountDialogProps> = ({isOpen, onRequestClose, onCreateChildAccount}) => {
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [startingBalance, setStartingBalance] = useState(0);
    const [interest, setInterest] = useState(0);
    const {user} = useContext(AuthContext)!;
    const handleOnCreate = () => {
        const child: ChildAccount = {
            displayName,
            username,
            password,
            balance: startingBalance,
            interest,
            parentId: user?._id??"" // This should be set to the current user's id
        };
        onCreateChildAccount(child);
    };

    return (
        <Dialog open={isOpen} onClose={onRequestClose} as={'div'} className="relative z-50">
            <div className={'fixed inset-0 bg-white/30'} aria-hidden={"true"}/>
            <div className={'fixed inset-0 flex w-screen items-center justify-center p-4'}>
                <Dialog.Panel className="mx-auto max-w-sm rounded bg-black p-4">
                    <Dialog.Title>Create Child Account</Dialog.Title>
                    <Dialog.Description>
                        <div className="isolate -space-y-px rounded-md shadow-sm">
                            <LabelledInput label={"Display Name"} inputText={displayName} onInputChanged={setDisplayName} placeholder={"John Doe"} className={'rounded-b-none'}/>
                            <LabelledInput label={"Username"} inputText={username} onInputChanged={setUsername} placeholder={"johndoe"} className={'rounded-none'}/>
                            <LabelledInput label={"Password"} inputText={password} onInputChanged={setPassword} placeholder={"********"} className={'rounded-none'}/>
                            <LabelledInput label={"Starting Balance"} inputText={startingBalance.toString()} onInputChanged={(newInput) => setStartingBalance(parseInt(newInput))} placeholder={"100"} className={'rounded-none'}/>
                            <LabelledInput label={"Interest"} inputText={interest?interest.toString():""} onInputChanged={(newInput) => setInterest(parseInt(newInput))} placeholder={"5"} className={'rounded-t-none'} footerDisplay={"%"}/>
                        </div>
                        <Button buttonText={'Create'} onButtonPressed={handleOnCreate}/>
                    </Dialog.Description>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
