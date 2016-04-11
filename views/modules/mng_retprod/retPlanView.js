define(function(){

	var grid_RetProdPlan = {
		view:"datatable",
		id:"dt_RetProdPlan",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:2,
		select: true,
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"makedate",header:["日期",{content:"selectFilter"}],width:100},
			{ id:"srcpartycode",	header:"出货仓库编号", sort:"string",hidden:true,width:85},
			{ id:"srcpartyname",header:["出货仓库",{content:"selectFilter"}], sort:"string",width:120},
			{ id:"skucode",header:"SKU", sort:"string",width:140},
			{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",width:120},
			{ id:"sizename",	header:["尺码",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",fillspace:0.5,hidden:true},
			{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"subtypename",header:["小类",{content:"selectFilter"}], sort:"string",width:120},
			{ id:"dealstate",	header:["状态",{content:"selectFilter"}], sort:"string",width:80},
			{ id:"movqty",header:["计划退货",{content:"numberFilter"}],sort:"int",width:90}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}},
	};

	var layout = {
		type: "clean",
		id: "retProdPlanView",
		cols:[
			grid_RetProdPlan,
		]
	};


	return { $ui: layout };

});
