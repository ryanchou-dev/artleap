"use client";
// Interaction on mobile screens
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react'
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
// Pulls the current URL from client.
import { usePathname } from 'next/navigation';

export function MainNav() {
	const { data: session, status } = useSession();
	const currentPage = usePathname();
	const navigation = [
		{ name: 'Home', href: '/', current: currentPage == "/" },
		{ name: 'Community', href: '/community', current: currentPage == "/community" },
		{ name: 'Create', href: '/create', current: currentPage == "/create" },
		{ name: 'Profile', href: '/profile', current: currentPage == "/profile" },
	]


	return (

		<div className="fixed top-0 z-50 w-full  bg-background/95 backdrop-blur bg-background/60">
			<Disclosure >
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
							<div className="relative flex h-16 items-center justify-between">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
											</svg>


										) : (
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
											</svg>
										)}
									</DisclosureButton>
								</div>
								<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
									<Link href="/" className="flex flex-shrink  items-center text-2xl">

										<div className="flex items-center justify-center   ">
											<img alt="ArtLeap Logo" src="/logos/artleap.svg" className="h-12 w-12" />
										</div>
										{" "}
									</Link>
									<div className="hidden sm:ml-6 sm:block  ">
										<div className="flex space-x-4 h-full items-center justify-center">
											{navigation.map((item) => {
												// Show Courses page only if user is signed in.
												if (item.name == "Home" || item.name == "Community" || status == "authenticated") {
													return (
														<Link
															key={item.name}
															href={item.href}
															className={
																(item.current ? 'text-gray-900 border border-[#1a1a1a]/50' : 'text-gray-500 hover:text-gray-700') +
																' rounded-full px-5 py-2 text-base font-medium'
															}
															aria-current={item.current ? 'page' : undefined}
														>
															{item.name}
														</Link>
													)
												}
											})}
										</div>
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									{/* Profile dropdown */}
									<div>
										<div className="relative flex rounded-full  text-sm ">
											<span className="sr-only">Open user menu</span>
											{status == "authenticated" ?
												<button title="Sign Out" onClick={() => signOut()}>

													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
														<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
													</svg>
												</button>

												: <Link href={"/sign-in"}

													className={
														// 'border-[#1a1a1a]/50 text-white' +
														' rounded-full px-5 py-2 text-base font-medium' + ' text-gray-500 hover:text-gray-700'
													}
												>
													<div>
														Register/Login
													</div>

												</Link>
											}
										</div>
									</div>
								</div>
							</div>
						</div>

						<DisclosurePanel className="sm:hidden">
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.map((item) => {
									// Show Courses page only if user is signed in.
									if (item.name == "Home" || item.name == "Community" || status == "authenticated") {
										return (
											<DisclosureButton
												key={item.name}
												as="a"
												href={item.href}
												className={
													(item.current ? 'border-[#1a1a1a]/50 text-black border-2' : 'text-gray-600 hover:bg-[#1a1a1a]/80 hover:text-white') +
													' block rounded-md px-3 py-2 text-base font-medium'
												}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</DisclosureButton>
										)
									}
								})}
							</div>
						</DisclosurePanel>
					</>
				)}
			</Disclosure>
		</div >
	)
}
