define([
	"data/prodobject",
	],
function(prodobject){
	 
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
				{view:"select",name:"brandcode", width:200,align: "left", label: '品牌',	labelWidth:60,
					options:urlstr+"/WBProdMng/getBrandList"},
			    {view:"select", id:"yearcode",name:"yearcode",width:200,align:"left", label:'年份',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getYearList"},
			    	{view:"select", id:"seasoncode",name:"seasoncode",width:200,align:"left", label:'季节',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getSeasonList"},
			    		
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
				    	
				    	var postData ={};
				    	if(values.brandcode != 'all') postData.BrandName=values.brandcode;
				    	if(values.yearcode != 'all') postData.YearName=values.yearcode;
				    	if(values.seasoncode != 'all') postData.SeasonName=values.seasoncode;
				    	
					$$("dt_confskcinfo").clearAll();
					$$("dt_confskcinfo").parse(prodobject.getProductList(postData));
				 }},
			    {},

		    ]
	};

	
	var grid = {
		margin:10,
		rows:[
			{
				view:"datatable", 
				id:"dt_confskcinfo",
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				editable:true,
				resizeColumn:true,
				select:true,
				navigation:true,
				leftSplit:5,
				columns:[
					{ id:"_identify",header:"#", hidden:true},
					{ id:"isstopreplenish",header:"停产", sort:"int",width:60,template:"{common.checkbox()}",css:"bgcolor1"},
					{ id:"isstopproduce",header:"停补", sort:"int",width:60,template:"{common.checkbox()}",css:"bgcolor1"},
					{ id:"isstopanalyze",header:"停析", sort:"int",width:60,template:"{common.checkbox()}",css:"bgcolor1"},
					{ id:"skccode",header:"款色", sort:"string",width:100,css:'bgcolor2'},
					{ id:"skcname",header:"名称", sort:"string",width:150},
					{ id:"stylecode",header:"款式", sort:"string",width:100},
					{ id:"colorname",header:"颜色", sort:"string",width:80},
					{ id:"yearname",header:"年份", sort:"string",width:70},
					{ id:"seasonname",header:"季节", sort:"string",width:70},
					{ id:"seasonstagename",header:"波段", sort:"string",width:70},
					{ id:"seriesname",header:"系列", sort:"string",width:100},
					{ id:"maintypename",header:"大类", sort:"string",width:100},
					{ id:"subtypename",header:"小类", sort:"string",width:100},
					{ id:"subtypecode1",header:"属性1", sort:"string",width:150},
					{ id:"subtypecode2",header:"属性2", sort:"string",width:150},
					{ id:"subtypecode3",header:"属性3", sort:"string",width:150}
				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					}
				},
//				pager:"confskc_pagerA"
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