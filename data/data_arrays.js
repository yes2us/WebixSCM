define([],function(){
	
var rating =[
	{"id":1,"code":"NWTB-1","name":"Webix Chai", rating:5, rank:1},
	{"id":2,"code":"NWTCO-3","name":"Webix Syrup", rating:1, rank:2},
	{"id":3,"code":"NWTCO-4","name":"Webix Cajun Seasoning", rating:2, rank:3},
	{"id":4,"code":"NWTO-5","name":"Webix Olive Oil", rating:3, rank:4},
	{"id":5,"code":"NWTJP-6","name":"Webix Boysenberry Spread", rating:1, rank:5}
];
var treetable =[
	{
		id:1, name:"2015-A", open:1, data:[
			{"id":11,"code":"款式A","name":"SKU001", sales: 200000},
			{"id":12,"code":"款式A","name":"SKU002", sales: 180000},
			{"id":13,"code":"款式C","name":"SKU003", sales: 150000}
		]
	},
	{
		id:2, name:"2015-B", data:[
			{"id":21,"code":"款式B","name":"SKU011", sales: 230000},
			{"id":22,"code":"款式B","name":"SKU012", sales: 210000},
			{"id":23,"code":"款式C","name":"SKU013", sales: 180000}
		]
	},
	{
		id:3, name:"2015-C", open:1, data:[
			{"id":31,"code":"款式E","name":"SKU051", sales: 310000},
			{"id":32,"code":"款式F","name":"SKU052", sales: 250000},
			{"id":33,"code":"款式G","name":"SKU053", sales: 210000}
		]
	}
];
var colspans ={
	data:[
		{"id":11,"code":"NWTB-1","name":"Webix Chai", sales: 200000, region:"USA"},
		{"id":12,"code":"NWTCO-3","name":"Webix Syrup", sales: 180000, region:"USA"},
		{"id":13,"code":"NWTCO-4","name":"Webix Cajun Seasoning", sales: 150000, region:"USA"},
		{ id:"sub1", $css:"highlight_row", region:"Top Sales", sales: 200000},
		{"id":21,"code":"NWTB-1","name":"Webix Chai", sales: 230000, region:"Europe"},
		{"id":22,"code":"NWTO-5","name":"Webix Olive Oil", sales: 180000, region:"Europe"},
		{ id:"sub2", $css:"highlight_row", region:"Top Sales", sales: 230000}

	],
	spans:[
		[11, "region", 1, 3],
		[21, "region", 1, 3],
		["sub1", "region", 3, 1, null, "highlight_row"],
		["sub2", "region", 3, 1, "", "highlight_row"]
	]
};
var  progress=[
	{ id: "1", name: "Prepare finance report",progress:0.55, type: "inner"},
	{ id: "2", name: "Solex project strategy  meeting", progress:0.20},
	{ id: "3", name: "WestEurope partners call",progress:0.7},
	{ id: "4", name: "Market research analysis",progress:0.3, type: "inner"},
	{ id: "5", name: "Prepare presentation",progress:0.6, type: "company"}
];
return {
	rating:rating,
	treetable:treetable,
	progress: progress,
	colspans: colspans
};

});