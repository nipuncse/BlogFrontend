import React from "react";
import Chart from "chart.js/auto";
import { Bar, Doughnut, Pie, PolarArea } from "react-chartjs-2";

const Mystats = () => {
	const labels = ["January", "February", "March", "April", "May", "June"];
	const data = {
		labels: labels,
		datasets: [
			{
				label: "My First dataset",
				backgroundColor: "	rgb(0, 255, 191)",
				borderColor: "rgb(255, 99, 132)",
				data: [0, 10, 5, 2, 20, 30, 45],
			},
		],
	};
	return (
		<div className="bg-dark container">
			<Doughnut data={data} />
		</div>
	);
};

export default Mystats;	