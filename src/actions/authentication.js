"use server";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import User from "@/models/User";
import { auth } from "@/firebase";
import dbConnect from "@/lib/db";

export async function SignUp(formData) {
  try {
    await dbConnect();

    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    console.log(email);

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const newUser = new User({
      firebaseUid: user.uid,
      name,
      email,
      role: "user",
    });

    await newUser.save();
    console.log("User saved to mongo ", newUser);

    return { success: true, userId: user.uid };
  } catch (error) {
    return { error: error.message };
  }
}

export async function login(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
      },
    };
  } catch (error) {
    return { error: error.message };
  }
}
