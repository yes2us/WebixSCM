define(function(){
    
    var chart=	{view:"chart", type:"area",id:"chartid",
            						xAxis:{ template:"#date#"},
            						legend:{
                						values:[{text:"绿区",color:"#66cc00"},{text:"黄区",color:"#e9df40"},
                						{text:"红区",color:"#ff0000"},{text:"在手库存",color:"#000000"}],
                						align:"right", valign:"middle", layout:"x",width: 10,margin: 2 },
            						series:[
            									{
							                    type:"area",
							                    value:"#greenzone#",
							                    color:"#66cc00",
							                 	label:"#greenzone#"
							                },
							                	{
							                    type:"area",
							                    value:"#yellowzone#",
							                    color:"#e9df40",
//							                 	label:"#yellowzone#"
							                },
							                	{
							                    type:"area",
							                    value:"#redzone#",
							                    color:"#ff0000",
//							                    label:"#redzone#"
							                },
            									{
							                    type:"line",
							                    value:"#handqty#",
							                    line:{color:"#000000",width:5},
							                    tooltip:{template:"#handqty#" },
							                    label:"#handqty#"
							                }],
						};
						
	function drawChart(WHCode,SKUCode,EndDate){
//		var premzChartData = webix.ajax().post(urlstr+"/WBStockMng/getSKUHSStock",
//		{WHCode:WHCode,SKUCode:SKUCode,EndDate:SKUCode});
	
		var premzChartData = webix.ajax().post(urlstr+"/WBStockMng/getSKUHSStock",{});
		
		premzChartData.then(function(repsonse){
				var rtObject = repsonse.json();
				var yValueLimit = rtObject.yValueLimit[0].yValueLimit;
				
//				console.log(JSON.stringify(rtObject))
				
				$$("chartid").clearAll();
				$$("chartid").define("yAxis",{ start:0, step:1, end: yValueLimit});
				$$("chartid").refresh();
				$$("chartid").parse(rtObject.imgData);
			});
	}
   
	var gridTree = {
		view:"treetable",
		headerRowHeight:_HeaderRowHeight,
		leftSplit:3,
		rowHeight:_RowHeight,
		id:"dt_dwhadjrec",
		dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
		},
		columns:[
			{ id:"skucode",	header:"SKU", sort:"string",fillspace:2},
			{ id:"partycode",header:"#",hidden:true},
			{ id:"recorddate",	header:"调整日期", sort:"string",fillspace:1.5},
			{ id:"oldtargetqty",	header:"原目标库存", sort:"string",fillspace:1},
			{ id:"sugtargetqty",	header:"建议目标库存", sort:"string",fillspace:1},
			
			{ id:"adjustreason",	header:"调整原因", sort:"string",fillspace:3},
			{ id:"operator",	header:"操作人", sort:"string",fillspace:1}
		],
		on:{
			onSelectChange:function(){
					var row = this.getSelectedItem();
					if(row)
					{	
						drawChart(row.partycode,row.skucode,row.recorddate);
					}
			}
		},
		select: true
	};

	var layout = {
		type: "clean",
		id: "dwhAdjRecView",
		rows:[
			gridTree,
			chart
		]
	};

	return { $ui: layout };

});
