define(function(){

	var gridTree = {
		view:"datatable",
		headerRowHeight:30,
		leftSplit:3,
		rowHeight:_RowHeight,
		id:"table_cwhts",
		leftSplit:1,
		headerRowHeight:_HeaderRowHeight,
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
			{ id:"maintypename",	header:"大类", sort:"string",fillspace:1.5},
			{ id:"subtypename",	header:"小类", sort:"string",fillspace:1.5},
			
			{ id:"targetqty",	header:"目标库存",sort:"int",align:"right", fillspace:1},
			{ id:"stockqty",	header:"实际库存", sort:"int",fillspace:1},
		],
		select: true
	};

	var layout = {
		type: "clean",
		id: "cwhTSView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
