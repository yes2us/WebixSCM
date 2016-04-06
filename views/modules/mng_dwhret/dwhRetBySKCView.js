define([
	"data/stockobject"
],
	function(stockobject){
		
	var grid_skc = {
		view:"datatable",
		id:"dt_dwhskc",
		leftSplit:3,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{
			  width:250,
			  autoheight:false,
			 scroll:true
		},
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"partycode",header:"#",width:35,hidden:true},
			{ id:"skucode",header:"SKU", sort:"string",fillspace:2},
			
			{ id:"skccode",	header:"款色", sort:"string",fillspace:1.5},
			{ id:"colorname",	header:"颜色", sort:"string",fillspace:1},
			{ id:"sizename",	header:"尺码", sort:"string",fillspace:1},
			
			{ id:"yearname",	header:"年份", sort:"string",fillspace:1,hidden:true},
			{ id:"seasonname",	header:"季节", sort:"string",fillspace:1},
			{ id:"maintypename",	header:"大类", sort:"string",fillspace:1.5},
			{ id:"subtypename",	header:"小类", sort:"string",fillspace:1.5},
			
			{ id:"targetqty",	header:"目标库存",sort:"int", fillspace:1},
			{ id:"stockqty",	header:"实际库存",sort:"int", fillspace:1},
			{ id:"repretqty",	header:"库存缺口",sort:"int",align:"right", fillspace:1}
		],
		select: true,
		on:{
			onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow)
						{
						var postData={RetTargetWHCode:selRow.partycode,SKUCode:selRow.skucode};
						var presRetTargetSubWHTSData = stockobject.getRetTargetWHSubWHTSInfo(postData);
						$$("dt_dwhRetBySKC").clearAll();
						$$("dt_dwhRetBySKC").parse(presRetTargetSubWHTSData);
						}
			}
		}
	};


   var grid_whlistbyskc = {
		view:"datatable",
		rowHeight:_RowHeight+5,
		id:"dt_dwhRetBySKC",
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
			{ id:"skucode",	header:"SKU", sort:"string",hidden:true,fillspace:2},
//			{ id:"skccode",	header:"款色", sort:"string",fillspace:1},
//			{ id:"sizename",	header:"尺码", sort:"string",fillspace:0.5},
			{ id:"partycode",	header:"下属门店编号", sort:"string",hidden:true,fillspace:2},
			{ id:"partyname",	header:"下属门店", sort:"string",fillspace:2},
			{ id:"targetqty",	header:"目标库存",sort:"int", fillspace:1,editor:"text",invalidMessage:"必须输入数字",css:'bgcolor1'},
			{ id:"stockqty",	header:"实际库存",sort:"int", fillspace:1},
			{ id:"sugretqty",	header:"超额库存",sort:"int",align:"right", fillspace:1,template:function(obj){return (obj.stockqty>obj.targetqty)? obj.stockqty-obj.targetqty:"";}},
			{ id:"operateret",	header:"退货",sort:"int",align:"right", fillspace:1,editor:"text",invalidMessage:"必须输入数字",css:'bgcolor1'}
		],
	};
	
	var grid_retplanorder = {
		view:"datatable",
		id:"dt_retPlanOrder",
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
									webix.$$("dt_retPlanOrder").remove(id);
								}
							}
						});
					}
				},
		}
	};
	
	var layout = {
		type: "clean",
		id: "dwhRetBySKCView",
		rows:[
			grid_skc,
			{view:"resizer"},
			{container:"data_container",
			    cols:[
				grid_whlistbyskc,
				{view:"resizer"},
				{ 
					view:"form",height:300, width:300, scroll:false,type: "clean",
					elements:[
					{ view:"button", label:"退货", type:"next", height:30, width:100, align:"left",
					click:function(){
						$$("dt_dwhRetBySKC").eachRow(function(rowId){
							var row = $$("dt_dwhRetBySKC").getItem(rowId);
							if(row.operateret>0)
							{
								var sameArray = $$("dt_retPlanOrder").find(function(obj){
								    return obj.partycode===row.partycode && obj.skucode === row.skucode;
								});
								
								if(sameArray.length<1)
								$$("dt_retPlanOrder").add({
									partycode:row.partycode,
									partyname:row.partyname,
									skucode:row.skucode,
									repretqty:row.operateret});
							}
						});
					}},
					grid_retplanorder
					]
				}
			]}
		]
	};


	return { $ui: layout };

});
