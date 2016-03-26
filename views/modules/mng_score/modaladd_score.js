define(function(){
	var recordtype = "Y分";
	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-score", position:"center",
			head:"增加奖扣记录",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"score-form", 
				elements:[
				   { view:"segmented", value:"yscore", align:"center", inputWidth:500, options:[
						{ id:"yscore", value:"Y分" },
						{ id:"atvalue", value:"实绩"},
						{ id:"vtvalue", value:"虚绩"}
					],click:function(){

						if(this.getValue()=='yscore')
						{
							recordtype = "Y分";
							$$("yscore").show();
							
							$$("tvalue").hide();
							$$("tscore").hide();
							$$("tpartner").hide();
							$$("saleqty").hide();
						}
						else  if(this.getValue()=='atvalue')
						{
							recordtype = "实绩";
							$$("yscore").hide();
							
							$$("tvalue").show();
							$$("tscore").show();
							$$("tpartner").show();
							$$("saleqty").show();
						}
						else
						{
							recordtype = "虚绩";
							$$("yscore").hide();
							
							$$("tvalue").show();
							$$("tscore").hide();
							$$("tpartner").hide();
							$$("saleqty").hide();
						}
					}},
					{ view:"fieldset", label:"事件信息", body:{
				    	rows:[
				    	{ view:"segmented",id:"eventscope",value:"ES001", align:"center",label:'事件范围', inputWidth:500, 
				    	options:[
				    	{ id:"ES002", value:"流程内" },
						{ id:"ES003", value:"流程外"},
						{ id:"ES001", value:"固定分"}],
						on:{
								
							onChange:function(newval,oldval){
								webix.ajax().post(urlstr+"/WBEventMng/getTypeSelectList",{EventScopeCode:newval,DSSuffix:_DSSuffix},function(response){
									$$("eventtype").define('options',JSON.parse(response));
									$$("eventtype").refresh();
								});
								
			
//								webix.ajax().post(urlstr+"/WBStaffMng/getStaffSelectList",{RelType:"部门员工",DSSuffix:_DSSuffix},function(response){
//									 $$("staffcode").define("options",JSON.parse(response));
//									 $$('staffcode').refresh();
//								});

//								webix.ajax().post(urlstr+"/WBStaffMng/getStaffSelectList",{RelType:"审核人",DSSuffix:_DSSuffix},function(response){
//									  $$("auditor").define("options",JSON.parse(response));
//									  $$('auditor').refresh();
//								});
								
//								$$('auditor').define('options',JSON.parse('['+webix.storage.local.get('_Auditor')+']'));
//								$$('auditor').refresh();	 

			
							 }
						}
						},
						{ view:"combo", name:"eventtype", label:"事件类型", options:[], id:"eventtype", 
						required:true, width:500,
						on:{							
							onChange:function(newval,oldval){
								webix.ajax().post(urlstr+"/WBEventMng/getEventSelectName",{EventTypeCode:newval,DSSuffix:_DSSuffix},function(response){
									$$("eventcode").define('options',JSON.parse(response));
									$$("eventcode").refresh();
								});
							 }
						}},
						{ view:"combo", name:"eventcode", label:"事件内容", id:"eventcode", options:[], required:true, width:500},
					]
					}},
					

					{ view:"fieldset", label:"奖扣信息", body:{
						rows:[					
						{ view:"text", name:"yscore", id:"yscore", label:"Y分",width:500},
						{ view:"text", name:"tvalue", id:"tvalue", label:"业绩", width:500,hidden:true},
						{ view:"text", name:"tscore", id:"tscore", label:"T分",width:500,hidden:true},
						{ view:"text", name:"tpartner", id:"tpartner", label:"主要搭档",  width:500,hidden:true},
						{ view:"text", name:"saleqty", id:"saleqty", label:"客单件", width:500,hidden:true}
					]
					},
					rules:{
			                yscore: webix.rules.isNumber,
			                tvalue: webix.rules.isNumber,
			                tscore: webix.rules.isNumber,
			                saleqty: webix.rules.isNumber
			           }
					},
					
					{ view:"fieldset", label:"记录信息", body:{
						rows:[	
						{ view:"datepicker", name:"recordtime", label:"记录日期", id:"recordtime",value:new Date(), stringResult:true, format:"%Y-%m-%d", required:true,width:500},
						{ view:"select", name:"staffcode", label:"申请人", id:"staffcode", options:[{id:_UserCode,value:_UserName}],required:true,width:500},
						{ view:"select", name:"auditor", label:"审核人", id:"auditor", 
						options:urlstr+"/WBStaffMng/getStaffAuditorList/DSSuffix/"+_DSSuffix+"/DeptCode/"+_BelongDeptCode,
						required:true,width:500}
						]
					}},
					
					{ view:"textarea",name:'eventremark', id:'eventremark',  height:120, label:"备注", labelPosition:"top",width:500},

					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								var values = this.getFormView().getValues();
								values.recordtype = recordtype;
								values.auditstate = "待审核";
								values.auditvalue = 2;
								$$("dt_scorerecord").add(values);
								
//								console.log(values);
//								webix.storage.local.put('_Auditor',JSON.stringify({id:$$('auditor').getValue(),value:$$('auditor').getText()}));
								
								webix.message('保存成功!');
//								webix.$$("modaladd-score").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-score").close();
							}}
						]
					}

				]
			}
		}
	};

});