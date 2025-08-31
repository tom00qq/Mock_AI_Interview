"use server";

import { auth, db } from "@/firebase/admin";
import { Rethink_Sans } from "next/font/google";
import { cookies } from "next/headers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

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

export const signIn = async (param: SignInParams) => {
  const { idToken } = param;

  try {
    await setSessionCookie(idToken);

    return {
      success: true,
      message: "Success",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "SignIn failed",
    };
  }
};

export const signOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};

export const setSessionCookie = async (idToken: string) => {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000,
  });

  // when response tell browser to set cookie
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true, // not allowed Js edit
    secure: process.env.NODE_ENV === "production", // only with HTTPS
    path: "/", // all path should pass cookie when request
    sameSite: "lax", // only passs cookie with same site
  });
};

export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();

  const sesstionCookie = cookieStore.get("session")?.value;
  if (!sesstionCookie) return null;

  const decodedClaims = await auth.verifySessionCookie(sesstionCookie, true);

  const userRecord = await db.collection("users").doc(decodedClaims.uid).get();
  if (!userRecord.exists) return null;

  return {
    ...userRecord.data(),
    id: userRecord.id,
  } as User;
};

export const isAuthenticated = async () => {
  const user = await getCurrentUser();

  return user ? true : false;
};

export const getInterviewsById = async (
  userId: string
): Promise<Interview[]> => {
  const interviewRecords = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviewRecords.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];
};

export const getLatestInterviews = async (
  params: GetLatestInterviewsParams
): Promise<Interview[]> => {
  const { userId, limit = 6 } = params;

  const interviewRecords = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviewRecords.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];
};
