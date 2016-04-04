define(function(){

	var gridTree = {
		view:"treetable",
		headerRowHeight:_HeaderRowHeight,
		leftSplit:3,
		rowHeight:_RowHeight,
		id:"dt_storetodayadjrec",
		dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
		},
		columns:[
			{ id:"skucode",	header:"SKU", sort:"string",fillspace:2},
			
			{ id:"recorddate",	header:"调整日期", sort:"string",fillspace:1.5},
			{ id:"oldtargetqty",	header:"原目标库存", sort:"string",fillspace:1},
			{ id:"sugtargetqty",	header:"建议目标库存", sort:"string",fillspace:1},
			
			{ id:"adjustreason",	header:"调整原因", sort:"string",fillspace:3},
			{ id:"operator",	header:"操作人", sort:"string",fillspace:1}
		],
		select: true
	};

	var layout = {
		type: "clean",
		id: "storeTodayAdjRecView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
