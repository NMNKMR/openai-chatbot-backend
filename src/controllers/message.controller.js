import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { addMessageToThread, getMessages, runThreadByStream } from "../utils/threadsHandler.js";

const addMessageGetResponse = asyncHandler(async (req, res)=> {
    const {threadId, message} = req.body;

    if(!threadId) {
        throw new ApiError(404, "Thread id is required");
    }

    const response = await addMessageToThread(threadId, message);

    runThreadByStream(res, threadId, response.id);

})

const getUserMessages = asyncHandler(async (req, res)=> {
    const {threadId} = req.params;

    if(!threadId) {
        throw new ApiError(404, "Thread id is required");
    }
    
    const threadMessages = await getMessages(threadId)

    res.status(200).json(
        new ApiResponse(200, "Messages fetched successfully!", {messages: threadMessages.data})
    )
})


export {
    addMessageGetResponse,
    getUserMessages
}