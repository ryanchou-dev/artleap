import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/app/db/db';
import { authOptions } from '@/app/db/authOptions';


export async function POST(req) {
	// Reject all invalid requests
	if (req.method === "POST") {
		const { targetID } = await req.json();
		const posts = await db.post.findMany({
			where: {
				id: targetID
			},
		});

		if (posts[0].visibility == false) {
			const session = await getServerSession(authOptions);
			const user = await db.user.findFirst({
				where: {
					email: session.user.email,
				},
			});

			if (user.id != posts[0].authorId) {
				return new Response(null, { status: 401, statusText: "unauthorized" });
			}
		}

		return NextResponse.json(posts);

	} else {
		return new Response(null, { status: 401, statusText: "unauthorized" });
	}
}