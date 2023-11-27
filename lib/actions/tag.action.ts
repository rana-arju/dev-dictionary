"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopintractedTag(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found!");
    return [
      { _id: "asda", name: "React js" },
      { _id: "asdsda", name: "Next js" },
      { _id: "asdsdaad", name: "MongoDB" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
