"use server";

import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // get user question ids

    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: Delete user answers, comments, etc

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUser(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 20 } = params;
    const skipAmmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof User> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {};

    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;
      default:
        break;
    }
    const users = await User.find(query)
      .skip(skipAmmount)
      .limit(pageSize)
      .sort(sortOptions);
    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmmount + users.length;
    return { users, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      // remove question from saved
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      // add question to saved
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestion(params: GetSavedQuestionParams) {
  try {
    connectToDatabase();
    const { clerkId, searchQuery, filter, page = 1, pageSize = 20 } = params;
    const skipAmmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;
      default:
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmmount,
        limit: pageSize + 1,
      },
      populate: [
        {
          path: "tags",
          model: Tag,
          select: "_id name",
        },
        {
          path: "author",
          model: User,
          select: "_id name picture clerkId",
        },
      ],
    });
    if (!user) {
      throw new Error("User not found");
    }
    const isNext = user.saved.length > pageSize;
    const savedQuestion = user.saved;
    return { questions: savedQuestion, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found!");
    }
    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    const [questionUpVotes] = await Question.aggregate([
      { $match: { author: user._id } },
      { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [answerUpVotes] = await Answer.aggregate([
      { $match: { author: user._id } },
      { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [questionViews] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);
    const criteria = [
      { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
      {
        type: "QUESTION_UPVOTES" as BadgeCriteriaType,
        count: questionUpVotes?.totalUpvotes || 0,
      },
      {
        type: "ANSWER_UPVOTES" as BadgeCriteriaType,
        count: answerUpVotes?.totalUpvotes || 0,
      },
      {
        type: "TOTAL_VIEWS" as BadgeCriteriaType,
        count: questionViews?.totalViews || 0,
      },
    ];
    const badgetCount = assignBadges({ criteria });

    return {
      user,
      totalAnswers,
      totalQuestions,
      badgetCount,
      reputation: user.reputation,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { page = 1, pageSize = 20, userId } = params;
    const skipAmmount = (page - 1) * pageSize;

    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .skip(skipAmmount)
      .limit(pageSize)
      .sort({ views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");
    const isNext = totalQuestions > skipAmmount + userQuestions.length;
    return { totalQuestions, questions: userQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { page = 1, pageSize = 20, userId } = params;
    const skipAmmount = (page - 1) * pageSize;

    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .skip(skipAmmount)
      .limit(pageSize)
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");
    const isNext = totalAnswers > skipAmmount + userAnswers.length;
    return { totalAnswers, answers: userAnswers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function getAllUser(params: GetAllUsersParams) {
//   try {
//     connectToDatabase();

//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
