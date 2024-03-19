import React from "react";

import EditUserForm from "@/components/forms/editUserForm";
import { getUserById } from "@/lib/adminController";
import { UserToken } from "@/types/common.types";
import { getCurrentUser } from "@/lib/session";

export default async function EditUser({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getCurrentUser();
  if (!session) {
    return <div>Error in session</div>;
  }
  const userResponse = await getUserById(id, session?.user?.token as string);
  const user: UserToken = userResponse?.data;
  return (
    <div className="w-[60%]  mx-auto">
      <EditUserForm user={user} />
    </div>
  );
}
