import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/app/db/db";

export const authOptions = {
	adapter: PrismaAdapter(db),
	providers: [
		Email({
			server: {
				host: process.env.NEXT_PUBLIC_SMTP_HOST,
				port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
				auth: {
					user: process.env.NEXT_PUBLIC_SMTP_USER,
					pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
				},
			},
			from: process.env.NEXT_PUBLIC_EMAIL_FROM,
		}),
	],
	pages: {
		verifyRequest: '/verify'
	},
	callbacks: {
		session: async ({ session, user }) => {
			session.user.id = user.id;
			return session;
		},
	},
};
