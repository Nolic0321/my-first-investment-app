import {ChildAccount} from "@models/child-account";
import {ApprovalStatus, Transaction} from "@models/transaction";
import Button from "@components/Button";
import {useContext, useEffect, useState} from "react";
import {ClientContext} from "@contexts/ClientContext";
import IClient from "@models/client";

export type ChildPreviewProps = {
    child: ChildAccount;
    onChildSelected: (child: ChildAccount) => void;
}

export function ChildPreview({child}: ChildPreviewProps) {
    const [childAccounts, setChildAccounts] = useState<ChildAccount[]>([]);
    const [loading, setLoading] = useState(true);
    const [pendingRequests, setPendingRequests] = useState<Transaction[]>([]);
    const [loadingRequests, setLoadingRequests] = useState(true);
    const client = useContext(ClientContext) as unknown as IClient

    useEffect(() => {
        getPendingRequestsForChild()
    }, []);
    const getPendingRequestsForChild = async () => {

        const pendingRequestsResponse = await client.getPendingRequestsForChild(child._id);
        setPendingRequests(pendingRequestsResponse);
        setLoadingRequests(false);
        setLoading(false);
    }

    const onRequestApproval = async (request: Transaction) => {
        try{
            setLoading(true);
            const remainingPendingRequests = await client.approveRequest({...request, approved: ApprovalStatus.Approved});
            const updatedChildAccounts = childAccounts.map((child) => {
                if (child._id === request.childId) {
                    child.balance -= request.amount;
                }
                client.updateChildAccount(child);
                return child;
            });
            setChildAccounts(updatedChildAccounts);
            setPendingRequests(remainingPendingRequests);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onRequestDenied = async (request: Transaction) => {
        try{
            setLoading(true);
            const remainingPrendingRequests = await client.rejectRequest({...request, approved: ApprovalStatus.Rejected});
            setPendingRequests(remainingPrendingRequests);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={'shadow-lg ring-1 rounded-lg ring-emerald-700 bg-gray-300 text-black p-2 relative'}>
            <div>{child.displayName}</div>
            {/*<Button buttonText="Delete" className={'ml-4'} onButtonPressed={() => onDeletePressed(child.id)}/> to be implemented in issue #12*/}
            {loadingRequests && <div>Loading requests...</div>}
            {loading &&
                <div className="absolute top-0 left-0 h-full w-full bg-white bg-opacity-60 z-10 flex items-center justify-center">
                    <div className="flex items-center">
                        <span className="text-3xl mr-4">Loading</span>
                        <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </div>
                </div>}
            {!loadingRequests && pendingRequests?.length === 0 && <div>No pending requests</div>}
            {!loadingRequests && pendingRequests?.map((request: Transaction) => (
                <div id={request._id} key={request._id} className={'my-4'}>
                    <div data-testid={request._id}>Request ${request.amount}</div>
                    <div>Reason: {request.reason}</div>
                    <div className={'inline-flex'}>
                        <Button buttonText="Approve" onButtonPressed={() => onRequestApproval(request)}/>
                        <Button buttonText={"Deny"} className={"ml-4"} onButtonPressed={() => onRequestDenied(request)}/>
                    </div>
                </div>
            ))}
        </div>)
}
