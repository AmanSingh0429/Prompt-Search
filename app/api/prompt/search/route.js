import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


export const POST = async (req) => {
  try {
    await connectToDB();
    const { searchVal } = await req.json();

    const prompts = await Prompt.find({
      $or: [
        { prompt: { $regex: searchVal, $options: "i" } },
        { tag: { $regex: searchVal, $options: "i" } },
        { 'creator.username': { $regex: searchVal, $options: "i" } },
        { 'creator.email': { $regex: searchVal, $options: "i" } }
      ]
    }).populate('creator');


    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
