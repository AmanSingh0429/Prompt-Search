import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";



export const GET = async (req, { params }) => {
  try {
    await connectToDB();


    // Note:- Use .lean() to return a plain JavaScript object
    const prompt = await Prompt.findById(params.id).populate('creator');


    if (!prompt) {
      console.log("prompt not found");
      return new Response("prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB()
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("prompt not found", { status: 404 })
    }

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 })

  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 })
  }
};

export const DELETE = async (req, { params }) => {
  try {
    console.log("at delete route")
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully ", { status: 200 })

  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 })
  }
};

