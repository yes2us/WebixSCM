define([
	"data/stockobject",
	"data/billobject"
],
	function(stockobject,billobject){
	   var parentcode;
	   var storecode;
     
	var grid_storeexistsskc = {
		view:"datatable",
		id:"dt_dwhrefrstoreskc",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:1,
		select: true,
		columns:[
//			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"skccode",header:["款色",{content:"textFilter"}], sort:"string",width:100,css:'bgcolor2'},
			{ id:"partycode",header:"#",width:35,hidden:true},
			
			{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",fillspace:1,hidden:true},
			{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",width:70},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:100},
			{ id:"subtypename",header:["小类",{content:"selectFilter"}], sort:"string",width:100},
			
//			{ id:"colorname",header:"颜色", sort:"string",fillspace:1},
			{ id:"saletype",	header:["销售分类",{content:"selectFilter"}], sort:"string",width:85},
			{ id:"onshelfdays",header:"上货天数", sort:"string",width:85},
			{ id:"stockqty",	header:"实际库存",sort:"int", width:85},
			{ id:"sale30qty",header:"30天销量",sort:"int", width:85},
			{ id:"saletotalqty",header:"累计销量",sort:"int", width:85},
			{ id:"check",header:"退出",sort:"int",width:60,template:"{common.checkbox()}"}
		],
			on:{
				onCheck:function(id,e,node){
					var row = this.getItem(id);

					var matchRow = $$("dt_refrplan_outskc").find(function(obj){
						return obj.skccode.trim()==row.skccode.trim();});
						if(row.check && !matchRow.length)
						{
								$$("dt_refrplan_outskc").add({
									srcpartycode:storecode,
									trgpartycode:parentcode,
									skccode:row.skccode,
									movqty:row.stockqty
								});
						}
						
						if(!row.check && matchRow.length)
						{
							$$("dt_refrplan_outskc").remove(matchRow[0].id);
						}
				},
				onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			}
	};

	var grid_refrplan_outskc = {
		view:"datatable",
		id:"dt_refrplan_outskc",
		maxWidth:200,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		select:true,
		editable:true,
		save:urlstr+"/WBCURDMng/saveMovSKCPlan",
		columns:[
			{ id:"_identify",header:"id",width:35,hidden:true},
//			{ id:"delete",header:"&nbsp;", width:35,template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
			{ id:"srcpartycode",	header:"调出门店编号",hidden:true,fillspace:2},
			{ id:"srcpartyname",header:"调出门店",hidden:true, fillspace:1},
			{ id:"trgpartycode",	header:"调入门店编号",hidden:true,hidden:true,fillspace:2},
			{ id:"trgpartyname",header:"调入门店",hidden:true, fillspace:1},
			{ id:"skccode",header:"退出款色", sort:"string",fillspace:2},
			{ id:"movqty",header:"退出数量",sort:"int",fillspace:1}
		],
//				onClick:{
//					webix_icon:function(e,id,node){
//						var row = $$("dt_refrplan_outskc").getItem(id);
//						var matchRow=$$("dt_dwhrefrstoreskc").find(function(obj)
//						{
//							return  (obj.skccode.trim()==row.skccode.trim());
//						},true);
//						if(matchRow) matchRow.check = false;
//						$$("dt_dwhrefrstoreskc").refresh();
//						webix.$$("dt_refrplan_outskc").remove(id);
//					}
//				},
	};
  					
   var grid_storenewskc = {
		view:"datatable",
		id:"dt_dwhStoreNewSKC",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		editable:true,
		select:true,
		leftSplit:4,
		rules:{"targetqty":webix.rules.isNumber,"operatemov":webix.rules.isNumber},
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			
			{ id:"partycode",	header:"上级编号", sort:"string",hidden:true},
			{ id:"partyname",header:"上级名称", sort:"string",hidden:true},
			{ id:"skccode",header:["SKC",{content:"textFilter"}], sort:"string",width:100,css:"bgcolor2"},
			{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",width:70,hidden:true},
			{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",width:70},
			{ id:"maintypename",header:["大类",{content:"selectFilter"}], sort:"string",width:100},
			{ id:"subtypename",header:["小类",{content:"selectFilter"}], sort:"string",width:100},
			
			{ id:"saletype",header:["销售分类",{content:"selectFilter"}], sort:"string",width:85},
			{ id:"onshelfdays",header:"上货天数", sort:"string",width:85},
			{ id:"stockqty",header:"实际库存",sort:"int", width:85},
			{ id:"sale30qty",header:"30天销量",sort:"int", width:85},
			{ id:"saletotalqty",header:"累计销量",sort:"int", width:85},
			{ id:"check",header:"补入",sort:"int", width:60,template:"{common.checkbox()}",value:0}
		],
			on:{
				onCheck:function(id,e,node){
					var row = this.getItem(id);

						var matchRow = $$("dt_refrplan_inskc").find(function(obj){
							return obj.skccode.trim()==row.skccode.trim();});
						if(row.check && !matchRow.length)
						{
							$$("dt_refrplan_inskc").add({
								srcpartycode:parentcode,
								trgpartycode:storecode,
								skccode:row.skccode,
								movqty:5
							});
						}
						
					if(!row.check && matchRow.length)
					{
						$$("dt_refrplan_inskc").remove(matchRow[0].id);
					}
				},
				onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			}
	};
	
	
	
	var grid_refrplan_inskc = {
		view:"datatable",
		id:"dt_refrplan_inskc",
		maxWidth:200,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		editable:true,
		select:true,
		save:urlstr+"/WBCURDMng/saveMovSKCPlan",
		columns:[
			{ id:"_identify",header:"id",width:35,hidden:true},
//			{ id:"delete",header:"&nbsp;", width:35,template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
			{ id:"srcpartycode",	header:"调出门店编号",hidden:true,fillspace:2},
			{ id:"srcpartyname",header:"调出门店",hidden:true, fillspace:1},
			{ id:"trgpartycode",	header:"调入门店编号",hidden:true,hidden:true,fillspace:2},
			{ id:"trgpartyname",header:"调入门店",hidden:true, fillspace:1},
			{ id:"skccode",header:"补入款色", sort:"string",fillspace:2},
			{ id:"movqty",header:"补入数量",sort:"int",fillspace:1}
		],
//		onClick:{
//					webix_icon:function(e,id,node){
//						var row = $$("dt_refrplan_inskc").getItem(id);
//						var matchRow=$$("dt_dwhStoreNewSKC").find(function(obj)
//						{
//							return  (obj.skccode.trim()==row.skccode.trim());
//						},true);
//						if(matchRow) matchRow.check = false;
//						$$("dt_dwhStoreNewSKC").refresh();
//						webix.$$("dt_refrplan_inskc").remove(id);
//						}
//		},
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

   
	return { 
		$ui: layout ,
		setParties:function(_parentcode,_storecode){parentcode=_parentcode;storecode=_storecode;},
		$oninit:function(){
		   webix.dp.$$("dt_refrplan_outskc").attachEvent('onBeforeDataSend', function(obj){
	    			obj.data.makedate = (new Date()).toString('yyyy/MM/dd');
	    			obj.data.plantype = "人工换款";
	    			obj.data.operator = _UserCode+'@'+_UserName;
	    			obj.data.dealstate = "未处理";
	    		});
	    		 webix.dp.$$("dt_refrplan_outskc").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_refrplan_outskc").getItem(id)._identify = response;
				$$("dt_refrplan_outskc").refresh();   
			});
			
			  webix.dp.$$("dt_refrplan_inskc").attachEvent('onBeforeDataSend', function(obj){
	    			obj.data.makedate = (new Date()).toString('yyyy/MM/dd');
	    			obj.data.plantype = "人工换款";
	    			obj.data.operator = _UserCode+'@'+_UserName;
	    			obj.data.dealstate = "未处理";
	    		});
		    	 webix.dp.$$("dt_refrplan_inskc").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_refrplan_inskc").getItem(id)._identify = response;
				$$("dt_refrplan_inskc").refresh();   
			});    		
		}
	};

});
