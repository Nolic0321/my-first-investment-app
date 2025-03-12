import {ChildAccount} from "@models/child-account";
import {ApprovalStatus, Transaction} from "@models/transaction";
import {useContext, useEffect, useState} from "react";
import {ClientContext} from "@contexts/ClientContext";
import IClient from "@models/client";
import Button from "@components/button/Button";
import Input from "@components/Input";

export type ChildPreviewProps = {
    child: ChildAccount;
    onChildSelected: (child: ChildAccount) => void;
}

export function ChildPreview({child}: ChildPreviewProps) {
    const [loading, setLoading] = useState(true);
    const [pendingRequests, setPendingRequests] = useState<Transaction[]>([]);
    const [loadingRequests, setLoadingRequests] = useState(true);
    const [showRequests, setShowRequests] = useState(false);
    const [showAdjustment, setShowAdjustment] = useState(false);
    const [adjustment, setAdjustment] = useState(0);
    const client = useContext(ClientContext) as unknown as IClient

    useEffect(() => {
        client.getPendingRequestsForChild(child._id).then(result => {
            setPendingRequests(result);
            setLoadingRequests(false);
            setLoading(false);
        });
    }, [child._id, client]);

    const onRequestApproval = async (request: Transaction) => {
        try {
            setLoading(true);
            const remainingPendingRequests = await client.approveRequest({...request, approved: ApprovalStatus.Approved});
            //Calculate new balance
            child.balance = child.balance - request.amount;
            await client.updateChildAccount(child);
            setPendingRequests(remainingPendingRequests);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onRequestDenied = async (request: Transaction) => {
        try {
            setLoading(true);
            const remainingPrendingRequests = await client.rejectRequest({...request, approved: ApprovalStatus.Rejected});
            setPendingRequests(remainingPrendingRequests);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const adjustBalance = async () => {
        try {
            setLoading(true);
            const newBalance = await client.adjustBalance(child._id, adjustment);

            child.balance = newBalance.balance;
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className={`shadow-lg  rounded-lg text-black  pl-2 pr-0 pb-0 relative  ${pendingRequests.length === 0 ? 'ring-1 bg-gray-200 ring-emerald-700 dark:ring-emerald-300' : 'bg-gray-200 ring-blue-700 ring-2'} z-10`}>
            {/*<Button buttonText="Delete" className={'ml-4'} onButtonPressed={() => onDeletePressed(child.id)}/> to be implemented in issue #12*/}

            {loadingRequests && <div>Loading requests...</div>}

            {loading &&
                <div className="absolute top-0 left-0 h-full w-full bg-white bg-opacity-40 z-10 flex items-center justify-center">
                    <div className="flex items-center">
                        <span className="text-3xl mr-4">Loading</span>
                        <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </div>
                </div>}

            <div className={'flex justify-between'}>
                <div className={'flex flex-col w-full'}>
                    <div className={'flex flex-row justify-between'}>
                        <div className={'flex flex-col pb-2 pt-2'}>
                            <div className={'text-base'}>{child.displayName}</div>
                            <div className={'font-bold text-2xl'}>${child.balance}</div>
                            <div className={'text-sm text-gray-400'}>{child.interest}% Interest</div>

                            {pendingRequests.length > 0 &&
                                <div className={'flex items-center text-sm w-full h-full font-bold rounded-none rounded-tr-lg bg-transparent text-gray-900 cursor-pointer user-select:none'}
                                     onClick={() => setShowRequests(!showRequests)}>
                                    <span className={'mr-1'}>{pendingRequests.length} request{pendingRequests.length > 1 ? 's' : ''}</span>
                                    {!showRequests && (<span className={"material-symbols-outlined"}>stat_1</span>)}
                                    {showRequests && (<span className={"material-symbols-outlined"}>stat_minus_1</span>)}
                                </div>}

                        </div>
                        <div className={'ml-3'}>
                        </div>
                        <div className={'flex flex-col overflow-clip w-20'}>
                            <Button className={`!w-full !h-full !rounded-b-none  !rounded-l-none !rounded-tr-lg`} buttonText={'add'}
                                           onButtonPressed={() => setShowAdjustment(true)}/>
                            <Button className={`!bg-red-500 !w-full !h-full !rounded-br-lg  !rounded-l-none !rounded-t-none ${pendingRequests.length > 0 ? '!rounded-t-none' : ''}`}
                                           buttonText={'remove'} onButtonPressed={() => setShowAdjustment(true)}/>
                        </div>
                    </div>

                    {showAdjustment && <div className={`flex flex-row`}>
                        <Button buttonText={"+"} onButtonPressed={() => setAdjustment(adjustment+1)}/>
                        <Button className={`!bg-red-500`} buttonText={'-'} onButtonPressed={() => setAdjustment(adjustment-1)}/>
                        <Input className={`border-1 border-black`} inputText={adjustment.toString()} onInputChanged={(newInput) => setAdjustment(Number(newInput))}/>
                        <Button variant={'secondary'} buttonText={'Submit'} onButtonPressed={adjustBalance}/>
                    </div>}

                    {!loadingRequests && showRequests && pendingRequests?.map((request: Transaction) => (
                        <div id={request._id} key={request._id} className={'my-4 border-t border-gray-700'}>
                            <div data-testid={request._id}>Request ${request.amount}</div>
                            <div>Reason: {request.reason}</div>
                            <div className={'inline-flex'}>
                                <Button buttonText="Approve" onButtonPressed={() => onRequestApproval(request)}/>
                                <Button variant={"secondary"} buttonText={"Deny"} className={"ml-4"} onButtonPressed={() => onRequestDenied(request)}/>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

