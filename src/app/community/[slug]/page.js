"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Spotlight } from "@/components/ui/spotlight";
import { FadeText } from "@/components/ui/fade-text";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import { useSession } from "next-auth/react";

export default function Home({ params }) {
	const [data, setData] = useState([]);
	const [id, setId] = useState("")

	const { data: session, status } = useSession();
	const [liked, setLiked] = useState(false);
	const router = useRouter();
	useEffect(() => {
		async function fetchData() {
			const res = await fetch("/api/fetchById", {
				cache: "no-cache",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					targetID: params.slug
				})
			})

			const listPosts = await res.json();

			setData(listPosts);
			setLiked(listPosts[0].likedBy.includes(session.user.id));
			if (listPosts.length == 0) router.push("/community")
		}

		fetchData();
	}, [status]);



	// redirect if user is signed in
	useEffect(() => {
		if (status == "authenticated")
			setId(session.user.id)
	}, []);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start  ">



				<DotPattern className={cn("fill-gray-400 opacity-70  bg-[#f5f5f5] -z-10 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]")}>
				</DotPattern>
				{data.length > 0 &&
					<>
						<button onClick={() => router.push('/community')} className="absolute border top-24 rounded-full hover:border-white hover:bg-neutral-800 hover:text-white transition-colors border-neutral-300 px-3 py-2 ">

							&larr; Back
						</button>
						<div className="grid grid-cols-1 lg:gap-12 w-full lg:grid-cols-2 -mt-8 lg:-mt-16 xl:-mt-24">
							<CardContainer className="lg:order-last  w-full h-full -mt-10">

								<CardItem translateZ="20" className="h-full w-full">
									<img
										src={data[0].imageUrl}
										alt={data[0].title}
										className="w-full h-full object-cover shadow-lg rounded-lg select-none"
									/>
								</CardItem>
							</CardContainer>
							<div className="lg:order-first w-full  flex lg:justify-center lg:items-center lg:mb-0 lg:mt-0 -mt-8 mb-16">
								<div>

									<div
										className={cn(
											`mb-2 leading-10 text-black text-left sm:text-6xl md:text-7xl lg:text-8xl text-5xl bg-opacity-60`,
											// `relative mb-3 mt-5 -translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-30% to-black/40 bg-clip-text py-6 text-5xl font-extrabold font-semibold leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl`
										)}
									>
										{data[0].title}
									</div>


									<div className="text-left -mt-1 sm:text-xl md:text-2xl text-lg text-neutral-500">
										By	{data[0].name}



									</div>



									<div className="flex items-left justify-left  mt-8 gap-4 flex-col">
										<div className="w-full lg:w-5/6 bg-neutral-100 rounded-lg border-neutral-200  border-2 px-4 py-2">
											<p className="font-semibold text-lg">Description</p>

											<div className="text-neutral-700">

												{data[0].description}</div>
										</div>
										<div className="w-full lg:w-5/6 bg-neutral-100 rounded-lg border-neutral-200  border-2 px-4 py-2">
											<p className="font-semibold text-lg">Tags</p>
											<div className="flex flex-row space-x-2 mt-1">

												{data[0].tags.map((tag) => (
													<div className="text-neutral-700 px-2 py-1 bg-neutral-50 border border-neutral-300 rounded-lg">

														{tag}</div>
												))}
											</div>
										</div>
										<div className="text-neutral-700">

											Created on {data[0].createdAt.toString().split('T').slice(0, 1).join(' ')}</div>
										{id != "" &&
											<div className="flex space-x-2 items-center">

												<div className="text-lg text-neutral-700">
													Like
												</div>
												<button onClick={async (e) => {
													setLiked(liked => !liked);
													const res = await fetch("/api/like", {
														cache: 'no-cache',
														method: "POST",
														body: JSON.stringify({
															postID: params.slug
														}),
														headers: {
															"Content-Type": "application/json",
														},
													})

													const data = await res.json();

													console.log(data);

												}} className="border w-fit rounded-full hover:border-white hover:bg-neutral-800 hover:text-white transition-colors border-neutral-300 px-3 py-2 ">

													{liked ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
														<path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
													</svg>
														: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
															<path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
														</svg>
													}
												</button>
											</div>}

									</div>
								</div>
							</div>

						</div></>}



			</main>

		</div >
	);
}
