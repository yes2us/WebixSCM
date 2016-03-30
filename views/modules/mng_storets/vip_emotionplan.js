define(["data/vipobject"], function(vipobject){

	var form = {
		view: "form",
		type:"clean",
		id:"emotionPlanForm",
		paddingX:25,
		paddingY:25,
		elementsConfig:{
			labelWidth: 100
		},
		scroll: true,
		elements:[
			{	
				margin:10,
				rows:[
				{		cols:[
								{rows:[{ template:"情感状态", type:"section"},								
								{view: "text", name: "_identify", label: "#",hidden:true},
								{view: "text", name: "anzrelationlevel", label: "情感阶段",labelWidth:80,disabled:true},
								{view: "text", name: "anzemotiondegree", label: "情感温度",labelWidth:80,disabled:true},
								{view: "text", name: "anztotalscore", label: "情感投入",labelWidth:80,disabled:true}
								]},
								
								{rows:[{ template:"上次维护情况", type:"section"},								
								{view: "text", name: "anzcontnearity", label: "联系近度",labelWidth:80,disabled:true},
								{view:"datepicker", name:"anzlastcontdate", label:"联系日期",labelWidth:80, stringResult:true, format:"%Y-%m-%d",disabled:true},
								{view: "text", name: "anzlastcontcontent", label: "联系内容",labelWidth:80,disabled:true}]},
								
								{rows:[{ template:"下次维护计划", type:"section"},
								{ view:"datepicker", name:"ntcontdate", label:"联系日期",labelWidth:80, stringResult:true, format:"%Y-%m-%d"},
								{view: "text", name: "ntcontcontent", label: "联系内容",labelWidth:80},
								{view: "text", name: "maintainername", label: "维护人",labelWidth:80,disabled:true}]}
				]},
				{
					rows:[
								{template:"情感温度", type:"section"},
								{view:"chart", type:"line",id:"chartid",
            						xAxis:{ template:"#date#"},
//          						yAxis:{ start:0, step:1,end:12},
            						legend:{
                						values:[{text:"Y分",color:"#1293f8"},{text:"温度",color:"#66cc00"}],
                						align:"right", valign:"middle", layout:"x",width: 30,margin: 8 },
            						series:[
							                {
							                    value:"#yscore#",
							                    item:{borderColor: "#1293f8", color: "#ffffff" },
							                    line:{ color:"#1293f8",width:3 },
							                    tooltip:{template:"#yscore#分" },
							                    label:"#yscore#"
							                },
							                {
							                    value:"#temp#",
							                    item:{borderColor: "#66cc00",color: "#ffffff" },
							                    line:{color:"#66cc00",width:3},
							                    tooltip:{template:"#temp#度" },
							                 	label:"#temp#"
							                }],
								}
						  ]
				}
			]
		 }
		]
	};

	var layout = {
				view: "form",
				id: "vipEmotionPlanView",
				type:"clean",

					rows:[
							 form,
							 {			
									view: "form",
									css: "highlighted_header header6",
									paddingX:5,
									paddingY:5,	
									cols:[
										{ view: "button", type: "form", icon: "plus", label: "保存", width: 90,
										click:function(){
													var values = $$("emotionPlanForm").getValues();
													values.webix_operation = 'update';
													vipobject.saveSingleVIPBasicDetail(values);
													
													webix.message('保存成功');
												}},
										{}			
									]
							 }
					]
		};


	return {
		$ui:layout,
		$invoke:function(vipcode)
		{
			var prez = vipobject.getVIPTEMPTrend(vipcode,180);
			prez.then(function(repsonse){
				var rtObject = repsonse.json();
				var YValueLimit = rtObject.YValueLimit;
				$$("chartid").clearAll();
				$$("chartid").define("yAxis",{ start:0, step:1, end: YValueLimit});
				$$("chartid").refresh();
				$$("chartid").parse(rtObject.imgdata);
			});
		}
	};
	

});