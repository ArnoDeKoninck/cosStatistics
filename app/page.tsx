import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import TotalDamageGraph from "./components/TotalDamageGraph/TotalDamageGraph";

export async function GetUsers() {
	const prisma = new PrismaClient();
	const users = await prisma.user.findMany();
	return users;
}

export default async function Home() {
	const foundUsers = await GetUsers();

	if (!foundUsers) {
		return <div>No Users found</div>;
	}

	return (
		<main className="bg-main">
			<Link href="/logs-overview">Go to Logs Overview</Link>
			<h1>Users</h1>
			<ul>
				{foundUsers.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
			<TotalDamageGraph />
		</main>
	);
}
