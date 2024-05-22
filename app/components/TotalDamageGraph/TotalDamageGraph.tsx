import * as d3 from "d3";
import prisma from "@/lib/prisma";
import PieChart from "../PieChart/PieChart";
import LineChart from "../LineChart/LineChart";

const margin = 40;

export default async function TotalDamageGraph() {
	const data = await prisma.$queryRaw`SELECT DISTINCT name, SUM(damage) FROM "Logs" GROUP BY name`;

	if (!data) {
		return <div>No data found</div>;
	}
	const cleanData = JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v));
	const cleanObj = JSON.parse(cleanData);
	const cleanArray = cleanObj.map((d: { name: string; sum: string }) => ({ label: d.name, value: d.sum }));
	console.log(cleanArray);
	return (
		<>
			<div id="piechart">
				<PieChart data={cleanArray} width={200} height={200} innerRadius={60} outerRadius={100} />
			</div>
			<div id="linechart">
				<LineChart data={cleanArray} />
			</div>
		</>
	);
}
