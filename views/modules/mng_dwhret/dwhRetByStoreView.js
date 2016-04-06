define([
	"data/stockobject"
],
	function(stockobject){
		
    var selPartyName;
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
				    { id:"partycode",name:"yearname",	header:"门店编号", hidden:true,css:"rank", fillspace:1},
				    { id:"partyname",name:"yearname",	header:"门店", css:"rank", fillspace:1},
				    { id:"yearname",name:"yearname",	header:"年份", css:"rank", fillspace:1},
					{ id:"seasonname",name:"seasonname",	header:"季节", css:"rank", fillspace:1},
					{ id:"seriesname",name:"series",	header:"系列",width:200, fillspace:1},
					{ id:"skcnum",name:"skcnum",header:[{text:"款色结构", colspan:3},"款色数"] ,fillspace:1},
					{ id:"fastrunnerskcnum",name:"fastrunnerskcnum",header:[null,"畅销款色"],fillspace:1},
					{ id:"deadskcnum",name:"deadskcnum",header:[null,"死货款色"],fillspace:1},		
					{ id:"targetqty",name:"targetqty",header:[{text:"库存结构", colspan:5},"目标库存"] ,fillspace:1},
					{ id:"totalqty",name:"totalqty",header:[null,"总库存"] ,fillspace:1},
					{ id:"shortstockqty",name:"shortstockqty",	header:[null,"库存缺口"],fillspace:1},		
					{ id:"overstockqty",name:"overstockqty",header:[null,"超额库存"] ,fillspace:1},
					{ id:"deadstockqty",name:"deadstockqty",header:[null,"死货库存"] ,fillspace:1}
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
			
//			{ id:"skccode",	header:"款色", sort:"string",fillspace:1.5},
//			{ id:"colorname",	header:"颜色", sort:"string",fillspace:1},
//			{ id:"sizename",	header:"尺码", sort:"string",fillspace:1},
			
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
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"delete",header:"&nbsp;", width:35,template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
			{ id:"partycode",	header:"门店编号", sort:"string",hidden:true,fillspace:2},
			{ id:"partyname",	header:"退货门店",sort:"int", fillspace:1},
			{ id:"skucode",	header:"SKU", sort:"string",hidden:true,fillspace:2},
			{ id:"repretqty",	header:"退货量",sort:"int",align:"right", fillspace:1}
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
									partycode:row.partycode,
									partyname:selPartyName,
									skucode:row.skucode,
									repretqty:row.operateret});
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


	return { $ui: layout };

});
