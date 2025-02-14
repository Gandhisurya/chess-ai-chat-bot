"use server";

import { cookies } from "next/headers";

export const removeAuthToken = async () => {
  cookies().delete("auth_token");
};
