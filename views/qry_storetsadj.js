define([
	"data/stockobject",
	],
function(stockobject){
	
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);
	
	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
			    {view:"datepicker", 	name:"enddate",width:250,align: "left", label: '结束日期',	labelWidth:100,value:new Date(), stringResult:true, format:"%Y-%m-%d"},
				{view:"select",name:"regioncode", 	width:250,align: "left", label: '区域',	labelWidth:100,
				options:urlstr+"/WBPartyMng/getRegionList",
				on:{
					onChange:function(newv,oldv){
						if(newv)
						{
							webix.ajax().post(urlstr+"/WBPartyMng/getStoreList",{RegionCode:newv},function(response){
									var optionarray = [{id:'all',value:"所有"}];
									JSON.parse(response).forEach(function(item){
										optionarray.push({id:item.partycode,value:item.partyname});
									});
									
									$$("storecode").define('options',optionarray);
									$$("storecode").refresh();
								});
						}
					}
				}
				},
			    {view:"select", name:"storecode",width:250,align: "left", label: '门店',	labelWidth:100,options:[]},
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
						if(values.storecode == 'all')
						{
							var postData = {RecordDate:values.enddate.substr(0,10)};
						}
						else
						{
							var postData = {RecordDate:values.enddate.substr(0,10),WHCode:values.storecode};
						}
						$$("data_storeadjrecord").clearAll();
						$$("data_storeadjrecord").parse(stockobject.getPartyAdjRec(postData));
				 }},
			    {},

		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"data_storeadjrecord",
				view:"datatable", 
				editable:true,
				select:true,
				headerRowHeight:35,
					dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
				columns:[
					{ id:"recorddate",	header:"日期", sort:"string",fillspace:1.5},
					{ id:"skucode",	header:"SKU", sort:"string",fillspace:2},
					{ id:"oldtargetqty",	header:"原目标库存", sort:"string",fillspace:1},
					{ id:"sugtargetqty",	header:"建议目标库存", sort:"string",fillspace:1},
					{id:"adjustreason", header:["调整原因 ",{content:"selectFilter"}], fillspace:3},
					{id:"operator", header:["操作人 ",{content:"selectFilter"} ], sort:"string",width:70}
				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
				pager:"storeadjrec_pagerA"
			}
		]

	};

	var layout = {
		type: "clean",
		rows:[
			titleBar,
			{
				rows:[
					grid,
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", id:"storeadjrec_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
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