import { deleteById } from "@mongoDataApiHelper";

export const DELETE = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const numberDeleted = await deleteById('transactions', params.id)
        if (!numberDeleted || numberDeleted.deletedCount == 0) throw new Error('Failed to delete transaction')
        return Response.json(numberDeleted);
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: `Server error: ${error}`
        })
    }
}