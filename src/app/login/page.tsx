"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import {
  confirmEmailOtp,
  sendEmailOtp,
  sendPhoneOtp,
  verifyPhoneOtp,
} from "@lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"choose" | "otp">("choose");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      confirmEmailOtp(window.location.href).then((user) => {
        if (user) router.push("/dashboard");
      });
    }
  }, []);

  const handleSendPhoneOtp = async () => {
    const result = await sendPhoneOtp(phone);
    setConfirmationResult(result);
    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    const user = await verifyPhoneOtp(confirmationResult, otp);
    if (user) router.push("/dashboard");
  };

  const handleSendEmailOtp = async () => {
    await sendEmailOtp(email);
    alert("Email link sent!");
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h2 className="mb-4 text-xl font-bold">Seller Login</h2>

      {step === "choose" && (
        <>
          <div className="mb-3">
            <label>Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2"
            />
            <button
              onClick={handleSendPhoneOtp}
              className="mt-2 bg-blue-600 px-4 py-2 text-white"
            >
              Send OTP
            </button>
          </div>

          <div className="mb-3 mt-6">
            <label>Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2"
            />
            <button
              onClick={handleSendEmailOtp}
              className="mt-2 bg-green-600 px-4 py-2 text-white"
            >
              Send Email Link
            </button>
          </div>
        </>
      )}

      {step === "otp" && (
        <>
          <label>Enter OTP</label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border p-2"
          />
          <button
            onClick={handleVerifyOtp}
            className="mt-2 bg-blue-600 px-4 py-2 text-white"
          >
            Verify
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}
