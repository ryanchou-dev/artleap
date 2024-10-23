import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "@/app/components/SessionProvider";
import { authOptions } from "@/app/db/authOptions";
// Hook to pull currently logged in user
import { getServerSession } from "next-auth";
import { MainNav } from "./components/Navbar";
import { DM_Sans } from "next/font/google";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});
const dm_sans = DM_Sans({ subsets: ["latin"] });



// Export the title of the webpage & description to be shown in the web browser.
export const metadata = {
	title: "ArtLeap",
	description: "Fostering community and creative expression for people with disabilities.",
};

export default async function RootLayout({ children }) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en">
			<SessionProvider session={session}>

				<body className={`${dm_sans.className} antialiased`}>
					<MainNav />
					{children}
				</body>
			</SessionProvider>
		</html>
	);
}


