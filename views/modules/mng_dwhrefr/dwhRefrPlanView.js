define(function(){
	var parentcode;
	
	var gridTree = {
		view:"datatable",
		id:"dt_dwhRefrPlan",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:5,
		select: true,
		navigation:true,
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"makedate",header:["日期",{content:"selectFilter"}],width:100},
			{ id:"srcpartycode",	header:"出货方编号", sort:"string",hidden:true,fillspace:1},
			{ id:"srcpartyname",header:["出货方",{content:"selectFilter"}], sort:"string",width:120,css:"center",
			template:function(obj){return obj.srcpartycode.trim()==parentcode? "————>":obj.srcpartyname;}},
			{ id:"trgpartycode",	header:"进货方编号", sort:"string",hidden:true,fillspace:1},
			{ id:"trgpartyname",header:["进货方",{content:"selectFilter"}], sort:"string",width:120,css:"center",
			template:function(obj){return obj.trgpartycode.trim()==parentcode? "<————":obj.trgpartyname;}},
			
			{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",width:120},

			{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",fillspace:0.5,hidden:true},
			{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:60},
			{ id:"subtypename",header:["小类",{content:"selectFilter"}], sort:"string",width:120},
			{ id:"dealstate",header:["状态",{content:"selectFilter"}], sort:"string",width:80},
			{ id:"movqty",header:["数量",{content:"numberFilter"}],sort:"int",width:90}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}}
	};

	var layout = {
		type: "clean",
		id: "dwhRefrPlanView",
		cols:[
			gridTree,
		]
	};


	return { 
		$ui: layout,
		setParentCode: function(_parentcode){parentcode = _parentcode;}
		};

});
