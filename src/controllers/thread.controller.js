import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createThread } from "../utils/threadsHandler.js";

const createNewThread = asyncHandler(async (req, res)=> {
    const thread = await createThread();

    res.status(201).json(
        new ApiResponse(201, "New thread created successfully", {thread: thread.id})
    )
})

export {createNewThread}