import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}
export interface CreateQuestionParams {
  title: string;
  tags: string[];
  content: string;
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

interface ClerkId {
  clerkId: string;
}
interface Path {
  path: string;
}
interface OptionalPage {
  page?: number;
}
interface OptionalPageSize {
  pageSize?: number;
}
interface OptionalSearch {
  searchQuery?: string;
}
interface OptionalFilter {
  filter?: string;
}
interface UserId {
  userId: string;
}

export interface DeleteUserParams extends ClerkId {}

export interface CreateUserParams extends ClerkId {
  name: string;
  username: string;
  email: string;
  picture: string;
}
interface Searchable
  extends OptionalPage,
    OptionalPageSize,
    OptionalSearch,
    OptionalFilter {}
export interface UpdateUserParams extends ClerkId, Path {
  updateData: Partial<IUser>;
}
export interface GetAllUsersParams extends Searchable {}
export interface GetTopInteractedTagsParams extends UserId {
  limit?: number;
}
