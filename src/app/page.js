import Image from "next/image";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Spotlight } from "@/components/ui/spotlight";
import { BentoShowcase } from "@/components/ui/bento-grid"


export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start  ">



				<DotPattern className={cn("fill-gray-400  bg-[#f5f5f5] -z-10 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]")}>
				</DotPattern>

				<div className="w-full flex justify-center items-center">

					<div
						className={cn(
							`max-w-7xl leading-10 text-black text-center sm:text-6xl md:text-7xl lg:text-8xl text-5xl bg-opacity-60`,
							// `relative mb-3 mt-5 -translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-30% to-black/40 bg-clip-text py-6 text-5xl font-extrabold font-semibold leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl`
						)}
					>
						Unfurl your ideas
						<p>
							with

							<img src={'/logos/artleap.svg'} className="mt-2 inline-block lg:w-32 lg:h-32  sm:w-20 sm:h-20 w-16 h-16 mr-1 ml-2 " />
							<span className="tracking-tight font-semibold ">artleap</span>
						</p>
					</div>
				</div>
				<div className="w-full mb-24 flex items-center justify-center">

					<a
						className="rounded-full border border-solid transition-colors flex items-center justify-center hover:text-[#1a1a1a] hover:border-2 hover:border-[#1a1a1a]/50 hover:bg-[#f2f2f2] bg-[#1a1a1a]  text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
						href="/sign-in"
						target="_blank"
						rel="noopener noreferrer"
					>
						Get Started
					</a>
				</div>
				<BentoShowcase />






			</main>

		</div >
	);
}
