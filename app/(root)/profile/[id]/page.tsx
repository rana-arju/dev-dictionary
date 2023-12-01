import { URLProps } from "@/types";
import React from "react";

function Profile({ params, searchQuery }: URLProps) {
  return <div>{params.id}</div>;
}

export default Profile;
