import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/app/db/db';
import { authOptions } from '@/app/db/authOptions';
import { SYSTEM_ENTRYPOINTS } from 'next/dist/shared/lib/constants';


export async function POST(req) {
	// Reject all invalid requests
	if (req.method === "POST") {
		const { title, name, description, tags, imageURL, visibility } = await req.json();
		const session = await getServerSession(authOptions);

		// Invalid (Semantic Input Validation)
		if (!title || !name || !description || !imageURL || visibility == null) {
			return new Response(null, {
				status: 400,
				statusText: "bad-request",
			});
		}

		console.log("WHAT0")
		if (session) {
			const user = await db.user.findFirst({
				where: {
					email: session.user.email,
				},
			});


			console.log("WHAT1")
			// Check for user existence
			if (user) {
				const formTags = tags.map(function (tag) { return tag.text; })
				console.log(title, name, description, formTags, imageURL, visibility);
				const result = await db.post.create({
					data: {
						name,
						tags: formTags,
						title,
						description,
						imageUrl: imageURL,
						visibility,
						authorId: user.id,
						likedBy: [],
					},
				});


				console.log("WHAT")

				if (!result) {
					return new Response(null, {
						status: 500,
						statusText: "internal-server-error",
					});
				}

				return new Response(JSON.stringify(result), {
					headers: {
						"Content-Type": "application/json",
					},
				});
			}
		}
	}
}