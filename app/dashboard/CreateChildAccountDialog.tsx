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
    const [startingBalance, setStartingBalance] = useState("");
    const [interest, setInterest] = useState(0);
    const {user} = useContext(AuthContext)!;
    const handleOnCreate = () => {
        const child: ChildAccount = {
            isChildAccount: true,
            displayName,
            username,
            password,
            balance: parseFloat(startingBalance),
            interest,
            parentId: user?._id??"" // This should be set to the current user's id
        };
        onCreateChildAccount(child);
    };

    return (
        <Dialog open={isOpen} onClose={onRequestClose} as={'div'} className="relative z-50">
            <div className={'fixed inset-0 bg-white/30'}>
                <div className={'fixed inset-0 flex w-screen items-center justify-center p-4'}>
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-black p-4">
                        <Dialog.Title>Create Child Account</Dialog.Title>
                        <div>
                            <div className="isolate -space-y-px rounded-md shadow-sm">
                                <LabelledInput name={"display-name"} label={"Display Name"} inputText={displayName} onInputChanged={setDisplayName} placeholder={"John Doe"} className={'rounded-b-none'}/>
                                <LabelledInput name={'username'} label={"Username"} inputText={username} onInputChanged={setUsername} placeholder={"johndoe"} className={'rounded-none'}/>
                                <LabelledInput name={'password'} label={"Password"} inputText={password} onInputChanged={setPassword} placeholder={"********"} className={'rounded-none'}/>
                                <LabelledInput name={'starting-balance'} label={"Starting Balance"} inputText={startingBalance} onInputChanged={(newInput:string)=>setStartingBalance(newInput)} placeholder={"100"} className={'rounded-none'}/>
                                <LabelledInput name={'interest'} label={"Interest"} inputText={interest?interest.toString():""} onInputChanged={(newInput) => setInterest(parseInt(newInput))} placeholder={"5"} className={'rounded-t-none'} footerDisplay={"%"}/>
                            </div>
                            <Button buttonText={'Create Account'} onButtonPressed={handleOnCreate}/>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};
