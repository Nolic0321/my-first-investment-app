import {useContext, useEffect, useState} from "react";
import Button from "../components/Button";
import {ClientContext} from "@contexts/ClientContext";
import LabelledInput from "../components/LabeledInput";
import {ChildAccount} from "@models/child-account";
import {ApprovalStatus, Transaction} from "@models/transaction";
import {Option} from "@models/option";
import {AuthContext} from "@contexts/AuthContext";
import IClient from "@models/client";

const calculateDailyEarnings = (balance: number, yearlyInterestRate: number): number => {
    const dailyInterestRate = yearlyInterestRate / 365;
    return balance * dailyInterestRate;
};

export default function ChildDashboard() {
    const {user} = useContext(AuthContext)!;
    const [childAccount, setChildAccount] = useState<ChildAccount | null>(null);
    const [dailyEarnings, setDailyEarnings] = useState(0);
    const [pretendSpent, setPretendSpent] = useState("");
    const [pretendAdded, setPretendAdded] = useState("");
    const [requestAmount, setRequestAmount] = useState("");
    const [requestReason, setRequestReason] = useState("");
    const [pendingRequests, setPendingRequests] = useState<Transaction[]>([]);
    const [error, setError] = useState<string>("");
    const client = useContext(ClientContext) as unknown as IClient;

    useEffect(() => {
        if(!user) return;
        const tempChildAccount = user as ChildAccount;
        setChildAccount(tempChildAccount as ChildAccount);
        // Calculate daily earnings
        const earnings = calculateDailyEarnings(tempChildAccount.balance, tempChildAccount.interest / 100);
        // Save that to be displayed
        setDailyEarnings(earnings);
    }, [user]);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const requests = await client.getPendingRequestsForChild(childAccount?._id!);
                setPendingRequests(requests);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPendingRequests();
    }, [client, childAccount]);

    const onRequestSubmit = async () => {
        const newRequest: Transaction = {
            amount: Number(requestAmount),
            date: new Date(),
            childId: childAccount?._id!,
            reason: requestReason,
            approved: ApprovalStatus.Pending
        }
        // Send request to backend
        try {
            let updatedRequests = await client.sendRequest(newRequest, (newRequest.amount < 0) ? {error: "Cannot have negative"} as Option : undefined);
            setPendingRequests(updatedRequests);
        } catch (error: any) {
            setError(error.message);
        }

        setRequestAmount("");
        setRequestReason("");
    };
    if (childAccount) {
        return (
            <div className={'flex-col w-full'}>
                <h1>Hello {childAccount.displayName}</h1>
                <br/>
                <div className="prose bg-white px-4 py-5 sm:px-6 text-black rounded-2xl mb-2 text-lg font-bold max-w-none">
                    <h2 className={'border-b border-gray-200 font-semibold leading-6 text-gray-900 pb-2'}>Account Balance</h2>
                    {pendingRequests?.length > 0
                        ? <div>
                            <div>Your current balance is</div>
                            <div>$<span data-testid={'account-balance-diff'}>{childAccount.balance - pendingRequests.reduce((total, transaction) => total + transaction.amount, 0)}</span> ($<span data-testid='account-balance'>{childAccount.balance.toFixed(2)}</span>)</div>
                        </div>
                        : <div>
                            <div>Your current balance is</div>
                            <div>$<span data-testid={'account-balance'}>{childAccount.balance.toFixed(2)}</span></div>
                        </div>}

                    <div className={'mt-4'}>Today your money made you</div>
                    <div>${dailyEarnings.toFixed(2)} </div>
                </div>
                <div className={'prose bg-white px-4 py-5 sm:px-6 text-black rounded-2xl flex flex-col mb-2 max-w-none'}>
                    <h2 className={'border-b border-gray-200 font-semibold leading-6 text-gray-900 pb-2'}>Pretend Zone</h2>
                    <p className={'text-sm'}>This area can be used to pretend you spent some of your money or put more money in.</p>
                    <div className={'flex flex-col lg:flex-row'}>
                        <div className={"w-full mb-4"}>
                            <LabelledInput name="if-i-spend" className={'rounded-b-none '} label={"If I spend"} inputText={pretendSpent.toString()} onInputChanged={setPretendSpent} headerDisplay={"$"}
                                           placeholder={"Enter amount here"}/>
                            <LabelledInput name="then-my-account-will-have" className={'rounded-none '} label={"then my account will have"} inputText={(childAccount.balance - Number(pretendSpent)).toString()} onInputChanged={() => {
                            }} disabled={true} headerDisplay={"$"}/>
                            <LabelledInput name='everyday-my-money-would-create' className={'rounded-t-none '} label={"everyday my money would create "}
                                           inputText={calculateDailyEarnings(childAccount.balance - Number(pretendSpent), childAccount.interest / 100).toFixed(2)} onInputChanged={() => {
                            }} disabled={true} headerDisplay={"$"}/>
                        </div>
                        <div className={'w-full lg:ml-2'}>
                            <LabelledInput name="if-i-save" className={'rounded-b-none'} label={"If I save"} inputText={pretendAdded.toString()} onInputChanged={setPretendAdded} headerDisplay={"$"}
                                           placeholder={"Enter amount here"}/>
                            <LabelledInput name='then-my-account-will-have-more' className={'rounded-none'} label={"then my account will have"} inputText={(childAccount.balance + Number(pretendAdded)).toString()} onInputChanged={() => {
                            }} disabled={true} headerDisplay={"$"}/>
                            <LabelledInput name='everyda-my-money-would-create-more' className={'rounded-t-none'} label={"everyday my money would create "}
                                           inputText={calculateDailyEarnings(childAccount.balance + Number(pretendAdded), childAccount.interest / 100).toFixed(2)} onInputChanged={() => {
                            }} disabled={true} headerDisplay={"$"}/>
                        </div>
                    </div>
                </div>
                <div className={'prose bg-white px-4 py-5 sm:px-6 text-black rounded-2xl flex flex-col max-w-none'}>
                    <h2 className={'border-b border-gray-200 font-semibold leading-6 text-gray-900 pb-2'}>Spend Money Request</h2>
                    <div className={'flex-col'}>
                        <LabelledInput name='i-want-to-spend' className={"w-15 mx-1"} label={"I want to spend"} inputText={requestAmount.toString()} onInputChanged={setRequestAmount} headerDisplay={"$"} placeholder={"Enter amount"}/>
                        <LabelledInput name='i-want-to-spend-this-money-because' className={"mx-1 mb-2"} label={"I want to spend this money because"} inputText={requestReason} onInputChanged={setRequestReason}
                                       placeholder={"I want a new toy"}/>
                        <Button buttonText={'Request'} onButtonPressed={onRequestSubmit} className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}/>
                        {error && <p className={'text-rose-600'}>{error}</p>}
                    </div>

                </div>
            </div>
        )
    } else {
        return null;
    }
}
