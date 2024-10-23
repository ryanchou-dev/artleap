"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Spotlight } from "@/components/ui/spotlight";
import { FadeText } from "@/components/ui/fade-text";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [data, setData] = useState([]);
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

			setData(listPosts.filter(function (e) { return e.visibility }));
		}

		fetchData();
	}, []);
	const router = useRouter();

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start  ">



				<DotPattern className={cn("fill-gray-400 opacity-70  bg-[#f5f5f5] -z-10 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]")}>
				</DotPattern>
				{data.length > 0 &&
					<>
						<div className="w-full flex justify-center items-center mb-24">

							<div>

								<div
									className={cn(
										`max-w-7xl mb-2 leading-10 text-black text-center sm:text-6xl md:text-7xl lg:text-8xl text-5xl bg-opacity-60`,
										// `relative mb-3 mt-5 -translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-30% to-black/40 bg-clip-text py-6 text-5xl font-extrabold font-semibold leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl`
									)}
								>
									Community
								</div>


								<div className="sm:text-xl md:text-2xl text-lg text-neutral-500">
									Explore expressions from ArtLeap members!
								</div>
							</div>
						</div>



						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{data.map((post) => (

								<div className="w-full max-w-md aspect-square">
									<div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
										<img
											src={post.imageUrl}
											alt={post.title}
											className="w-full h-64 object-cover"
											style={{ aspectRatio: "600/400", objectFit: "cover" }}
										/>
										<div className="p-4 space-y-2">
											<h3 className="text-xl font-semibold leading-5">{post.title}<br /><span className="text-base font-medium text-gray-500 ">{post.name}</span></h3>

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
								</div>
							))}
						</div></>}



			</main>

		</div >
	);
}
