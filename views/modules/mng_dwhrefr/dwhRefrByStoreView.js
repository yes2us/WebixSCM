define([
	"data/stockobject"
],
	function(stockobject){
	    
     
	var grid_storeexistsskc = {
		view:"datatable",
		id:"dt_dwhrefrstoreskc",
		leftSplit:3,
		rowHeight:_RowHeight+5,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{
			  width:250,
			  autoheight:false,
			 scroll:true
		},
		columns:[
//			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"partycode",header:"#",width:35,hidden:true},
			
			{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",fillspace:1,hidden:true},
			{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",fillspace:1},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"subtypename",header:["小类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			
			{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",fillspace:1.5},
//			{ id:"colorname",header:"颜色", sort:"string",fillspace:1},
			{ id:"saletype",	header:["销售分类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"onshelfdays",header:"上货天数", sort:"string",fillspace:1},
			{ id:"stockqty",	header:"实际库存",sort:"int", fillspace:1},
			{ id:"sale30qty",header:"30天销量",sort:"int", fillspace:1},
			{ id:"saletotalqty",header:"累计销量",sort:"int", fillspace:1},
			{ id:"outcheckbox",header:"退出",sort:"int",width:60,template:"{common.checkbox()}",value:0}
		],
		select: true,
	};


  					
   var grid_storenewskc = {
		view:"datatable",
		rowHeight:_RowHeight+5,
		id:"dt_dwhStoreNewSKC",
		headerRowHeight:_HeaderRowHeight,
		editable:true,
		headermenu:{
			width:250,
			autoheight:false,
			scroll:true
		},
		rules:{"targetqty":webix.rules.isNumber,"operatemov":webix.rules.isNumber},
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			
			{ id:"partycode",	header:"上级编号", sort:"string",hidden:true,fillspace:2},
			{ id:"partyname",header:"上级名称", sort:"string",hidden:true,fillspace:2},
			
			{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",fillspace:1,hidden:true},
			{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",fillspace:1},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"subtypename",header:["小类",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			
			{ id:"skccode",header:["SKC",{content:"textFilter"}], sort:"string",fillspace:1.5},
			{ id:"saletype",header:["销售分类",{content:"selectFilter"}], sort:"string",fillspace:1},
			{ id:"onshelfdays",header:"上货天数", sort:"string",fillspace:1},
			{ id:"stockqty",header:"实际库存",sort:"int", fillspace:1},
			{ id:"sale30qty",header:"30天销量",sort:"int", fillspace:1},
			{ id:"saletotalqty",header:"累计销量",sort:"int", fillspace:1},
			{ id:"incheckbox",header:"补入",sort:"int", width:60,template:"{common.checkbox()}",value:0}
		],
	};
	
		var grid_refrplan_outskc = {
		view:"datatable",
		id:"dt_refrplan_outskc",
		headerRowHeight:_HeaderRowHeight,
		rowHeight:_RowHeight+5,
		maxWidth:200,
		headermenu:{
			width:200,
			autoheight:false,
			scroll:true
		},
		editable:true,
		save:urlstr+"/WBCURDMng/saveMovSKCPlan",
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"delete",header:"&nbsp;", width:35,template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
			{ id:"srcpartycode",	header:"调出门店编号",hidden:true,fillspace:2},
			{ id:"srcpartyname",header:"调出门店",hidden:true, fillspace:1},
			{ id:"trgpartycode",	header:"调入门店编号",hidden:true,hidden:true,fillspace:2},
			{ id:"trgpartyname",header:"调入门店",hidden:true, fillspace:1},
			{ id:"skccode",header:"退出款色", sort:"string",fillspace:2},
			{ id:"movqty",header:"退出数量",sort:"int",fillspace:1}
		],
		on:{
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_refrplan_outskc").remove(id);
								}
							}
						});
					}
				},
		}
	};
	
	var grid_refrplan_inskc = {
		view:"datatable",
		id:"dt_refrplan_inskc",
		headerRowHeight:_HeaderRowHeight,
		rowHeight:_RowHeight+5,
		maxWidth:200,
		headermenu:{
			width:200,
			autoheight:false,
			scroll:true
		},
		editable:true,
		save:urlstr+"/WBCURDMng/saveMovSKCPlan",
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"delete",header:"&nbsp;", width:35,template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
			{ id:"srcpartycode",	header:"调出门店编号",hidden:true,fillspace:2},
			{ id:"srcpartyname",header:"调出门店",hidden:true, fillspace:1},
			{ id:"trgpartycode",	header:"调入门店编号",hidden:true,hidden:true,fillspace:2},
			{ id:"trgpartyname",header:"调入门店",hidden:true, fillspace:1},
			{ id:"skccode",header:"补入款色", sort:"string",fillspace:2},
			{ id:"movqty",header:"补入数量",sort:"int",fillspace:1}
		],
		on:{
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_refrplan_inskc").remove(id);
								}
							}
						});
					}
				},
		}
	};
	
	var grid_storeoutskc={ 
				view:"form", width:200, scroll:false,type: "clean",
					elements:[
						{
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:5,
							paddingY:5,
							height:35,
							cols:[
								{
									"template": "<span class='webix_icon fa-adjust'></span>门店退出死款", "css": "sub_title2", borderless: true
								},
							]
						},
					grid_refrplan_outskc
					]
			};
			
	var grid_storeinskc={ 
					view:"form",width:200, scroll:false,type: "clean",
					elements:[
						{
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:5,
							paddingY:5,
							height:35,
							cols:[
								{
									"template": "<span class='webix_icon fa-adjust'></span>门店补入新款", "css": "sub_title2", borderless: true
								},
							]
						},
					grid_refrplan_inskc
					]
			};
				
	var layout = {
		type: "clean",
		id: "dwhRefrByStoreView",
		rows:[
			{cols:[grid_storeexistsskc,{view:"resizer"},grid_storeoutskc]},
			{view:"resizer"},
			{cols:[grid_storenewskc,{view:"resizer"},grid_storeinskc]}
		]
	};

   
	return { $ui: layout };

});
