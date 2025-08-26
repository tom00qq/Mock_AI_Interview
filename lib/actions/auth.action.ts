"use server";

import { db } from "@/firebase/admin";

export const signUp = async (param: SignUpParams) => {
  const { uid, name, email } = param;

  try {
    const useRecord = await db.collection("users").doc(uid).get();

    if (useRecord.exists) {
      return {
        success: false,
        message: "User already existed",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Sign up successfully",
    };
  } catch (error: any) {
    if (error.code === "auth-email-already-exists") {
      return {
        success: false,
        message: "Email alreay existed. Please sign in",
      };
    }

    return {
      success: false,
      message: "SignUp failed",
    };
  }
};
