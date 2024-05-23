export default async function GetSessions() {
	const sessions = await prisma.logs.findMany({
		distinct: ["session"],
		select: {
			session: true,
		},
	});
	if (!sessions) return [];
}
