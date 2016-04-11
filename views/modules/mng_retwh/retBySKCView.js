define([
	"data/stockobject",
	"data/billobject",
],
	function(stockobject,billobject){
		
    var selPartyName;
    var retTargetWHCode;
    
	var grid_RetWHBySKC_StoreStockStruct = {
		view:"datatable",
		id:"dt_RetWHBySKC_StoreStockStruct",
		maxHeight:300,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:2,
		columns:[
				     { id:"partycode",name:"partycode",	header:["门店编号",{content:"textFilter"}],css:"bgcolor2", width:85},
				    { id:"partyname",name:"partyname",	header:"门店", css:"bgcolor2", width:100},
				    { id:"yearname",name:"yearname",	header:"年份", width:60},
					{ id:"seasonname",name:"seasonname",header:"季节",width:60},
					{ id:"seriesname",name:"seriesname",	header:"系列",width:200,width:100},
					{ id:"skcnum",name:"skcnum",header:[{text:"款色结构", colspan:3},"款色数"] ,width:70},
					{ id:"frskcnuminparty",name:"frskcnuminparty",header:[null,"畅销款色"],width:85},
					{ id:"deadskcnum",name:"deadskcnum",header:[null,"死货款色"],width:85},		
					{ id:"stocktargetqty",name:"stocktargetqty",header:[{text:"库存结构", colspan:5},"目标库存"] ,width:85},
					{ id:"stocktotalqty",name:"stocktotalqty",header:[null,"总库存"] ,width:70},
					{ id:"stockshortinstores",name:"stockshortinstores",	header:[null,"库存缺口"],width:85},		
					{ id:"stockoverinstores",name:"stockoverinstores",header:[null,"超额库存"] ,width:85},
					{ id:"stockdeadqty",name:"stockdeadqty",header:[null,"死货库存"] ,width:85}
		],
		select: true,
		on:{
			onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow)
						{
							selPartyName = selRow.partyname;
							var presStoreTSData = stockobject.getWHSKCInfo(selRow.partycode);
							$$("dt_RetWHBySKC_StoreTSInfo").clearAll();
							$$("dt_RetWHBySKC_StoreTSInfo").parse(presStoreTSData);
							
				    			var premzSKCPlan = billobject.getMovSKCPlanItem({
									PlanType:"人工退货",
									DealState:"未处理",
									SrcPartyCode:selRow.partycode,
								});
							$$("dt_RetWHBySKCPlan").clearAll();
				    			$$("dt_RetWHBySKCPlan").parse(premzSKCPlan);
						}
			}
		}
	};


   var grid_RetWHBySKC_StoreTSInfo = {
		view:"datatable",
		id:"dt_RetWHBySKC_StoreTSInfo",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		leftSplit:4,
		editable:true,
		rules:{"targetqty":webix.rules.isNumber,"operateret":webix.rules.isNumber},
		columns:[
			{ id:"_identify",header:"ID",width:35,hidden:true},
			{ id:"partycode",header:"门店编号",width:35,hidden:true},
			{ id:"partyname",header:"门店",width:120,hidden:true},
			{ id:"skccode",header:"款色", sort:"string",width:100,css:"bgcolor2"},
			
			{ id:"yearname",	header:"年份", sort:"string",width:70},
			{ id:"seasonname",	header:"季节", sort:"string",width:70},
			{ id:"maintypename",	header:"大类", sort:"string",width:100},
			{ id:"subtypename",	header:"小类", sort:"string",width:100},
			
			{ id:"saletype",	header:"销售分类", sort:"string",width:85},
			{ id:"isdeadskc",	header:"死货", sort:"int",width:70},
			{ id:"targetqty",	header:"目标库存",sort:"int", width:85,editor:"text",invalidMessage:"必须输入数字",css:'bgcolor1'},
			{ id:"stockqty",	header:"实际库存",sort:"int", width:85},
			{ id:"sugretqty",	header:"超额库存",sort:"int",width:85,template:function(obj){return (obj.stockqty>obj.targetqty)? obj.stockqty-obj.targetqty:0;}},
			{ id:"operateret",header:"退货",sort:"int",width:70,editor:"text",invalidMessage:"必须输入数字",css:'bgcolor1'}
		],
		on:{onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");}},
	};
	
	var grid_RetWHBySKCPlan = {
		view:"datatable",
		id:"dt_RetWHBySKCPlan",
		headerRowHeight:_HeaderRowHeight,
		rowHeight:_RowHeight+5,
		maxWidth:300,
		headermenu:{
			width:300,
			autoheight:false,
			scroll:true
		},
		editable:true,
		save:urlstr+"/WBCURDMng/saveMovSKCPlan",
		columns:[
			{ id:"_identify",header:"ID",width:35,hidden:true},
			{ id:"delete",header:"&nbsp;", width:35,template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
			{ id:"srcpartycode",	header:"出货仓库编号", sort:"string",hidden:true,fillspace:2},
			{ id:"srcpartyname",header:"出货仓库", sort:"string",hidden:true,fillspace:2},
			{ id:"trgpartycode",	header:"收货仓库编号", sort:"string",hidden:true,fillspace:2},
			{ id:"trgpartyname",header:"收货仓库", sort:"string",hidden:true,fillspace:2},
			{ id:"skccode",header:"款色", sort:"string",fillspace:2},
			{ id:"movqty",header:"数量",sort:"int",align:"right", fillspace:1,css:"bgcolor1"}
		],
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_RetWHBySKCPlan").remove(id);
								}
							}
						});
					}
				},
	};
	
	var form_RetWHBySKCPlan={ 
					view:"form",width:300, scroll:false,type: "clean",
					elements:[
					{ view:"button", label:"退货", type:"next", height:30, width:100, align:"left",
					click:function(){
						$$("dt_RetWHBySKC_StoreTSInfo").eachRow(function(rowId){
							var row = $$("dt_RetWHBySKC_StoreTSInfo").getItem(rowId);
							if(row.operateret>0)
							{
								var sameArray = $$("dt_RetWHBySKCPlan").find(function(obj){
								    return obj.srcpartycode===row.partycode && obj.skccode === row.skccode;
								});
								
								if(sameArray.length<1)
								$$("dt_RetWHBySKCPlan").add({
									srcpartycode:row.partycode,
									srcpartyname:row.partyname,
									trgpartycode:retTargetWHCode,
									skccode:row.skccode,
									movqty:row.operateret});
							}
						});
					}},
					grid_RetWHBySKCPlan
					]
				};
				
	var layout = {
		type: "clean",
		id: "retWHBySKCView",
		rows:[
			{
				view:"accordion",multi:true,borderless:true,
				rows:[{ header:"下属店的库存结构", body:grid_RetWHBySKC_StoreStockStruct, height:300}]
			},
			{view:"resizer"},
			{cols:[grid_RetWHBySKC_StoreTSInfo,{view:"resizer"},form_RetWHBySKCPlan]}
		]
	};


	return { 
		setRetTargetWH:function(targetWHCode){retTargetWHCode=targetWHCode;},
		$ui: layout,
	 	$oninit:function(){
	    		webix.dp.$$("dt_RetWHBySKCPlan").attachEvent('onBeforeDataSend', function(obj){
	    			obj.data.makedate = (new Date()).toString('yyyy/MM/dd');
//	    			obj.data.ordercode = obj.data.partycode+"@"+(new Date()).toString('yyyy-MM-dd');
	    			obj.data.plantype = "人工退货";
	    			obj.data.operator = _UserCode+'@'+_UserName;
	    			obj.data.dealstate = "未处理";
	    		});
	    		
	    		webix.dp.$$("dt_RetWHBySKCPlan").attachEvent("onAfterInsert", function(response, id, object){
			    $$("dt_RetWHBySKCPlan").getItem(id)._identify = response;
				$$("dt_RetWHBySKCPlan").refresh();   
			});
	    }
	};

});
