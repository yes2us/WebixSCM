define(function(){

	var form = {
		view: "form",
		id: "staffBasicInfo",
		elementsConfig:{
			labelWidth: 130
		},
		scroll: true,
		elements:[
			{cols:[
				{
					rows:[
						{view: "text", name: "staffcode", label: "员工编号"},
						{view: "text", name: "staffname", label: "员工姓名"},
						{view: "text", name: "idcardno", label: "身份证号"},
						{view: "text", name: "mobileno", label: "手机号"},
						{ view:"datepicker", name:"birthday", label:"生日", stringResult:true, format:"%Y-%m-%d"},
						{ view:"select", name:"wagelevel", label:"工资方案", 
						  options:[{id:1,value:"导购方案"},{id:2,value:"店长方案"},{id:3,value:"督导方案"},{id:4,value:"经理方案"}]},
						{ view:"select", name:"belongdeptcode", id:"belongdeptcode",label:"所属部门", 
						 options:urlstr+"/WBDeptMng/getDeptSNameList/DSSuffix/"+_DSSuffix,
						 on:{
						 	onChange:function(newv,oldv){
						 		if(newv)
						 		{
						 			webix.ajax().post(urlstr+"/WBStaffMng/getStaffAuditorList",{DeptCode:newv,DSSuffix:_DSSuffix},function(response){
									  $$("defaultauditor").define("options",JSON.parse(response));
									  $$('defaultauditor').refresh();
								});
						 		}
						 	}
						 }
						},

						{ view:"select", name:"defaultauditor", id:"defaultauditor",label:"审核人", 
						 options:[]},
						 
						{ view:"checkbox", name:"isonjob", label:"是否在职", value:1},
						{ view:"checkbox", name:"isresetpwd", label:"重设密码", value:false},
						{ view:"text", name:"picturepath", id:'picturepath',label:"图片", hidden:true,
						on:{onChange:function(newv,oldv){
//									newv = newv? newv:localhost+"/WebixPOA/data/imgs/nophoto.jpg";
									if(!newv)
									{
										newv = localhost+"/data/imgs/nophoto.jpg";
										$$("photoblockid").setHTML("<img src='"+newv+"' height='100%'/>");
									}
									else
									{
										webix.ajax().post(urlstr+"/WBUpLoadFile/getFilePath",{KeyId:newv,DSSuffix:_DSSuffix},function(response)
										{
												$$("photoblockid").setHTML("<img src='"+response+"' height='100%'/>");
										});
									}

						}}
						},
				]},
				{rows:[
				{
				 view:"template",
				  id:"photoblockid",
				  name:"picturepath",
				  align:'center', 
				  width:500, 
				  height:500,
				  borderless:false
				},
				{
					view:"uploader",
					multiple:false,
					id: "uploaderid",
				  	name:"uploader", 
				  	value:"上传图片",
//				  	link:"mylist",
				  	upload:urlstr+"/WBUpLoadFile/uploadPersonPhoto",
				  	on:{
				  		onFileUpload:function(item){
				  			$$("picturepath").setValue(item.fullsname);
				  		}
				  	}
				  },
//				{view:"list",  id:"mylist", type:"uploader",	autoheight:true, borderless:true}
				]},
			]}
			,{}
		]
	};

	var layout = {
				view: "form",
				id: "staffBasicView",
				type:"clean",

					rows:[
							 form,
							{
									css: "highlighted_header header6",
									paddingX:5,
									paddingY:5,
									cols:[
											{ view: "button", type: "form", icon: "plus", label: "保存", width: 90,
											click:function(){
														var selid = $$("lt_stafflist").getSelectedId();
														var item = $$("lt_stafflist").getSelectedItem();
														var values = $$("staffBasicInfo").getValues();
														for(var att in values)
														{
															item[att] = values[att];
														}
														$$("lt_stafflist").updateItem(selid, item);
														webix.message('保存成功');
													}},
											{ view: "button", css: "button0", icon: "times", label: "删除", width: 90,
														click:function(){
														webix.confirm({text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
															callback:function(res){
															if(res){$$("lt_stafflist").remove($$("lt_stafflist").getSelectedId());}}});										
											}},
											{}
											]
							}
					]
		};

	return {
		$ui:layout,
	};
	

});