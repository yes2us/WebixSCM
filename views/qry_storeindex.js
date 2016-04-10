define([
	"data/stockobject",
	],
function(stockobject){
	 
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);
	    var regioncode = null;
	    
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{view:"select",name:"regioncode", width:250,align: "left", label: '区域',	labelWidth:60,
				options:urlstr+"/WBPartyMng/getRegionList",
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
							regioncode = newv;
							webix.ajax().post(urlstr+"/WBPartyMng/getRelPartyList",{RegionCode:newv},function(response){
								   if(response){
									var optionarray = [{id:'all',value:"所有"}];
									JSON.parse(response).forEach(function(item){
										optionarray.push({id:item.partycode,value:item.partyname});
									});
									
									$$("storecode").define('options',optionarray);
									$$("storecode").refresh();
									}
								});
						}
					}
				}
				},
			    {view:"select", id:"storecode",name:"storecode",width:250,align: "left", label: '门店',	labelWidth:60,options:[]},
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
//				    	console.log(JSON.stringify(values));
				    	   var postData = {ParentCode:regioncode,FieldStr:null};
						if(values.storecode && values.storecode != 'all')
						{
							postData.StoreCode=values.storecode;
						}
						$$("dt_storeindicator").clearAll();
						$$("dt_storeindicator").parse(stockobject.getPartyIndex(postData));
				 }},
			    {},

		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_storeindicator",
				view:"datatable", 
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:false,
				select:true,
				leftSplit:3,
				export: true,
				columns:[
					{ id:"partyname",	header:["门店",{content:"selectFilter"}], sort:"string",width:150,css:"bgcolor2"},
//					{ id:"partytype",	header:"SKU", sort:"string",fillspace:1},
					{ id:"yearname",	header:["年份",{content:"selectFilter"}], sort:"string",width:60,css:"bgcolor2"},
					{ id:"seasonname",	header:["季节",{content:"selectFilter"}], sort:"string",width:60,css:"bgcolor2"},
					{ id:"seasonstagename", header:["波段",{content:"selectFilter"}], width:60},
					{ id:"seriesname", header:["系列",{content:"selectFilter"}], sort:"string",width:60},
					{ id:"middlesizenum",	header:[{text:"断码", colspan:3},"核心码"], sort:"int",width:70},
					{ id:"shortmiddlesizenum",	header:[null,"断码数"], sort:"int",width:70},
					{ id:"shortmiddlesizeratio",	header:[null,"断码率"], sort:"float",width:70,format:function(value){return parseInt(100*value)+"%";}},
//					{ id:"replenishratio",	header:"补货率", sort:"float",width:70},
					{ id:"frskcnuminparent",header:[{text:"畅销款", colspan:3},"区域畅款"], sort:"int",width:85},
					{ id:"frskcnuminparty",	header:[null,"本店畅款"], sort:"int",width:85},
					{ id:"frskcratiopartycover",	header:[null,"畅款比例"], sort:"float",width:85,format:function(value){return parseInt(100*value)+"%";}},
					
					{ id:"stockonhandqty",	header:[{text:"库存分析", colspan:9},"目标库存"],sort:"int",width:85},
					{ id:"stockonhandqty",	header:[null,"在手库存"],sort:"int",width:85},
					{ id:"stockonroadqty",	header:[null,"在途库存"], sort:"int",width:85},
					{ id:"stocktotalqty",	header:[null,"总库存"], sort:"int",width:60},
					{ id:"stockdayofinventory",header:[null,"库存天"], sort:"int",width:70},
					{ id:"stockstoredeadglobalhot",	header:[null,"店死整爆"], sort:"int",width:85},
					{ id:"stockoverinstores",	header:[null,"超额库存"], sort:"int",width:85},
					{ id:"stockshortinstores",	header:[null,"库存缺口"], sort:"int",width:85},
					{ id:"stockdailyidd",	header:[null,"日均IDD"], sort:"int",width:90},
					
					{ id:"saleyesterday",header:[{text:"销售分析", colspan:5},"昨日销量"], sort:"int",width:85},
					{ id:"sale14days",	header:[null,"14天销量"], sort:"int",width:85},
					{ id:"saletotal",	header:[null,"总销量"], sort:"int",width:70},
					{ id:"salecompleteper",header:[null,"售罄率"], sort:"float",width:70,format:function(value){return parseInt(100*value)+"%";}},
					{ id:"saledailytdd",	header:[null,"日均TDD"], sort:"int",width:85}
				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
				pager:"storeindicator_pagerA"
			}
		]

	};

	var layout = {
		type: "line",
		rows:[
			titleBar,
			{
				rows:[
					grid,
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:2,
						paddingY:2,
						height:30,
						cols:[{
							view:"pager", id:"storeindicator_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 30,
							group:5
						}]
					}
				]
			}
		]

	};
	

	return {
		$ui: layout,
		$oninit:function(){

		}
	};

});