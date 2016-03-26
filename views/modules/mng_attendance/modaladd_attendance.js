define(function(){
	var attendancetype = "加班";
	return {
		$ui:{
			view:"window", modal:true, id:"modaladd-attendance", position:"center",
			head:"增加考勤记录",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"attendance-form", 
				elements:[
					{ view:"fieldset", label:"员工信息", body:{
						rows:[
								   { view:"select", name:"belongdeptcode", label:"所属部门", id:"belongdeptcode", width:500, 
								   options:urlstr+"/WBDeptMng/getDeptSNameList/ScoreMngEnabled/1/DSSuffix/"+_DSSuffix,
								   on:
								   {
								   	  onChange:function(newval,oldval){
								   	  	
									    webix.ajax().post(urlstr+"/WBStaffMng/getStaffSelectList",
									    {DeptCode:newval,RelType:"部门员工",DSSuffix:_DSSuffix},function(response){
									    	$$("staffcode").define("options",JSON.parse(response));
									    	$$('staffcode').refresh();
									    });

									    webix.ajax().post(urlstr+"/WBStaffMng/getStaffSelectList",
									    {DeptCode:newval,RelType:"审核人",DSSuffix:_DSSuffix},function(response){
									    	$$("auditorcode").define("options",JSON.parse(response));
									    	$$('auditorcode').refresh();
									    });

								   	  }
								   }},
								  { view:"select", name:"staffcode",label:"员工姓名", required:true, options:[], id:"staffcode",width:500}
								  ]
					}},

					{ view:"fieldset", label:"考勤内容", body:{
						rows:[
							{ view:"segmented", value:"sgm_overtime", align:"center", inputWidth:500, options:[
							{ id:"sgm_overtime", value:"加班" },
							{ id:"sgm_dayoff", value:"请假"},
							{ id:"sgm_absent", value:"旷工"}
						],click:function(){
							if(this.getValue()=='sgm_overtime')
						{
							attendancetype = "加班",
							$$("overtimehours").show();
							$$("absentdays").hide();
							$$("offdays").hide();
						}
						else  if(this.getValue()=='sgm_dayoff')
						{
							attendancetype = "请假",
							$$("overtimehours").hide();
							$$("absentdays").hide();
							$$("offdays").show();
						}
						else
						{
							attendancetype = "旷工",
							$$("overtimehours").hide();
							$$("absentdays").show();
							$$("offdays").hide();
						}
						}},
						
						{ view:"counter", name:"overtimehours", id:"overtimehours",step:1,value:0,label:"加班小时",labelWidth:400},
						{ view:"counter", name:"absentdays", id:"absentdays",step:0.5,value:0,label:"旷工天数",labelWidth:400,hidden:true},
						{ view:"counter", name:"offdays", id:"offdays",step:0.5,value:0, label:"请假天数",labelWidth:400 ,hidden:true}
					]
					}},
					
					{ view:"fieldset", label:"记录信息", body:{
						rows:[	
						{ view:"datepicker", name:"recordtime", label:"记录日期", id:"recordtime", required:true,value:new Date(), stringResult:true, format:"%Y-%m-%d",width:500},
						{ view:"select", name:"auditorcode", label:"审核人", id:"auditorcode",  required:true,options:[],width:500}
						]
					}},
					
					{ view:"textarea",name:'remark', id:'remark',  height:80, label:"备注", labelPosition:"top",width:500},

					{
						margin:10,
						cols:[
							{},
							{ view:"button", label:"增加", type:"form", align:"center", width:120, click:function(){
								if(!this.getFormView().validate()) {webix.message("请填充带红色*的内容");return;}
								
								var values = this.getFormView().getValues();
								values.attendancetype = attendancetype;
								values.auditstate = "待审核";
								values.auditvalue = 2;
							
								$$("dt_attendacerecord").add(values);
								
								webix.message('保存成功!');
								webix.$$("modaladd-attendance").close();
							}},
							{ view:"button", label:"取消",align:"center", width:120, click:function(){
								webix.$$("modaladd-attendance").close();
							}}
						]
					}

				]
			}
		}
	};

});