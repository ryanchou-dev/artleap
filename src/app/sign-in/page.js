"use client";
import React, { useEffect, useState } from "react";
// for redirects & jwt reading
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// sign in hook for user
import { signIn } from "next-auth/react";
import Link from "next/link";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
export default function SignIn() {
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState(false);
	const { data: session, status } = useSession();
	const router = useRouter();

	// redirect if user is signed in
	useEffect(() => {
		if (status == "authenticated") {
			router.push("/");
		}
	}, []);

	return (
		<>
			{/* Dynamic form screen */}
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
				<DotPattern className={cn("fill-gray-400 opacity-50 min-h-screen h-full  bg-[#f5f5f5] -z-10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]")}>
				</DotPattern>

				<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start  ">


					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<div className="flex items-center justify-center">

							<img alt="ArtLeap Logo" src="/logos/artleap.svg" className="h-20 w-20" />
						</div>
						{/* <div className="font-bold text-5xl  bg-clip-text text-transparent flex items-center justify-center bg-gradient-radial from-[#4ea877] to-[#224e36]  "> */}
						{/* 🐏 */}
						{/* </div> */}
						<h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
							{success ? "Check your email" : "Register/Log In to ArtLeap"}
						</h2>
						<p className=" text-center text-sm font-medium leading-8 text-gray-600">

							{success ? <div>We&apos;ve sent a temporary login link. <br /> Please check your inbox at <b>{email}</b></div> : "A temporary login link will be sent to your email."}
						</p>
					</div>

					{!success && <div className="mt-2 w-full sm:w-full ">
						{/* prevent form refresh */}
						<form
							className="space-y-6 w-full"
							onSubmit={async (e) => {
								e.preventDefault();
								const ret = await signIn("email", { redirect: false, email });
								if (ret.ok) setSuccess(true);
							}}
						>
							<div className="w-full">
								<label
									htmlFor="email"
									className="block text-center text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								{/* input validation */}
								<div className="mt-2 w-full">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="text-center w-full">
								<button
									type="submit"
									className="rounded-md w-full border border-solid transition-colors flex items-center justify-center hover:text-[#1a1a1a] hover:border-2 hover:border-[#1a1a1a]/50 hover:bg-[#f2f2f2] bg-[#1a1a1a]  text-white text-sm  h-10 px-4 sm:px-5 sm:min-w-44"
								>
									Continue
								</button>
							</div>
						</form>
					</div>}

					{/* Conditional component - email sent */}
					{success &&
						<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex items-center justify-center"><button
							onClick={() => setSuccess(false)}
							className="flex items-center justify-center rounded-md px-3 py-1.5 text-sm underline underline-offset-2 font-semibold leading-6 text-gray-600   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Back to Login
						</button></div>

					}
				</main>
			</div>
		</>
	);
}
