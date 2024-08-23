import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


export const GET = async (req, { params }) => {
  try {

    await connectToDB()

    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator')
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to fetch users prompts", { status: 500 })
  }
};
