"use client";
import React, { useEffect, useRef, useState } from "react";
// for redirects & jwt reading
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// sign in hook for user
import { signIn } from "next-auth/react";
import { Switch } from "@/components/ui/switch";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { base64StringToBlob } from "blob-util";
import { put } from "@vercel/blob";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { TagInput } from "emblor";


import { LuPencil, LuEraser, LuUndo, LuRedo, LuMinus, LuLock, LuUnlock } from "react-icons/lu";
import { dataURLToBlob } from "blob-util";
import { arrayBufferToBlob } from "blob-util";
import { blobToDataURL } from "blob-util";
import { v4 } from "uuid";
import { FadeText } from "@/components/ui/fade-text";
import { Textarea } from "@headlessui/react";
import { Label } from "@/components/ui/label";
import { fetchData } from "next-auth/client/_utils";
import DotPattern from "@/components/ui/dot-pattern";


export default function SignIn() {
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState(false);
	const [genImage, setGenImage] = useState("");
	const [imageDesc, setImageDesc] = useState("");
	const [description, setDescription] = useState("");

	const [loading, setLoading] = useState(false);

	const [title, setTitle] = useState("");
	const [name, setName] = useState("");

	const [page, setPage] = useState(0);


	const [tags, setTags] = useState([]);
	const [activeTagIndex, setActiveTagIndex] = useState(null);


	const [imageTab, setImageTab] = useState("Sketch")
	const canvasRef = useRef(null);

	const handleEraserClick = () => {
		canvasRef.current?.eraseMode(true);
	};

	const handlePenClick = () => {
		canvasRef.current?.eraseMode(false);
	};

	const handleUndoClick = () => {
		canvasRef.current?.undo();
	};

	const handleRedoClick = () => {
		canvasRef.current?.redo();
	};

	const handleClearClick = () => {
		canvasRef.current?.clearCanvas();
	};

	const generateImage = () => {
		setLoading(true);
		canvasRef.current
			.exportImage("jpg")
			.then((data) => {
				const blob = dataURLToBlob(data, "image/jpg");
				const form = new FormData()
				form.append("sketch_file", blob)
				form.append("prompt", "The provided sketch demonstrates the illustrator's emotions and feelings. Create an image with this sketch that best showcases these emotions. This text describes the emotion they're feeling: " + imageDesc);
				fetch("https://clipdrop-api.co/sketch-to-image/v1/sketch-to-image", {
					method: "POST",
					headers: {
						'x-api-key': process.env.NEXT_PUBLIC_CLIPDROP,
					},
					body: form,
				}).then(response => response.arrayBuffer())
					.then(buffer => {
						const blob2 = arrayBufferToBlob(buffer, 'image/jpg')
						const file = new File([blob2], v4())
						fetch(`/api/create/upload?filename=${file.name}.jpg`, {
							method: "POST",
							body: file,
						}).then(response => response.json().then(blob => {
							setLoading(false);
							setGenImage(blob.url);
						}
						))
					})

			})
			.catch((e) => {
				console.log(e);
			});
	}

	const [visibility, setVisibility] = useState(false)
	const { data: session, status } = useSession();
	const router = useRouter();

	// redirect if user is signed in
	useEffect(() => {
		if (status !== "authenticated") {
			router.push("/");
		}
	}, []);



	return (
		<>
			{/* Dynamic form screen */}
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
				<main className="lg:-mt-12  w-full flex flex-col lg:w-2/3 gap-8 row-start-2 items-center sm:items-start  ">
					<DotPattern className={"fill-gray-400 opacity-20  bg-[#f5f5f5] -z-10 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"}>

					</DotPattern>





					{page == 0 &&
						<div className="text-center w-full">

							<FadeText text="Let's make an expression." direction="up" className="sm:text-4xl md:text-5xl  text-3xl" />
							<FadeText text="First, enter your title & pen name." direction="up" className="mt-1 sm:text-xl md:text-2xl text-lg text-neutral-500" />


							<div className="flex flex-col w-full justify-center mt-4 items-center">
								<div className="w-full lg:w-2/3">


									<div className="text-neutral-700 lg:text-lg text-base mr-2 block text-left ml-2">Title:</div>
									<div className="w-full flex space-x-2 items-center justify-center">

										<br /><Input defaultValue={title} onChange={(e) => setTitle(e.target.value)} maxLength="100" className="mt-1.5" placeholder="Timeless Passings" />
									</div></div>

								<div className="mt-2 w-full lg:w-2/3">

									<div className="text-neutral-700 lg:text-lg text-base mr-2 block text-left ml-2">Pen Name:</div>
									<div className="flex space-x-2 items-center justify-center">

										<br /><Input defaultValue={name} onChange={(e) => setName(e.target.value)} maxLength="100" className="mt-1.5 w-full " placeholder="John Doe" />
									</div>
								</div>


								<div>

									<div>

										<ToggleGroup className="mt-8 space-x-2  lg:text-lg text-base " defaultValue={visibility ? "Public" : "Private"} type="single" onValueChange={(value) => { if (value) { setVisibility(value == "Private" ? false : true) } }}>
											<ToggleGroupItem title="Private" value="Private" className=" text-neutral-700 lg:text-lg text-base ">
												<LuLock className="mr-2" /> Private
											</ToggleGroupItem>
											<ToggleGroupItem className="text-neutral-700 lg:text-lg text-base" value="Public" title="Public">
												<LuUnlock className="mr-2" /> Public</ToggleGroupItem>
										</ToggleGroup>
									</div>


									<div className="mt-3 text-neutral-500 text-wrap">
										{
											visibility ?
												"All members can view/comment on your expressions." :
												"Only you can view and look back on your expressions."
										}
									</div>
								</div>

							</div>
						</div>}
					{page == 2 && (
						<div className="text-center w-full flex items-center justify-center ">
							<div className="w-full lg:w-2/3">

								<FadeText text="Final touches." direction="up" className="sm:text-4xl md:text-5xl  text-3xl" />

								<div className="grid w-full gap-1.5 mb-6 mt-4">
									<Label htmlFor="desc" className="text-neutral-700 lg:text-lg text-base block text-left">Description:</Label>
									<Textarea onChange={(e) => setDescription(e.target.value)} className="border border-neutral-200 rounded-sm p-2 w-full" placeholder="This piece shows my..." id="desc" />
								</div>
								<div className="text-neutral-700 lg:text-lg text-base block text-left mb-0.5">Tags:</div>
								<TagInput tags={
									tags
								}
									setTags={
										(newTags) => {
											setTags(newTags);
										}
									}
									placeholder="Add a tag"
									styleClasses={{
										input: 'p-2 w-full',
										inlineTagsContainer: 'p-2 py-3 rounded',
										tagPopover: {
											popoverContent: 'bg-white shadow-lg',
											popoverTrigger: 'text-blue-500 hover:text-blue-600',
										},
										tagList: {
											container: 'bg-red-100',
											sortableList: 'p-1',
										},
										autoComplete: {
											command: 'bg-blue-100',
											popoverTrigger: 'bg-green-200',
											popoverContent: 'p-4',
											commandList: 'list-none',
											commandGroup: 'font-bold',
											commandItem: 'cursor-pointer hover:bg-gray-100',
										},
										tag: {
											body: 'pl-2 flex items-center gap-2',
											closeButton: 'text-red-500 hover:text-red-600',
										},
										clearAllButton: 'text-red-500 hover:text-red-600',
									}}
									maxTags=
									{
										5
									}

									maxLength={30}

									showCount={
										true
									}

									animation="fadeIn"

									activeTagIndex={
										activeTagIndex
									}
									setActiveTagIndex={
										setActiveTagIndex
									}

								/>

								<Button
									className="bg-white text-sm lg:text-md hover:text-white text-[#1a1a1a] border border-neutral-300"
									onClick={async (e) => {
										const res = await fetch("/api/create", {
											cache: 'no-cache',
											method: "POST",
											body: JSON.stringify({
												title: title,
												name: name,
												tags: tags,
												description: description,
												imageURL: genImage,
												visibility: visibility,
											}),
											headers: {
												"Content-Type": "application/json",
											},
										})

										const data = await res.json();


										router.push("/profile");

									}}
								>
									Share!
								</Button>

							</div>
						</div>
					)}


					{<div className={page != 1 ? "w-0 overflow-hidden" : "w-full"}>

						<div className={"flex text-center justify-center items-center w-full"} >
							<div className="w-full">

								{page == 1 && <FadeText text="Craft your piece." direction="up" className="sm:text-4xl md:text-5xl  text-3xl" />}


								<div className="w-full flex items-center justify-center">
									<div className="flex w-full lg:w-5/6 items-center justify-center text-center mt-8 ">
										<Tabs onValueChange={(value) => setImageTab(value)} defaultValue="Sketch" className="w-full">
											<TabsList>
												<TabsTrigger value="Sketch">Sketch</TabsTrigger>
												<TabsTrigger value="Result">Result</TabsTrigger>
											</TabsList>
											<div className={imageTab == "Sketch" ? "" : "overflow-hidden h-0"}>

												<TabsContent className={"space-y-3 "} forceMount={true}>
													<div className={"flex items-center justify-center w-full "}>
														<div className="lg:w-2/3 w-full ">

															<ReactSketchCanvas
																exportImageType="jpg"
																ref={canvasRef}
																className="aspect-square w-full "
																canvasColor="black"
																strokeColor="white"
															/>
														</div>
													</div>
													<div >
														<ToggleGroup className="inline-block border-r-2 space-x-2 border-neutral-500 pr-2 " defaultValue="Pen" type="single" onValueChange={(value) => { if (value) { value == "Pen" ? handlePenClick() : handleEraserClick() } }}>
															<ToggleGroupItem title="Pen" value="Pen">
																<LuPencil />
															</ToggleGroupItem>
															<ToggleGroupItem value="Eraser" title="Eraser"><LuEraser /></ToggleGroupItem>
														</ToggleGroup>
														<div className="inline-block ml-2 space-x-2 ">

															<Button title="Undo" variant="outline" onClick={handleUndoClick} size="icon">
																<LuUndo />
															</Button>
															<Button title="Redo" variant="outline" onClick={handleRedoClick} size="icon">
																<LuRedo />
															</Button>
															<Button title="Clear Canvas" variant="outline" onClick={handleClearClick} size="icon">
																<LuMinus />
															</Button>
														</div>
													</div>
												</TabsContent>
											</div>
											<TabsContent forceMount={true} hidden={imageTab != "Result"} value="Result">

												<div className={"lg:text-lg mt-4 flex items-center justify-center w-full mb-4 text-neutral-600"}>
													{genImage == "" ?
														<div className="lg:w-2/3 w-full aspect-square bg-gray-300 text-center flex items-center justify-center">
															No image generated yet.

														</div>
														: <img src={genImage} />}

												</div>

												<div className="space-y-5 pt-4">
													<div className=" w-full">

														<div>

															<span className="lg:text-lg">Describe your sketch and what it represents.</span>

															<div className="flex items-center justify-center">

																<Input onChange={(e) => setImageDesc(e.target.value)} maxLength="5000" className="mt-1.5 max-w-md " placeholder="A lonely tree swaying in a snowstorm." />
															</div>

														</div>
													</div>



													<Button
														className="bg-white text-sm lg:text-md hover:text-white text-[#1a1a1a] border border-neutral-300"
														onClick={() => generateImage()}
													>
														{loading ? "Loading..." : "Generate Image"}
													</Button>




												</div>


											</TabsContent>
										</Tabs></div>
								</div>
							</div>
						</div>
					</div>

					}


					<div className="fixed bottom-0 left-0 w-full bg-white pb-6 flex pt-4 border-t border-neutral-500 items-center justify-center space-x-4">

						<Button
							disabled={page == 0}
							onClick={() => setPage(page - 1)}
							className="bg-white text-sm lg:text-md hover:text-white text-[#1a1a1a] border border-neutral-300"
						>&larr;Back </Button>
						<Button
							disabled={page == 2}
							onClick={() => setPage(page + 1)}
							className="bg-white text-sm lg:text-md hover:text-white text-[#1a1a1a] border border-neutral-300"
						>Next &rarr;</Button>
					</div>









				</main >
			</div >
		</>
	);
}
