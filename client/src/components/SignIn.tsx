import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLoginMutation } from "../redux/api-slices/userApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "sonner";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const userInfo = useAppSelector((state) => state.auth.userInfo);

    useEffect(() => {
        if (userInfo !== null) {
            navigate("/journal");
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            // navigate("/journal");
            toast.success("Logged in");
        } catch (err: any) {
            toast.error(err.data.message);
        }
    };
    return (
        <div className="login-background flex items-center justify-center">
            <Link
                to="/"
                className="absolute top-8 left-8 flex items-center cursor-pointer">
                <MdKeyboardArrowLeft className="text-2xl" />
                <h2 className="text-[#D4D4D4]">Home</h2>
            </Link>
            <div className="box-shadow w-[390px] bg-[#1D1D1D] rounded-2xl p-4 flex flex-col justify-between">
                <h1 className="text-[#D4D4D4] text-[1.25rem] text-center mb-4 leading-5">
                    Welcome
                </h1>
                <div>
                    <button className="flex items-center justify-center gap-3 w-full border-[0.5px] border-[#777777] p-2 rounded-md hover:bg-[#707070]/20 transition-colors duration-100">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.8299 8.17999C15.8299 7.65332 15.7833 7.15332 15.7033 6.66666H8.16992V9.67332H12.4833C12.2899 10.66 11.7233 11.4933 10.8833 12.06V14.06H13.4566C14.9633 12.6667 15.8299 10.6133 15.8299 8.17999Z"
                                fill="#4285F4"></path>
                            <path
                                d="M8.17003 16C10.33 16 12.1367 15.28 13.4567 14.06L10.8834 12.06C10.1634 12.54 9.25003 12.8333 8.17003 12.8333C6.08336 12.8333 4.3167 11.4267 3.68336 9.52667H1.03003V11.5867C2.34336 14.2 5.04336 16 8.17003 16Z"
                                fill="#34A853"></path>
                            <path
                                d="M3.68326 9.52666C3.51659 9.04666 3.42992 8.53333 3.42992 7.99999C3.42992 7.46666 3.52326 6.95333 3.68326 6.47333V4.41333H1.02992C0.483255 5.49333 0.169922 6.70666 0.169922 7.99999C0.169922 9.29333 0.483255 10.5067 1.02992 11.5867L3.68326 9.52666Z"
                                fill="#FBBC05"></path>
                            <path
                                d="M8.17003 3.16667C9.35003 3.16667 10.4034 3.57334 11.2367 4.36667L13.5167 2.08667C12.1367 0.793334 10.33 0 8.17003 0C5.04336 0 2.34336 1.8 1.03003 4.41334L3.68336 6.47334C4.3167 4.57334 6.08336 3.16667 8.17003 3.16667Z"
                                fill="#EA4335"></path>
                        </svg>
                        Log in with Google
                    </button>
                </div>
                <div className="px-28">
                    <p className="flex items-center whitespace-nowrap px-2 py-6 text-center text-[0.9rem] text-[#D4D4D4] before:mr-2 before:h-[2px] before:w-full before:bg-[#D4D4D4] after:ml-2 after:h-[2px] after:w-full after:bg-[#D4D4D4]">
                        OR
                    </p>
                </div>
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email..."
                            className="w-full rounded-md outline-none border-none bg-[#707070]/10 py-1 px-2 placeholder-gray-400/50  text-[#D4D4D4]"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password..."
                            className="w-full rounded-md outline-none border-none bg-[#707070]/10 py-1 px-2 placeholder-gray-400/50 text-[#D4D4D4]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#4A4340] p-1 text-[#D4D4D4] rounded-xl button-shadow-signin mb-4">
                        Log in
                    </button>
                </form>
                <div className="flex gap-2 border-t py-4 border-dotted items-center justify-center">
                    <p>Don't have an account?</p>{" "}
                    <Link to="/signup" className="underline cursor-pointer">
                        Sign up here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
