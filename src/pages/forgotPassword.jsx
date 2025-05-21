import { useState } from "react";
import { getforgotpswd } from "../apiService/allApi"

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await getforgotpswd({ email });
            if (result.status === 200) {
               successNotification();
               
                
            } else {
                errorNotification();
            }
        } catch (error) {
            errorNotification();
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                <div className="bg-indigo-600 px-6 py-8 rounded-t-2xl">
                    <h2 className="text-center text-3xl font-bold text-white">Forgot Password?</h2>
                    <p className="mt-2 text-center text-indigo-200 text-sm">
                        Enter your email below, and we'll send you a reset link.
                    </p>
                </div>
                <form  className="px-6 py-8">
                    <div className="mb-4">
                        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-md transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleSubmit}
                    >
                        Send Reset Link
                    </button>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Remembered your password? <a href="/login" className="text-indigo-600 hover:underline">Back to login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
