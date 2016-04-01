define(function(){

	var gridTree = {
		view:"datatable",
		headerRowHeight:30,
		id:"table_sugretplan",
		leftSplit:3,
		rowHeight:15,
		dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
		},
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"skucode",	header:"SKU", sort:"string",fillspace:2},
			
			{ id:"productcolorcode",	header:"款色", sort:"string",fillspace:1.5},
			{ id:"colorname",	header:"颜色", sort:"string",fillspace:1},
			{ id:"sizename",	header:"尺码", sort:"string",fillspace:1},
			
			{ id:"yearname",	header:"年份", sort:"string",fillspace:1,hidden:true},
			{ id:"seasonname",	header:"季节", sort:"string",fillspace:1},
			{ id:"maintypename",	header:"大类", sort:"string",fillspace:2},
			{ id:"subtypename",	header:"小类", sort:"string",fillspace:2},
			
			{ id:"stockqty",	header:"库存", fillspace:1},
			{ id:"repretqty",	header:"建议退货",align:"right", fillspace:1}
		],
		select: true,
		
	};

	var layout = {
		type: "clean",
		id: "storeSugRetPlanView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
