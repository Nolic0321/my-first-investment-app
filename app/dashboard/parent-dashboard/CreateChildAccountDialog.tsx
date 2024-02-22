import React, {useContext, useState} from "react";
import {Dialog} from "@headlessui/react";
import Button from "@components/Button";
import LabelledInput from "@components/LabeledInput";
import {ChildAccount} from "@models/child-account";
import {useAppSelector} from "@hooks/hooks";
import {selectUser} from "@reducers/userSlice";
import {selectClient} from "@reducers/clientSlice";

interface CreateChildAccountDialogProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onCreateChildAccount: (child: ChildAccount) => void;
}

export const CreateChildAccountDialog: React.FC<CreateChildAccountDialogProps> = ({isOpen, onRequestClose, onCreateChildAccount}) => {
    const [childAccountForm, setChildAccountForm] = useState<ChildAccount>({
        displayName: "",
        username: "",
        password: "",
        parentId: "",
        balance:0,
        interest:0
    });
    const user = useAppSelector(selectUser);
    const client = useAppSelector(selectClient);

    const handleChange = (field:string, value:string|number) => {
        setChildAccountForm(prevState => ({...prevState, [field]: value}));
    }
    const handleOnCreate = async () => {
        const child: ChildAccount = {
            isChildAccount: true,
            displayName: childAccountForm.displayName,
            username: childAccountForm.username,
            password: childAccountForm.password,
            balance: childAccountForm.balance,
            interest: childAccountForm.interest,
            parentId: user?._id??"" // This should be set to the current user's id
        };
        const newChildAccount = await client.addChildUser(child);
        if(!newChildAccount) return;    //TODO: handle error better
        onCreateChildAccount(child);
        setChildAccountForm({
            displayName: "",
            username: "",
            password: "",
            parentId: "",
            balance:0,
            interest:0
        })
    };

    return (
        <Dialog open={isOpen} onClose={onRequestClose} as={'div'} className="relative z-50">
            <div className={'fixed inset-0 bg-white/30'}>
                <div className={'fixed inset-0 flex w-screen items-center justify-center p-4'}>
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-black p-4">
                        <Dialog.Title>Create Child Account</Dialog.Title>
                        <div>
                            <div className="isolate -space-y-px rounded-md shadow-sm">
                                <LabelledInput
                                    name={"display-name"}
                                    label={"Display Name"}
                                    inputText={childAccountForm.displayName}
                                    onInputChanged={(value) =>handleChange('displayName',value)}
                                    placeholder={"John Doe"}
                                    className={'rounded-b-none'}/>
                                <LabelledInput
                                    name={'username'}
                                    label={"Username"}
                                    inputText={childAccountForm.username}
                                    onInputChanged={(value)=>handleChange('username',value)}
                                    placeholder={"johndoe"}
                                    className={'rounded-none'}/>
                                <LabelledInput
                                    name={'password'}
                                    label={"Password"}
                                    inputText={childAccountForm.password}
                                    onInputChanged={(value)=>handleChange('password',value)}
                                    placeholder={"********"}
                                    className={'rounded-none'}/>
                                <LabelledInput
                                    name={'starting-balance'}
                                    label={"Starting Balance"}
                                    type={'number'}
                                    inputText={childAccountForm.balance.toString()}
                                    onBlur={(inputValue)=>{handleChange('balance', parseFloat(inputValue))}}
                                    onInputChanged={(value:string)=>handleChange('balance',value)}
                                    placeholder={"100"}
                                    className={'rounded-none'}/>
                                <LabelledInput
                                    name={'interest'}
                                    label={"Interest"}
                                    inputText={childAccountForm.interest.toString()}
                                    onInputChanged={(value) => handleChange('interest', parseInt(value))}
                                    placeholder={"5"}
                                    className={'rounded-t-none'}
                                    footerDisplay={"%"}/>
                            </div>
                            <Button buttonText={'Create Account'} onButtonPressed={handleOnCreate}/>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};
