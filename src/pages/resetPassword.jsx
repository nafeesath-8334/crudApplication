import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {  useNavigate, useParams } from "react-router-dom";
import {  resetPassword } from "../Apiservice/allApi";


const ResetPassword = () => {
  const { token } = useParams(); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const navigate=useNavigate
  const notifySuccess = () => toast.success("Password reset successful!");
  const notifyError = (msg) => toast.error(msg || "Password reset failed.");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return notifyError("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return notifyError("Passwords do not match.");
    }

    try {
      const result = await resetPassword(token, { password });
      if (result.status === 200) {
        notifySuccess();
        navigate("/login")
      } else {
        notifyError("Reset failed.");
      }
    } catch (error) {
      notifyError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-indigo-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
          Reset Your Password
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border px-4 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border px-4 py-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 transition"
        >
          Reset Password
        </button>

        <ToastContainer position="top-right" autoClose={5000} />
      </form>
    </div>
  );
};

export default ResetPassword;


