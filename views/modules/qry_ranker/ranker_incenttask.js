define([
"data/scoreobject",
"views/menus/export"
], function(scoreobject,exports){

var curYearMonth = null;
var yearMonthArray = [];
for (var i = 0; i < 3; i++) {
	var today = new Date();
	today.setMonth(today.getMonth() - i);
	yearMonthArray[i] = today.toString("yyyy-MM");
}

	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{ view:"combo", labelWidth:70,label:"月份",inputWidth:300, options:yearMonthArray,
					on:{	onchange:function(){
								curYearMonth = this.getValue();
								getIncentTask(this.getValue());
				 			}
					}
				},
				{},
				{ view: "button", type: "iconButton", icon: "external-link", label: "导出", width: 70, popup: exports.print("IncentDetail")},
		    ]
	};
	

	var gridsum = {
		view:"datatable",
		id:"IncentTask",
		headerRowHeight:35,
		width:500,
			dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
				},
		select:"row",
		columns:[
			{ id:"rankorder", header:"排名", sort:"int",width: 65},
			{ id:"staffcode",	header:"编号",  sort:"string", hidden:true},
			{ id:"staffname",	header:"姓名",  sort:"string", width: 70},
			{ id:"deptsname",	header:["店名",{content:"selectFilter"}], sort:"string",fillspace:1.5},
			{ id:"pscoreqty",	header:"总奖出", sort:"int",fillspace:1,format:webix.Number.numToStr({decimalSize:0})},
			{ id:"nscoreqty",	header:"总扣出", sort:"int",fillspace:1,format:webix.Number.numToStr({decimalSize:0})},
			{ id:"avgpscoreqty",	header:"人均奖出", sort:"int",fillspace:1,format:webix.Number.numToStr({decimalSize:1,decimalDelimiter:"."})},
			{ id:"avgnscoreqty",	header:"人均扣出", sort:"int",fillspace:1,format:webix.Number.numToStr({decimalSize:1,decimalDelimiter:"."})},
		],
		  on:{
        	onSelectChange:function(){
             var id = $$("IncentTask").getSelectedId();
             var storemngercode = $$("IncentTask").getItem(id).staffcode;
//           console.log(storemngercode);
              var condition  = "RecordYM='"+curYearMonth+"' and GetFrom='"+storemngercode+"' and  GetFrom<>StaffCode";
				  
			$$("IncentDetail").clearAll();
			$$("IncentDetail").parse(scoreobject.queryScoreRecord(condition));
        	}
    		}

	};
	
	var griddetails = {
		view:"datatable",
		id:"IncentDetail",
		headerRowHeight:35,
		select:"row",
			dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
				},
		columns:[
			{id:"auditstate", header:["状态", {content:"selectFilter"} ], sort:"string" ,width:60,template:"<span class='status status#auditvalue#'>#auditstate#</span>"},
			{ id:"recordcode", header:"记录编码", sort:"string",width: 100,hidden:true},
			{ id:"recordtime", header:"日期", sort:"string",stringResult:true, format:"%Y-%m-%d",width: 100},
			{ id:"staffname",	header:["姓名",{content:"selectFilter"}],  sort:"string",width: 70},
			{ id:"yscore",	header:["Y分",{content:"numberFilter"}], sort:"string",width: 60,format:webix.Number.numToStr({decimalSize:0})},
			{ id:"incenttype", header:["奖扣",{content:"selectFilter"}], width:60},
			{ id:"eventtype",	header:["事件类型",{content:"selectFilter"}], sort:"int",width: 100},
			{ id:"event",	header:["事件",{content:"selectFilter"}], sort:"int",fillspace:1},
			{ id:"eventremark",	header:"备注", fillspace:1},
		],
		pager:"pagerA",
	};
	
	var pager = 	{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:35,
						cols:[{
							view:"pager", id:"pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					};
					
	var layout = {
		id: "rankIncentTaskView",
		type: "clean",
		rows:[
			titleBar,
			{type: "wide",
				cols:[gridsum,{view:"resizer"},{rows:[griddetails,pager]}]}
		]
	};

function getIncentTask(YearMonth)
{
	var condition = {
		//DeptCode:deptcode,
		YearMonth:YearMonth,
		RankAtt:"IncentTask",
		PageIndex:1,
		PageLen:1000
	};

		$$("IncentTask").clearAll();
		$$("IncentTask").parse(scoreobject.getRanker(condition));	
}

return { $ui:layout,}

});