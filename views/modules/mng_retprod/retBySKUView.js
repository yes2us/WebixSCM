define([
	"data/stockobject",
	"data/billobject",
],
	function(stockobject,billobject){
	var retTargetWHCode;
		
	var grid_RetProdBySKU_DWHSKU = {
		view:"datatable",
		id:"dt_RetProdBySKU_DWHSKU",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		select: true,
		navigation:true,
		resizeColumn:true,
		leftSplit:3,
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"partycode",header:"#",width:35,hidden:true},
			{ id:"skucode",header:"SKU", sort:"string",width:140,css:"bgcolor2"},
			
			{ id:"skccode",header:"款色", sort:"string",width:100},
			{ id:"colorname",header:"颜色", sort:"string",width:80},
			{ id:"sizename",	header:"尺码", sort:"string",width:70},
			
			{ id:"yearname",	header:"年份", sort:"string",hidden:true},
			{ id:"seasonname",	header:"季节", sort:"string",width:60},
			{ id:"maintypename",header:"大类", sort:"string",width:100},
			{ id:"subtypename",header:"小类", sort:"string",width:150},
			
			{ id:"targetqty",header:"目标库存",sort:"int", width:85},
			{ id:"stockqty",header:"实际库存",sort:"int", width:85},
			{ id:"orderqty",header:"库存缺口",sort:"int",align:"right", width:85}
		],
		on:{
			onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow)
						{
						 retTargetWHCode = selRow.partycode;
						var postData={RetTargetWHCode:selRow.partycode,SKUCode:selRow.skucode};
						var presRetTargetSubWHTSData = stockobject.getRetTargetWHSubWHTSInfo(postData);
						$$("dt_RetProdBySKU_SubWHTSInfo").clearAll();
						$$("dt_RetProdBySKU_SubWHTSInfo").showOverlay("正在加载......");
						$$("dt_RetProdBySKU_SubWHTSInfo").showOverlay("正在加载......");
						$$("dt_RetProdBySKU_SubWHTSInfo").parse(presRetTargetSubWHTSData);
						
			    			var premzSKUPlan = billobject.getMovSKUPlanItem({
									PlanType:"人工退货",
									DealState:"未处理",
									TrgPartyCode:retTargetWHCode,
									SKUCode:selRow.skucode
								});
						$$("dt_RetProdBySKUPlan").clearAll();
				    		$$("dt_RetProdBySKUPlan").parse(premzSKUPlan);
						}
			}
		}
	};


   var grid_RetProdBySKU_SubWHTSInfo = {
		view:"datatable",
		id:"dt_RetProdBySKU_SubWHTSInfo",
		rowHeight:_RowHeight+5,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		editable:true,
		leftSplit:2,
		rules:{"targetqty":webix.rules.isNumber,"operateret":webix.rules.isNumber},
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"skucode",	header:"SKU", sort:"string",hidden:true,fillspace:2},
//			{ id:"skccode",	header:"款色", sort:"string",fillspace:1},
//			{ id:"sizename",	header:"尺码", sort:"string",fillspace:0.5},
			{ id:"partycode",	header:"下属门店编号", sort:"string",hidden:true,fillspace:2},
			{ id:"partyname",	header:"下属门店", sort:"string",width:150},
			{ id:"targetqty",	header:"目标库存",sort:"int", fillspace:1,editor:"text",invalidMessage:"必须输入数字",css:'bgcolor1'},
			{ id:"stockqty",	header:"实际库存",sort:"int", fillspace:1},
			{ id:"sugretqty",	header:"超额库存",sort:"int",align:"right", fillspace:1,template:function(obj){return (obj.stockqty>obj.targetqty)? obj.stockqty-obj.targetqty:"";}},
			{ id:"operateret",	header:"退货",sort:"int",align:"right", fillspace:1,editor:"text",invalidMessage:"必须输入数字",css:'bgcolor1'}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}},
	};
	
	var grid_RetProdBySKUPlan = {
		view:"datatable",
		id:"dt_RetProdBySKUPlan",
		maxWidth:300,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		editable:true,
		leftSplit:2,
		save:urlstr+"/WBCURDMng/saveMovSKUPlan",
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"delete",header:"&nbsp;", width:35,template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
			{ id:"srcpartycode",	header:"出货仓库编号", sort:"string",hidden:true,fillspace:2},
			{ id:"srcpartyname",header:"出货仓库", sort:"string",fillspace:2},
			{ id:"trgpartycode",	header:"收货仓库编号", sort:"string",hidden:true,fillspace:2},
			{ id:"trgpartyname",header:"收货仓库", sort:"string",hidden:true,fillspace:2},
			{ id:"skucode",header:"SKU", sort:"string",hidden:true,fillspace:2},
			{ id:"movqty",header:"数量",sort:"int",align:"right", fillspace:1,css:"bgcolor1"}
		],
		on:{
					onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_RetProdBySKUPlan").remove(id);
								}
							}
						});
					}
				},
		}
	};
	
	var layout = {
		type: "clean",
		id: "retProdBySKUView",
		rows:[
			grid_RetProdBySKU_DWHSKU,
			{view:"resizer"},
			{container:"data_container",
			    cols:[
				grid_RetProdBySKU_SubWHTSInfo,
				{view:"resizer"},
				{ 
					view:"form",height:300, width:300, scroll:false,type: "clean",
					elements:[
					{ view:"button", label:"退货", type:"next", height:30, width:100, align:"left",
					click:function(){
						$$("dt_RetProdBySKU_SubWHTSInfo").eachRow(function(rowId){
							var row = $$("dt_RetProdBySKU_SubWHTSInfo").getItem(rowId);
							if(row.operateret>0)
							{
								var sameArray = $$("dt_RetProdBySKUPlan").find(function(obj){
								    return obj.partycode===row.partycode && obj.skucode === row.skucode;
								});
								
								if(sameArray.length<1)
								$$("dt_RetProdBySKUPlan").add({
									trgpartycode:retTargetWHCode,
									srcpartycode:row.partycode,
									srcpartyname:row.partyname,
									skucode:row.skucode,
									movqty:row.operateret});
							}
						});
					}},
					grid_RetProdBySKUPlan
					]
				}
			]}
		]
	};


	return {
		$ui: layout,
	    $oninit:function(){
	    		webix.dp.$$("dt_RetProdBySKUPlan").attachEvent('onBeforeDataSend', function(obj){
	    			obj.data.makedate = (new Date()).toString('yyyy/MM/dd');
//	    			obj.data.ordercode = obj.data.partycode+"@"+(new Date()).toString('yyyy-MM-dd');
	    			obj.data.plantype = "人工退货";
	    			obj.data.operator = _UserCode+'@'+_UserName;
	    			obj.data.dealstate = "未处理";
	    		});
	  		webix.dp.$$("dt_RetProdBySKUPlan").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_RetProdBySKUPlan").getItem(id)._identify = response;
				$$("dt_RetProdBySKUPlan").refresh();   
			});    	    		
	    }
	};

});
