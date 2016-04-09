define([
	"data/stockobject"
],
	function(stockobject){
	var retTargetWHCode;
		
	var grid_sku = {
		view:"datatable",
		id:"dt_retProdBySKU",
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		select: true,
		resizeColumn:true,
		leftSplit:3,
		columns:[
			{ id:"_identify",header:"#",width:35,hidden:true},
			{ id:"partycode",header:"#",width:35,hidden:true},
			{ id:"skucode",header:"SKU", sort:"string",width:100,css:"bgcolor2"},
			
			{ id:"skccode",	header:"款色", sort:"string",width:100},
			{ id:"colorname",	header:"颜色", sort:"string",width:80},
			{ id:"sizename",	header:"尺码", sort:"string",width:70},
			
			{ id:"yearname",	header:"年份", sort:"string",hidden:true},
			{ id:"seasonname",	header:"季节", sort:"string",width:60},
			{ id:"maintypename",	header:"大类", sort:"string",width:100},
			{ id:"subtypename",	header:"小类", sort:"string",width:150},
			
			{ id:"targetqty",	header:"目标库存",sort:"int", width:85},
			{ id:"stockqty",	header:"实际库存",sort:"int", width:85},
			{ id:"orderqty",	header:"库存缺口",sort:"int",align:"right", width:85}
		],
		select: true,
		on:{
			onAfterLoad:function(){this.hideOverlay();  if(!this.count()) this.showOverlay("没有可以加载的数据");},
			onSelectChange:function(){
						var selRow = this.getSelectedItem();
						if(selRow)
						{
						 retTargetWHCode = selRow.partycode;
						var postData={RetTargetWHCode:selRow.partycode,SKUCode:selRow.skucode};
						var presRetTargetSubWHTSData = stockobject.getRetTargetWHSubWHTSInfo(postData);
						$$("dt_retProdBySKU").clearAll();
						$$("dt_retProdBySKU").showOverlay("正在加载......");
						$$("dt_retProdBySKU").showOverlay("正在加载......");
						$$("dt_retProdBySKU").parse(presRetTargetSubWHTSData);
						
						var _urlstr = urlstr+"/WBStockMng/getRetOrderRESTful/ParentCode/"+retTargetWHCode;
			    			_urlstr = _urlstr +"/SKUCode/"+selRow.skucode.trim();
			    			$$("dt_retProdPlanBySKU").load(_urlstr);
						}
			}
		}
	};


   var grid_whlistbyskc = {
		view:"datatable",
		id:"dt_dwhRetBySKU",
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
	
	var grid_retplanorder = {
		view:"datatable",
		id:"dt_retPlanOrder",
		maxWidth:300,
		rowHeight:_RowHeight,
		headerRowHeight:_HeaderRowHeight,
		headermenu:{width:250,autoheight:false,scroll:true},
		resizeColumn:true,
		editable:true,
		leftSplit:2,
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
		id: "retBySKUView",
		rows:[
			grid_sku,
			{view:"resizer"},
			{container:"data_container",
			    cols:[
				grid_whlistbysku,
				{view:"resizer"},
				{ 
					view:"form",height:300, width:300, scroll:false,type: "clean",
					elements:[
					{ view:"button", label:"退货", type:"next", height:30, width:100, align:"left",
					click:function(){
						$$("dt_dwhRetBySKU").eachRow(function(rowId){
							var row = $$("dt_dwhRetBySKU").getItem(rowId);
							if(row.operateret>0)
							{
								var sameArray = $$("dt_retPlanOrder").find(function(obj){
								    return obj.partycode===row.partycode && obj.skucode === row.skucode;
								});
								
								if(sameArray.length<1)
								$$("dt_retPlanOrder").add({
									parentcode:retTargetWHCode,
									partycode:row.partycode,
									partyname:row.partyname,
									skucode:row.skucode,
									orderqty:row.operateret});
							}
						});
					}},
					grid_retplanorder
					]
				}
			]}
		]
	};


	return {
		$ui: layout,
	    $oninit:function(){
	    		webix.dp.$$("dt_retPlanOrder").attachEvent('onBeforeDataSend', function(obj){
	    			obj.data.makedate = (new Date()).toString('yyyy/MM/dd');
	    			obj.data.ordercode = obj.data.partycode+"@"+(new Date()).toString('yyyy-MM-dd');
	    			obj.data.ordertype = "人工退货";
	    			obj.data.operator = _UserCode+'@'+_UserName;
	    			obj.data.dealstate = -1;
	    		});
	    }
	};

});
