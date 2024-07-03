import { openai } from "../config/openaiConfig.js";
import { ApiResponse } from "./ApiResponse.js";

async function createThread() {
    const thread = await openai.beta.threads.create();
    return thread;
}

async function addMessageToThread(threadId, message) {
    const response = await openai.beta.threads.messages.create(
        threadId,
        {
            role: "user",
            content: message
        }
    );
    return response;
}

async function getMessages(threadId) {
  const threadMessages = await openai.beta.threads.messages.list(threadId, {
    limit: 25,
  });

  return threadMessages;
}

async function runThreadByStream(res, threadId, messageId) {
  openai.beta.threads.runs
    .stream(threadId, {
      assistant_id: process.env.ASSISTANT_ID,
    })
    .on("messageDelta", async (event) => {
      if(event.content[0].type === "text") {
        // console.log(event.content[0].text.value);
      }
    })
    .on("messageDone", async (event) => {
      if (event.content[0].type === "text") {
        
        res.status(201).json(
          new ApiResponse(
            201,
            "Message added successfully, here is the response",
            {
              user: messageId,
              assistant: event,
            }
          )
        );
      }
    });
}

export {addMessageToThread, getMessages, createThread, runThreadByStream}