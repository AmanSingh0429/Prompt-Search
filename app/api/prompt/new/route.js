import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const reqBody = await req.json()
  const { userId, prompt, tag } = reqBody
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    });
    await newPrompt.save();
    console.log("Prompt saved")
    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    console.error("Error saving prompt:", error.message);
    return new Response("Failed to add new prompt", { status: 500 })
  }
};
