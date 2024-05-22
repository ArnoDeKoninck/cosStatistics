import { GetUsers } from "../page";
import prisma from "@/lib/prisma";
import CreateLog from "../components/createLog/CreateLog";
import TotalDamageGraph from "../components/TotalDamageGraph/TotalDamageGraph";

export async function GetSessions() {
	const sessions = await prisma.logs.findMany({
		distinct: ["session"],
		select: {
			session: true,
		},
	});
	return sessions;
}

const logsOverview = async () => {
	const users = await GetUsers();
	const sessions = await GetSessions();

	if (!users) {
		return <div>No users were found</div>;
	}
	if (!sessions) {
		return <div>No sessions were found</div>;
	}
	return (
		<>
			<h1>Add user logs</h1>
			<CreateLog users={users} />
		</>
	);
};

export default logsOverview;
