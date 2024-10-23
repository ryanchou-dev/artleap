import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/app/db/db';
import { authOptions } from '@/app/db/authOptions';
import { SYSTEM_ENTRYPOINTS } from 'next/dist/shared/lib/constants';


export async function POST(req) {
	// Reject all invalid requests
	if (req.method === "POST") {
		const { postID } = await req.json();
		const session = await getServerSession(authOptions);

		// Invalid (Semantic Input Validation)
		if (!postID) {
			return new Response(null, {
				status: 400,
				statusText: "bad-request",
			});
		}

		if (session) {
			const user = await db.user.findFirst({
				where: {
					email: session.user.email,
				},
			});
			const post = await prisma.post.findUnique({
				where: {
					id: postID,
				},
			})


			// Check for user existence
			if (user && post) {
				console.log(post.likedBy);
				if (post.likedBy && post.likedBy.includes(user.id)) {
					const nxt = post.likedBy.filter(function (e) { return e !== user.id; })
					const updatedUser = await prisma.post.update({
						where: {
							id: postID,
						},
						data: {
							likedBy: nxt,
						},
					})
					console.log(updatedUser.likedBy)
					if (updatedUser) {

						return new Response(JSON.stringify(updatedUser), {
							headers: {
								"Content-Type": "application/json",
							},
						});
					} else {

						return new Response(null, {
							status: 500,
							statusText: "internal-server-error",
						});
					}
				} else {
					if (!post.likedBy) post.likedBy = []
					post.likedBy.push(user.id);
					const updatedUser = await prisma.post.update({
						where: {
							id: postID,
						},
						data: {
							likedBy: post.likedBy,
						},
					})
					console.log(updatedUser.likedBy)
					if (updatedUser) {

						return new Response(JSON.stringify(updatedUser), {
							headers: {
								"Content-Type": "application/json",
							},
						});
					} else {

						return new Response(null, {
							status: 500,
							statusText: "internal-server-error",
						});
					}
				}


			}
		}
	}
}