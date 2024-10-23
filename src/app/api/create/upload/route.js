import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/app/db/db';
import { authOptions } from '@/app/db/authOptions';

export async function POST(request) {
	console.log('hello1')
	const session = await getServerSession(authOptions);
	if (session) {
		const user = await db.user.findFirst({
			where: {
				email: session.user.email,
			},
		});
		if (user) {
			console.log('hello')

			const { searchParams } = new URL(request.url);
			const filename = searchParams.get('filename');

			const blob = await put(filename, request.body, {
				access: 'public',
			});

			return NextResponse.json(blob);
		}
	}
}