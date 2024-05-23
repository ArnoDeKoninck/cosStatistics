import prisma from "@/lib/prisma";
import CreateLog from "../components/createLog/CreateLog";
import GetUsers from "../helpers/GetUsers";
import GetSessions from "../helpers/GetSessions";

const LogsOverview = async () => {
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

export default LogsOverview;
