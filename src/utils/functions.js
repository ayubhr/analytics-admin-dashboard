import React from "react";
import moment from "moment";
import _ from "lodash";
import { FiShoppingBag, FiBarChart } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import avatar from "../data/avatar.jpg";
import avatar2 from "../data/avatar2.jpg";
import avatar3 from "../data/avatar3.png";
import avatar4 from "../data/avatar4.jpg";

export function decorateDate(m) {
	if (m === 0) return 0;

	let dateObj = moment.duration(m, "minutes");

	let days = dateObj.get("days");
	let hours = dateObj.get("hours");
	let minutes = dateObj.get("minutes");

	return `${days}d, ${hours}h, ${minutes}m`;
}

export function numberFormatter(num, digits) {
	const lookup = [
		{ value: 1, symbol: "" },
		{ value: 1e3, symbol: "k" },
		{ value: 1e6, symbol: "M" },
		{ value: 1e9, symbol: "G" },
		{ value: 1e12, symbol: "T" },
		{ value: 1e15, symbol: "P" },
		{ value: 1e18, symbol: "E" },
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	var item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return num >= item.value;
		});
	return item
		? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
		: "0";
}

export function getTopObjects(arr, key, n) {
	return arr
		.sort(function (a, b) {
			return parseFloat(b[key]) - parseFloat(a[key]);
		})
		.slice(0, n);
}

export function getPercentOf(numA, numB) {
	let perc = (numA / numB) * 100;
	return perc.toFixed(2);
}

export function getRandomFloat(min, max, decimals) {
	const str = (Math.random() * (max - min) + min).toFixed(decimals);

	return parseFloat(str);
}

const gridEmployeeProfile = (props) => {
	let avatars = [avatar, avatar2, avatar3, avatar4];

	let randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

	return (
		<div className="flex items-center gap-2">
			<img
				className="rounded-full w-10 h-10"
				src={randomAvatar}
				alt="employee"
			/>
			<p>{props.fullname}</p>
		</div>
	);
};

export const EmployeeProfileAvatar = () => {
	let avatars = [avatar, avatar2, avatar3, avatar4];

	let randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

	return (
		<img
			className="rounded-full w-10 h-10"
			src={randomAvatar}
			alt="employee"
		/>
	);
};

const customerGridStatus = (props) => {
	let status_bg = { Excellent: "#8BE78B", Moyenne: "#FEC90F", Faible: "red" };

	return (
		<div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
			<p
				style={{ background: status_bg[props.status] }}
				className="rounded-full h-3 w-3"
			/>
			<p>{props.status}</p>
		</div>
	);
};

export const employeesGridNew = [
	{
		field: "id",
		headerText: "#Mat",
		width: "70",
		allowFiltering: false,
		textAlign: "Center",
	},
	{
		headerText: "Employé",
		width: "160",
		allowFiltering: false,
		template: gridEmployeeProfile,
		textAlign: "Center",
	},
	{ field: "Name", headerText: "", width: "0", textAlign: "Center" },
	/*{
    headerText: "Période",
    width: "90",
    textAlign: "Center",
    field: "contrat_duration",
  },*/

	{
		field: "presence_minutes",
		headerText: "Tps Présence",
		width: "120",
		allowFiltering: false,
		//format: "yMd",
		textAlign: "Center",
	},
	/*{
    field: "extra_hours",
    headerText: "Heures Supp",
    width: "120",
    //format: "yMd",
    textAlign: "Center",
  },*/
	{
		field: "working_time",
		headerText: "Tps de Travail",
		allowFiltering: false,
		width: "120",
		textAlign: "Center",
	},
	{
		field: "stoped_time",
		headerText: "Tps Arrêt",
		allowFiltering: false,
		width: "120",
		textAlign: "Center",
	},
	{
		field: "done_pieces",
		headerText: "Nbr Pièces",
		allowFiltering: false,
		width: "100",
		textAlign: "Center",
	},
	{
		field: "rendement",
		headerText: "Rendement %",
		allowFiltering: false,
		width: "120",
		textAlign: "Center",
	},
	{
		field: "status",
		headerText: "Status",
		filter: { type: "CheckBox" },
		width: "120",
		format: "yMd",
		textAlign: "Center",
		template: customerGridStatus,
	},
];

export const links = [
	{
		title: "Dashboard",
		links: [
			{
				name: "home",
				icon: <FiShoppingBag />,
			},
		],
	},

	{
		title: "Pages",
		links: [
			{
				name: "employees",
				icon: <IoMdContacts />,
			},
		],
	},
];

export function getAnalyticsData(data) {
	let totalEmployees = data.length.toLocaleString("en-US");

	let totalPieces = data.reduce(
		(sum, { done_pieces }) => sum + done_pieces,
		0
	);

	let averageRendement = _.meanBy(data, (emp) => parseFloat(emp.rendement));

	const analyticsData = [
		{
			icon: <MdOutlineSupervisorAccount />,
			amount: totalEmployees,
			percentage: "",
			title: "Employées",
			iconColor: "#03C9D7",
			iconBg: "#E5FAFB",
			pcColor: "green-600",
		},
		{
			icon: <BsBoxSeam />,
			amount: numberFormatter(totalPieces),
			percentage: "+23%",
			title: "Totale Pièces",
			iconColor: "rgb(255, 244, 229)",
			iconBg: "rgb(254 113 15)",
			pcColor: "green-600",
		},
		{
			icon: <FiBarChart />,
			amount: `${averageRendement.toFixed(2)} %`,
			percentage: "-2%",
			title: "Taux Du Rendement",
			iconColor: "rgb(228, 106, 118)",
			iconBg: "rgb(255, 244, 229)",
			pcColor: averageRendement >= 50 ? "green-600" : "red-600",
		},
	];

	return analyticsData;
}
