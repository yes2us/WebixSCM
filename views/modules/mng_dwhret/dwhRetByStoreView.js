define([
	"data/stockobject"
],
	function(stockobject){
		
    var selPartyName;
    var retTargetWHCode;
    
	var grid_storestockstruct = {
		view:"datatable",
		id:"dt_storestockstruct",
		leftSplit:3,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{
			  width:250,
			  autoheight:false,
			 scroll:true
		},
		columns:[
				     { id:"partycode",name:"partycode",	header:"门店编号", hidden:true,css:"rank", fillspace:1},
				    { id:"partyname",name:"partyname",	header:"门店", css:"rank", width:100},
				    { id:"yearname",name:"yearname",	header:"年份", css:"rank", width:60},
					{ id:"seasonname",name:"seasonname",	header:"季节", css:"rank",width:60},
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
			onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow)
						{
							selPartyName = selRow.partyname;
							var presStoreTSData = stockobject.getFGWarehouseTSInfo(selRow.partycode);
							$$("dt_dwhRetStoreTSInfo").clearAll();
							$$("dt_dwhRetStoreTSInfo").parse(presStoreTSData);
						}
			}
		}
	};


   var grid_dwhRetStoreTSInfo = {
		view:"datatable",
		rowHeight:_RowHeight+5,
		id:"dt_dwhRetStoreTSInfo",
		headerRowHeight:_HeaderRowHeight,
		editable:true,
		headermenu:{
			width:250,
			autoheight:false,
			scroll:true
		},
		rules:{"targetqty":webix.rules.isNumber,"operateret":webix.rules.isNumber},
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"partycode",header:"门店编号",width:35,hidden:true},
			{ id:"partyname",header:"门店",width:35,hidden:true},
			{ id:"skucode",header:"SKU", sort:"string",fillspace:2},
			
			{ id:"yearname",	header:"年份", sort:"string",fillspace:1,hidden:true},
			{ id:"seasonname",	header:"季节", sort:"string",fillspace:1},
			{ id:"maintypename",	header:"大类", sort:"string",fillspace:1.5},
			{ id:"subtypename",	header:"小类", sort:"string",fillspace:1.5},
			
			{ id:"saletype",	header:"销售分类", sort:"string",fillspace:1},
			{ id:"isdeadskc",	header:"死货", sort:"int",fillspace:1},
			{ id:"targetqty",	header:"目标库存",sort:"int", fillspace:1,editor:"text",invalidMessage:"必须输入数字",css:'bgcolor1'},
			{ id:"stockqty",	header:"实际库存",sort:"int", fillspace:1},
			{ id:"sugretqty",	header:"超额库存",sort:"int",align:"right", fillspace:1,template:function(obj){return (obj.stockqty>obj.targetqty)? obj.stockqty-obj.targetqty:"";}},
			{ id:"operateret",	header:"退货",sort:"int",align:"right", fillspace:1,editor:"text",invalidMessage:"必须输入数字",css:'bgcolor1'}
		],
	};
	
	var grid_retplanorder2 = {
		view:"datatable",
		id:"dt_retPlanOrder2",
		headerRowHeight:_HeaderRowHeight,
		rowHeight:_RowHeight+5,
		maxWidth:300,
		headermenu:{
			width:300,
			autoheight:false,
			scroll:true
		},
		editable:true,
		save:urlstr+"/WBCURDMng/saveRetOrder",
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"delete",header:"&nbsp;", width:35,template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
			{ id:"parentcode",	header:"上级编号", sort:"string",hidden:true,fillspace:2},
			{ id:"partycode",	header:"门店编号", sort:"string",hidden:true,fillspace:2},
			{ id:"partyname",	header:"退货门店",sort:"int", fillspace:1},
			{ id:"skucode",	header:"SKU", sort:"string",hidden:true,fillspace:2},
			{ id:"orderqty",	header:"退货量",sort:"int",align:"right", fillspace:1}
		],
		on:{
				onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_retPlanOrder2").remove(id);
								}
							}
						});
					}
				},
		}
	};
	
	var layout = {
		type: "clean",
		id: "dwhRetByStoreView",
		rows:[
			{container:"data_container",
			    cols:[
				grid_storestockstruct,
				{view:"resizer"},
				{ 
					view:"form",height:300, width:300, scroll:false,type: "clean",
					elements:[
					{ view:"button", label:"退货", type:"next", height:30, width:100, align:"left",
					click:function(){
						$$("dt_dwhRetStoreTSInfo").eachRow(function(rowId){
							var row = $$("dt_dwhRetStoreTSInfo").getItem(rowId);
							if(row.operateret>0)
							{
								var sameArray = $$("dt_retPlanOrder2").find(function(obj){
								    return obj.partycode===row.partycode && obj.skucode === row.skucode;
								});
								
								if(sameArray.length<1)
								$$("dt_retPlanOrder2").add({
									parentcode:retTargetWHCode,
									partycode:row.partycode,
									partyname:selPartyName,
									skucode:row.skucode,
									orderqty:row.operateret});
							}
						});
					}},
					grid_retplanorder2
					]
				}
			]},
			{view:"resizer"},
			grid_dwhRetStoreTSInfo
		]
	};


	return { 
		setRetTargetWH:function(targetWHCode){retTargetWHCode=targetWHCode;},
		$ui: layout,
	 	$oninit:function(){
	    		webix.dp.$$("dt_retPlanOrder2").attachEvent('onBeforeDataSend', function(obj){
	    			obj.data.MakeDate = (new Date()).toString('yyyy/MM/dd');
	    			obj.data.OrderCode = obj.data.partycode+"@"+(new Date()).toString('yyyy-MM-dd');
	    			obj.data.OrderType = "人工退货";
	    			obj.data.Operator = _UserCode+'@'+_UserName;
	    			obj.data.DealState = -1;
	    		});
	    }
	};

});
