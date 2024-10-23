"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Spotlight } from "@/components/ui/spotlight";
import { FadeText } from "@/components/ui/fade-text";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export default function Home() {
	const [email, setEmail] = useState("")
	const [data, setData] = useState([]);
	const [liked, setLiked] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const res = await fetch("/api/fetchAll", {
				cache: "no-cache",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})

			const listPosts = await res.json();
			const authorPosts = listPosts.filter(function (e) { return e.authorId === session.user.id; })
			const likedPosts = listPosts.filter(function (e) { return e.likedBy.includes(session.user.id); })
			setData(authorPosts);
			setLiked(likedPosts);
		}

		fetchData();
	}, []);
	const { data: session, status } = useSession();
	const router = useRouter();

	// redirect if user is signed in
	useEffect(() => {
		if (status !== "authenticated") {
			router.push("/");
		}
		setEmail(session.user.email)
	}, []);
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<DotPattern className={cn("fill-gray-400 opacity-70 min-h-screen h-full  bg-[#f5f5f5] -z-10 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]")}>
			</DotPattern>
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start  ">



				{data.length > 0 &&
					<>
						<div className="w-full flex justify-center items-center mb-12">

							<div>

								<div
									className={cn(
										`max-w-7xl mb-2 leading-10 text-black text-center sm:text-6xl md:text-7xl lg:text-8xl text-5xl bg-opacity-60`,
										// `relative mb-3 mt-5 -translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-30% to-black/40 bg-clip-text py-6 text-5xl font-extrabold font-semibold leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl`
									)}
								>
									Welcome back.
								</div>


								<div className="sm:text-xl text-center md:text-2xl text-lg text-neutral-500">
									Signed in as {email}
								</div>
							</div>
						</div>
						<div className="flex items-center justify-center  flex-col">
							<div
								className={cn(
									`max-w-7xl leading-10 text-black text-center sm:text-xl md:text-2xl lg:text-3xl text-lg bg-opacity-60`,
									// `relative mb-3 mt-5 -translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-30% to-black/40 bg-clip-text py-6 text-5xl font-extrabold font-semibold leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl`
								)}
							>
								Your Expressions
							</div>

							<ScrollArea className="max-w-[80vw] mt-2  rounded-md border">
								<div className="   flex w-max space-x-4 p-4">
									{data.map((post) => (

										<figure key={post.id} className="max-w-md shrink-0 w-max aspect-square inline-block ">
											<div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
												<img
													src={post.imageUrl}
													alt={post.title}
													className="w-full h-64 object-cover"
													style={{ aspectRatio: "600/400", objectFit: "cover" }}
												/>
												<div className="p-4 space-y-2">
													<h3 className="text-xl font-semibold leading-5"><div className="flex items-center">
														{post.title} {post.visibility ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 inline ml-2">
															<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
														</svg>
															: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 inline ml-2">
																<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
															</svg>
														}</div>
														<span className="text-base font-medium text-gray-500 ">{post.name} ({post.createdAt.toString().split('T').slice(0, 1).join(' ')})</span></h3>

													<p className="text-gray-500 text-ellipsis">{post.description}</p>
													<div className="flex items-center justify-between">
														<div className={"flex space-x-2"}>
															{post.tags.map((tag) => (
																<span className="w-fit text-ellipsis p-0.5 px-1 rounded-lg w-fit text-center bg-neutral-100">
																	{tag}
																</span>
															))}
														</div>
														<button onClick={() => router.push('/community/' + post.id)}>Learn more &rarr;</button>
													</div>
												</div>
											</div>
										</figure>
									))}
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>

						<div className="mt-12 flex w-full items-center justify-center flex-col">
							<div
								className={cn(
									`max-w-7xl leading-10 text-black text-center sm:text-xl md:text-2xl lg:text-3xl text-lg bg-opacity-60`,
									// `relative mb-3 mt-5 -translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-30% to-black/40 bg-clip-text py-6 text-5xl font-extrabold font-semibold leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl`
								)}
							>
								Liked Expresssions
							</div>

							<ScrollArea className="max-w-[80vw] mt-2   rounded-md border">
								<div className="   flex w-max space-x-4 p-4">
									{liked.map((post) => (

										<figure key={post.id} className="max-w-md shrink-0 w-max aspect-square inline-block ">
											<div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
												<img
													src={post.imageUrl}
													alt={post.title}
													className="w-full h-64 object-cover"
													style={{ aspectRatio: "600/400", objectFit: "cover" }}
												/>
												<div className="p-4 space-y-2">
													<h3 className="text-xl font-semibold leading-5"><div className="flex items-center">
														{post.title} {post.visibility ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 inline ml-2">
															<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
														</svg>
															: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 inline ml-2">
																<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
															</svg>
														}</div>
														<span className="text-base font-medium text-gray-500 ">{post.name} ({post.createdAt.toString().split('T').slice(0, 1).join(' ')})</span></h3>

													<p className="text-gray-500 text-ellipsis">{post.description}</p>
													<div className="flex items-center justify-between">
														<div className={"flex space-x-2"}>
															{post.tags.map((tag) => (
																<span className="w-fit text-ellipsis p-0.5 px-1 rounded-lg w-fit text-center bg-neutral-100">
																	{tag}
																</span>
															))}
														</div>
														<button onClick={() => router.push('/community/' + post.id)}>Learn more &rarr;</button>
													</div>
												</div>
											</div>
										</figure>
									))}
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>



					</>}



			</main>

		</div >
	);
}
