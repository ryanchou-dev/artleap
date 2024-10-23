import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/app/db/db';
import { authOptions } from '@/app/db/authOptions';


export async function GET(req) {
	// Reject all invalid requests
	if (req.method === "GET") {
		const posts = await db.post.findMany();

		return NextResponse.json(posts);

	} else {
		return new Response(null, { status: 401, statusText: "unauthorized" });
	}
}