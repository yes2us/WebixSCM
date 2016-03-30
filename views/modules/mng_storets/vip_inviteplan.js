define([
	"data/vipobject"
], function(vipobject){

		var yearMonthArray = [];
		for(var i=0;i<3;i++)
		{
			var today = new Date();
			today.setMonth(today.getMonth()+1-i);
			yearMonthArray[i] = today.toString("yyyy-MM"); 
		}

	var fieldset0 = { view:"fieldset", id:"fieldset0",label:"会员消费计划",
				label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 2px solid #3D7113;background:#009966;color:white;font-weight:bold;'>计划会员消费</span>",		
		body:{rows:[
			
			{template:"计划月份", type:"section"},
//			{view: "label",label: "计划月份"},
			{view:"combo", id:"AdjustYearMonth",width:200,options:yearMonthArray,
				on:{
					onChange:function(newvalue,oldvalue){ 
						$$("fieldset0").define('label',"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 2px solid #3D7113;background:#009966;color:white;font-weight:bold;'>"+newvalue+"计划会员消费</span>");
						}
				}
				},
			{template:"客单变化(%)", type:"section"},
			{view:"counter",id:"AdjustPercent", step:5,label: "",width:200,min:-100,align:"right"},
			{template:"消费金额(万)", type:"section"},
//			{ view:"text",name:"MonthSaleTarget",id:"MonthSaleTarget",inputAlign:"right" ,labelAlign:'right',format:webix.i18n.priceFormat},
			{ view:"counter",name:"MonthSaleTarget",id:"MonthSaleTarget",inputWidth:200,step:0.5,value:10},
		]}};
		
		var fieldset1 = { view:"fieldset",
		label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 2px solid #3D7113;background:#ddFFdd;font-weight:bold;'>第1象限</span>&nbsp;&nbsp;亲密重要",		
		body:{rows:[
			
			{ view:"text", name:"Q1_PlanMoneyTotalCustomer", id:"Q1_PlanMoneyTotalCustomer",label:"计划金额", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q1_PlanMoneyPerCustomer", id:"Q1_PlanMoneyPerCustomer", label:"本月客单", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q1_PlanBuyPersonCount", id:"Q1_PlanBuyPersonCount", 
			label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 1px solid #3D7113;background:#2A2A2A;color:white;font-weight:bold;'>回购人数</span>",		
			inputAlign:"right" ,labelAlign:'right',disabled:false},
			
			{ view:"text", name:"Q1_CalcMoneyPercent", id:"Q1_CalcMoneyPercent", label:"金额占比", inputAlign:'right',labelAlign:'right',disabled:true,hidden:false},
			{ view:"text", name:"Q1_CalcMoneyPerCustomer", id:"Q1_CalcMoneyPerCustomer", label:"预估客单", inputAlign:'right',labelAlign:'right',disabled:true,hidden:true},

		]}};

		var fieldset2 = { view:"fieldset", 
		label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 2px solid #3D7113;background:#ddFFdd;font-weight:bold;'>第2象限</span>&nbsp;&nbsp;亲密一般",		
		body:{rows:[
			
			{ view:"text", name:"Q2_PlanMoneyTotalCustomer", id:"Q2_PlanMoneyTotalCustomer",label:"计划金额", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q2_PlanMoneyPerCustomer", id:"Q2_PlanMoneyPerCustomer", label:"本月客单", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q2_PlanBuyPersonCount", id:"Q2_PlanBuyPersonCount", 
			label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 1px solid #3D7113;background:#2A2A2A;color:white;font-weight:bold;'>回购人数</span>",		
			inputAlign:"right" ,labelAlign:'right',disabled:false},
			
			{ view:"text", name:"Q2_CalcMoneyPercent", id:"Q2_CalcMoneyPercent", label:"金额占比", inputAlign:'right',labelAlign:'right',disabled:true,hidden:false},
			{ view:"text", name:"Q2_CalcMoneyPerCustomer", id:"Q2_CalcMoneyPerCustomer", label:"预估客单", inputAlign:'right',labelAlign:'right',disabled:true,hidden:true},

		]}};
		
		var fieldset3 = { view:"fieldset", 
		label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 2px solid #3D7113;background:#ddFFdd;font-weight:bold;'>第3象限</span>&nbsp;&nbsp;友好重要",		
		body:{rows:[
			
			{ view:"text", name:"Q3_PlanMoneyTotalCustomer", id:"Q3_PlanMoneyTotalCustomer",label:"计划金额", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q3_PlanMoneyPerCustomer", id:"Q3_PlanMoneyPerCustomer", label:"本月客单", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q3_PlanBuyPersonCount", id:"Q3_PlanBuyPersonCount", 
			label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 1px solid #3D7113;background:#2A2A2A;color:white;font-weight:bold;'>回购人数</span>",		
			inputAlign:"right" ,labelAlign:'right',disabled:false},
			
			{ view:"text", name:"Q3_CalcMoneyPercent", id:"Q3_CalcMoneyPercent", label:"金额占比", inputAlign:'right',labelAlign:'right',disabled:true,hidden:false},
			{ view:"text", name:"Q3_CalcMoneyPerCustomer", id:"Q3_CalcMoneyPerCustomer", label:"预估客单", inputAlign:'right',labelAlign:'right',disabled:true,hidden:true},

		]}};


		var fieldset4 = { view:"fieldset",
		label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 2px solid #3D7113;background:#ddFFdd;font-weight:bold;'>第4象限</span>&nbsp;&nbsp;友好一般",
		body:{rows:[
			
			{ view:"text", name:"Q4_PlanMoneyTotalCustomer", id:"Q4_PlanMoneyTotalCustomer",label:"计划金额", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q4_PlanMoneyPerCustomer", id:"Q4_PlanMoneyPerCustomer", label:"本月客单", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q4_PlanBuyPersonCount", id:"Q4_PlanBuyPersonCount", 
			label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 1px solid #3D7113;background:#2A2A2A;color:white;font-weight:bold;'>回购人数</span>",		
			inputAlign:"right" ,labelAlign:'right',disabled:false},
			
			{ view:"text", name:"Q4_CalcMoneyPercent", id:"Q4_CalcMoneyPercent", label:"金额占比", inputAlign:'right',labelAlign:'right',disabled:true,hidden:false},
			{ view:"text", name:"Q4_CalcMoneyPerCustomer", id:"Q4_CalcMoneyPerCustomer", label:"预估客单", inputAlign:'right',labelAlign:'right',disabled:true,hidden:true},

		]}};


		var fieldset5 = { view:"fieldset", 
		label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 2px solid #3D7113;background:#ddFFdd;font-weight:bold;'>第5象限</span>&nbsp;&nbsp;休眠会员",
		body:{rows:[
			
			{ view:"text", name:"Q5_PlanMoneyTotalCustomer", id:"Q5_PlanMoneyTotalCustomer",label:"计划金额", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q5_PlanMoneyPerCustomer", id:"Q5_PlanMoneyPerCustomer", label:"本月客单", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q5_PlanBuyPersonCount", id:"Q5_PlanBuyPersonCount", 
			label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 1px solid #3D7113;background:#2A2A2A;color:white;font-weight:bold;'>回购人数</span>",		
			inputAlign:"right" ,labelAlign:'right',disabled:false},
			
			{ view:"text", name:"Q5_CalcMoneyPercent", id:"Q5_CalcMoneyPercent", label:"金额占比", inputAlign:'right',labelAlign:'right',disabled:true,hidden:false},
			{ view:"text", name:"Q5_CalcMoneyPerCustomer", id:"Q5_CalcMoneyPerCustomer", label:"预估客单", inputAlign:'right',labelAlign:'right',disabled:true,hidden:true},

			]},
		};
			
			
		var fieldset6={ view:"fieldset", 
		label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 2px solid #3D7113;background:#ddFFdd;font-weight:bold;'>第6象限</span>&nbsp;&nbsp;流失会员",
		body:{rows:[
			
			{ view:"text", name:"Q6_PlanMoneyTotalCustomer", id:"Q6_PlanMoneyTotalCustomer",label:"计划金额", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q6_PlanMoneyPerCustomer", id:"Q6_PlanMoneyPerCustomer", label:"本月客单", inputAlign:"right" ,labelAlign:'right'},
			{ view:"text", name:"Q6_PlanBuyPersonCount", id:"Q6_PlanBuyPersonCount", 
			label:"<span style='border-radius: 4px; -webkit-border-radius: 4px;-moz-border-radius: 4px;border: 1px solid #3D7113;background:#2A2A2A;color:white;font-weight:bold;'>回购人数</span>",		
			inputAlign:"right" ,labelAlign:'right',disabled:false},
			
			{ view:"text", name:"Q6_CalcMoneyPercent", id:"Q6_CalcMoneyPercent", label:"金额占比", inputAlign:"right" ,labelAlign:'right',disabled:true,hidden:false},
			{ view:"text", name:"Q6_CalcMoneyPerCustomer", id:"Q6_CalcMoneyPerCustomer", label:"预估客单", inputAlign:"right" ,labelAlign:'right',disabled:true,hidden:true},

		]}};

    var customerinQuad={
			view:"datatable",
			id:"dt_customerinquad",
			save:urlstr+"/WBCURDMng/saveVIPInfo",
			headerRowHeight:35,
			select:true,
			editable:true,
			dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
				},
			columns:[
							{ id:"_identify",name:"_identify",header:"#1",hidden:true},
							{ id:"row_number",name:"row_number",header:"#1",fillspace:0.5},
							{ id:"quadrankno",name:"quadrankno",header:"#2",fillspace:0.5},
							
							{ id:"anzbuyhabitquad",name:"anzbuyhabitquad",header:["象限",{content:"selectFilter"}],fillspace:1},
							{ id:"planinvitedate",name:"planinvitedate",	editor:"date",header:"计划邀约日期",fillspace:1},
							{ id:"customercode",name:"customercode",	header:["顾客编号",{content:"textFilter"}],sort:"string", css:"rank", fillspace:1},
							{ id:"customername",name:"customername",	header:["顾客姓名",{content:"textFilter"}],fillspace:1},
							{ id:"mobileno",name:"mobileno",header:["手机号",{content:"textFilter"}],fillspace:1},
							{ id:"maintainercode",name:"maintainercode",header:"维护人编号" ,hidden:true,fillspace:1},
							{ id:"maintainername",name:"maintainername",header:["维护人",{content:"selectFilter"}] ,fillspace:1},
							{ id:"anzcontnearity",name:"anzcontnearity",header:["联系近度",{content:"numberFilter"}],sort:"int",fillspace:1},	
							{ id:"anzbuynearity",name:"anzbuynearity",header:["消费近度",{content:"numberFilter"}],sort:"int",fillspace:1}	,
							{ id:"anzimportantlevel",name:"anzimportantlevel",	header:["重要级别",{content:"selectFilter"}],fillspace:1},	
							{ id:"anzstatelevel",name:"anzstatelevel",header:["会员状态",{content:"selectFilter"}],fillspace:1},	
							{ id:"anzmidtermbuymoney",name:"anzmidtermbuymoney",header:["中期购买金额",{content:"numberFilter"}],sort:"int",fillspace:1},	
							{ id:"anzmidtermbuyfreq",name:"anzmidtermbuyfreq",	header:["中期购买次数",{content:"numberFilter"}],sort:"int",fillspace:1},

							]
			};
						
	var form = {
			id: "vipInvitePlanView",
			view:"form",
			margin:0, 
//			type:"space",
			type:'clean',
			rows:[
//			titleBar,
				{
					 margin:2,
					type:'wide',
					cols:[
						{ 
							margin:0,
							rows:[
							{ view:"form", scroll:false, width:200, height:380, elements: [{},fieldset6,{}]},
							{ view:"button", value:"陌生期", height:40 ,disabled:true,	hidden:true},	
						]},
						
						{ 
							margin:0,
							rows:[
							{ view:"form", scroll:false, width:200, height:380, elements: [{},fieldset5,{}] },
							{ view:"button", value:"淡忘期", height:40 ,disabled:true,	hidden:true},
						]},
						
						{ 
							margin:0,
							rows:[
							{ view:"form", scroll:false, width:200, height:380,margin:-15,elements: [fieldset3,fieldset4] },
							{ view:"button", value:"友好期", height:40 ,disabled:true,	hidden:true},							
						]},
						
		                {
		                	margin:0, 
		                	rows:[
		                    { view:"form", scroll:false, width:200, height:380,margin:-15,elements: [fieldset1,fieldset2] },
		                    { view:"button", value:"亲密期", height:40 ,disabled:true,	hidden:true},
		                ]},
	
		                	{ 
							margin:0,
							rows:[
							{ view:"form", scroll:false, width:200, height:380, elements: [{},fieldset0,{}] },
							{ view:"button", value:"消费近度", height:40 ,disabled:true,	hidden:true},
						]},
						{}
					]
				},
			customerinQuad,
//			{}			
			]
		};


	
		function InitQuadInfo(quadInfoObject)
		{
				for(var att in quadInfoObject) 
				{	
					$$(att).setValue(quadInfoObject[att]);
				}
				
				for (var i = 1; i < 7; i++) {				
				//设置计划的客件单价
					$$("Q"+i+"_PlanMoneyPerCustomer").setValue($$("Q"+i+"_CalcMoneyPerCustomer").getValue());		
					$$("Q"+i+"_PlanMoneyTotalCustomer").define('tooltip',"金额占比:"+(100*$$("Q"+i+"_CalcMoneyPercent").getValue())+'%　预计客单:'+ $$("Q"+i+"_CalcMoneyPerCustomer").getValue());
				}
				
				UpdateQuadInfoWithTargetChange(10);
		};
		
		function UpdateQuadInfoWithTargetChange(MonthSaleTarget)
		{//从月度目标出发,计划回购人数
				
				$$("MonthSaleTarget").setValue(MonthSaleTarget);
				for (var i = 1; i < 7; i++) {		
				
				//获得统计的象限销售额占比
					var Qx_CalcMoneyPercent = $$("Q"+i+"_CalcMoneyPercent").getValue();
					if(Qx_CalcMoneyPercent) Qx_CalcMoneyPercent = parseFloat(Qx_CalcMoneyPercent); else Qx_CalcMoneyPercent=0;
					
				//获得计划的客单价
					var Qx_PlanMoneyPerCustomer = $$("Q"+i+"_PlanMoneyPerCustomer").getValue();		
					if(Qx_PlanMoneyPerCustomer) Qx_PlanMoneyPerCustomer = parseInt(Qx_PlanMoneyPerCustomer); else Qx_PlanMoneyPerCustomer=1;

				//计算并设置计划的象限销售
					var Qx_PlanMoneyTotalCustomer = parseInt(MonthSaleTarget*10000*Qx_CalcMoneyPercent)
					$$("Q"+i+"_PlanMoneyTotalCustomer").blockEvent();
					$$("Q"+i+"_PlanMoneyTotalCustomer").setValue(Qx_PlanMoneyTotalCustomer);
					$$("Q"+i+"_PlanMoneyTotalCustomer").unblockEvent();
					
				//计划并设置计划回购人数
					var Qx_PlanBuyPersonCount = new Number(Qx_PlanMoneyTotalCustomer/Qx_PlanMoneyPerCustomer).toFixed(1);
					$$("Q"+i+"_PlanBuyPersonCount").blockEvent();
					$$("Q"+i+"_PlanBuyPersonCount").setValue(Qx_PlanBuyPersonCount);		
					$$("Q"+i+"_PlanBuyPersonCount").unblockEvent();
				}			
		};
		
		function UpdateQuadInfoWithQuandChange()
		{
				var MonthSaleTarget = 0;
		
				for (var i = 1; i < 7; i++) {
					//获得计划的象限销售额
					var Qx_PlanMoneyTotalCustomer = $$("Q"+i+"_PlanMoneyTotalCustomer").getValue();
					if(Qx_PlanMoneyTotalCustomer)	Qx_PlanMoneyTotalCustomer = parseInt(Qx_PlanMoneyTotalCustomer); else Qx_PlanMoneyTotalCustomer=0;
					
					//获得计划的客单价
					var Qx_PlanMoneyPerCustomer = $$("Q"+i+"_PlanMoneyPerCustomer").getValue();
					if(Qx_PlanMoneyPerCustomer)		Qx_PlanMoneyPerCustomer = parseInt(Qx_PlanMoneyPerCustomer); else Qx_PlanMoneyPerCustomer=1;
					
					var Qx_PlanBuyPersonCount = new Number(Qx_PlanMoneyTotalCustomer/Qx_PlanMoneyPerCustomer).toFixed(1)
					$$("Q"+i+"_PlanBuyPersonCount").setValue(Qx_PlanBuyPersonCount);
					
					MonthSaleTarget += Qx_PlanMoneyTotalCustomer;
				}
				
				MonthSaleTarget = parseFloat(MonthSaleTarget/10000).toFixed(1);
				//获得月销售目标
				$$("MonthSaleTarget").blockEvent();
				$$("MonthSaleTarget").setValue(MonthSaleTarget);	
				$$("MonthSaleTarget").unblockEvent();
		};

		function UpdateQuadInfoWithPercentChange(percentValue)
		{//从月度目标出发,计划回购人数
				//获得月度目标
				var percent = (1+parseInt(percentValue)/100);
	
				for (var i = 1; i < 7; i++) {					
				//获得统计客单价
					var Qx_CalcMoneyPerCustomer = $$("Q"+i+"_CalcMoneyPerCustomer").getValue();		
					if(Qx_CalcMoneyPerCustomer) Qx_CalcMoneyPerCustomer = parseFloat(Qx_CalcMoneyPerCustomer); else Qx_CalcMoneyPerCustomer=1;

				//设置计划的客件单价
					$$("Q"+i+"_PlanMoneyPerCustomer").blockEvent();
					$$("Q"+i+"_PlanMoneyPerCustomer").setValue(parseInt(Qx_CalcMoneyPerCustomer*percent));
					$$("Q"+i+"_PlanMoneyPerCustomer").unblockEvent();
					
				}	
				$$("MonthSaleTarget").blockEvent();
				UpdateQuadInfoWithQuandChange();
				$$("MonthSaleTarget").unblockEvent();
		};
	
		function UpdateQuadInfoWithYearMonthChange(deptcode,yearMonth){			
			vipobject.getStoreQuadInfo(deptcode,yearMonth).then(function(response){
				InitQuadInfo(response.json());
			});
		};
	
		

		var layout = form;	
		return {
			$ui:layout,
			
			$fnInvoke:function(deptcode){
				
				var yearMonth = $$("AdjustYearMonth").getValue();
				if(yearMonth)
				{
					UpdateQuadInfoWithYearMonthChange(deptcode,yearMonth);
				}

				//更新店铺会员表
				$$("dt_customerinquad").clearAll();
				$$("dt_customerinquad").parse(vipobject.getVIPList(2,{BelongStoreCode:deptcode}));
			},
			
			$oninit:function(){
				webix.dp.$$("dt_customerinquad").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
						
				$$("AdjustYearMonth").attachEvent("onChange",function(yearmonth){
					var item = $$("lt_inviteplanlist").getSelectedItem();
					if(item)
					{
						UpdateQuadInfoWithYearMonthChange(item.deptcode,yearmonth);
					}
					else
					{
						webix.message("请选择店铺");
					}
				});
				
				$$("AdjustPercent").attachEvent("onChange",function(newvalue){
					UpdateQuadInfoWithPercentChange(newvalue);
				});
				
				$$("MonthSaleTarget").attachEvent('onChange',function(newvalue){
							UpdateQuadInfoWithTargetChange(newvalue);
					});
				
				for (var i = 1; i < 7; i++) {
						$$("Q"+i+"_PlanMoneyTotalCustomer").attachEvent('onChange',function(){
							UpdateQuadInfoWithQuandChange();
						});
						$$("Q"+i+"_PlanMoneyPerCustomer").attachEvent('onChange',function(){
							UpdateQuadInfoWithQuandChange();
						});
						
						$$("Q"+i+"_PlanBuyPersonCount").attachEvent('onItemClick',function(id){
							$$("dt_customerinquad").filter("#anzbuyhabitquad#","第"+($$(id).config.id.substr(1,1))+"象限");
						});
					}
				
		
			}
		}
			
});