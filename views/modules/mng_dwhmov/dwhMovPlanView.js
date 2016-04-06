define(function(){

	var gridTree = {
		view:"datatable",
		id:"dt_dwhMovPlan",
		leftSplit:4,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{
			   width:250,
			   autoheight:false,
			   scroll:true
		},
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"makedate",header:["日期",{content:"selectFilter"}],width:100},
			{ id:"srcpartycode",	header:"调出门店编号", sort:"string",hidden:true,fillspace:1},
			{ id:"srcpartyname",header:["调出门店",{content:"selectFilter"}], sort:"string",width:120},
			{ id:"trgpartycode",	header:"调入门店编号", sort:"string",hidden:true,fillspace:1},
			{ id:"trgpartyname",header:["调入门店",{content:"selectFilter"}], sort:"string",width:120},
			
			{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",width:120},

			{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",fillspace:0.5,hidden:true},
			{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"subtypename",header:["小类",{content:"selectFilter"}], sort:"string",width:120},
			{ id:"dealstate",header:["状态",{content:"selectFilter"}], sort:"string",width:80},
			{ id:"movqty",header:["调拨数量",{content:"numberFilter"}],sort:"int",width:90}
		],
		select: true
	};

	var layout = {
		type: "clean",
		id: "dwhMovPlanView",
		cols:[
			gridTree,
		]
	};


	return { $ui: layout };

});
