import prisma from "@/lib/prisma";

export default async function GetUsers() {
	const users = await prisma.user.findMany();
	if (!users) return [];
	return users;
}
