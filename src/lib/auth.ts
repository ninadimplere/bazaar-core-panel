import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

declare global {
  interface Window {
    recaptchaVerifier: import("firebase/auth").RecaptchaVerifier;
  }
}

// Setup invisible reCAPTCHA — safe for Next.js client-side use
export const setupRecaptcha = () => {
  if (typeof window === "undefined") return;

  if (typeof window !== "undefined" && !window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      },
    );
  }
};

export const sendPhoneOtp = async (
  phone: string,
): Promise<ConfirmationResult> => {
  if (typeof window === "undefined") throw new Error("Window is undefined");

  setupRecaptcha();
  const appVerifier = window.recaptchaVerifier;
  return await signInWithPhoneNumber(auth, phone, appVerifier);
};

export const verifyPhoneOtp = async (
  confirmationResult: ConfirmationResult,
  otp: string,
) => {
  return await confirmationResult.confirm(otp);
};

export const sendEmailOtp = async (email: string) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/login",
    handleCodeInApp: true,
  };

  await sendSignInLinkToEmail(auth, email, actionCodeSettings);

  if (typeof window !== "undefined") {
    window.localStorage.setItem("emailForSignIn", email);
  }
};

export const confirmEmailOtp = async (url: string) => {
  if (typeof window === "undefined") return null;

  const email = window.localStorage.getItem("emailForSignIn");

  if (email && isSignInWithEmailLink(auth, url)) {
    const result = await signInWithEmailLink(auth, email, url);
    window.localStorage.removeItem("emailForSignIn");
    return result.user;
  }

  return null;
};

export {};
