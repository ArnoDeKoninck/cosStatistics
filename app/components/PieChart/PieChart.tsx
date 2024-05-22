"use client";
//@ts-ignore
import { useEffect } from "react";
import * as d3 from "d3";

// set the dimensions and margins of the graph
const width = 450,
	height = 450,
	margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin;

const Arc = ({ data, index, createArc, colors, format }) => (
	<g key={index} className="arc">
		<path className="arc" d={createArc(data)} fill={colors(index)} />
		<text transform={`translate(${createArc.centroid(data)})`} textAnchor="middle" fill="black" fontSize="10">
			{data.data.label}
		</text>
	</g>
);

export default function PieChart({ data, width, height, innerRadius, outerRadius }) {
	const createPie = d3
		.pie()
		.value((d) => d.value)
		.sort(null);

	const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

	const colors = d3.scaleOrdinal(d3.schemeSet3);
	const format = d3.format(".2f");
	const pieData = createPie(data);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${outerRadius} ${outerRadius})`}>
				{pieData.map((d, i) => (
					<Arc key={i} index={i} data={d} createArc={createArc} colors={colors} format={format} />
				))}
			</g>
		</svg>
	);
}
