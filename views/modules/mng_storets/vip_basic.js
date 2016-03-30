define(["data/vipobject"], function(vipobject){

	var form = {
		view: "form",
		type:"clean",
		id:"vipbasicinfo",
		paddingX:25,
		paddingY:25,
		elementsConfig:{
			labelWidth: 100
		},
		scroll: true,
		elements:[
			{	
				margin:10,
				cols:[
				{rows:[
								{ template:"基本信息", type:"section"},
								{cols:[{view: "text", id:"customername",name: "customername", label: "姓名"},
								{view: "text", id:"customercode",name: "customercode", label: "会员编号",disabled:true}]},
								{cols:[
								{view: "select", id:"bodyshape", name: "bodyshape", label: "体型",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/bodyshape/DSSuffix/'+_DSSuffix},
								{view: "multiselect",id:"careen",name: "careen", label: "职业",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/careen/DSSuffix/'+_DSSuffix}
								]},
								
								{view: "multiselect", id:"characters",name: "characters", label: "性格",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/characters/DSSuffix/'+_DSSuffix},
								{view: "multiselect", id:"dressstyle",name: "dressstyle", label: "透露风格",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/dressstyle/DSSuffix/'+_DSSuffix},
								
								{cols:[
									{view: "text", id:"mobileno",name: "mobileno", label: "手机号"},
								{view: "text", id:"email",name: "email", label: "email"}]},
								{cols:[{view: "text", id:"qq",name: "qq", label: "QQ"},
								{view: "text", id:"wechart",name: "wechart", label: "微信"}]},
								{view: "text", id:"address",name: "address", label: "通信地址"},
								{cols:[{view: "checkbox", id:"isreserved",name: "isreserved", label: "是否保留"},
									{view: "text", id:"maintainername",name: "maintainername",label: "维护人",disabled:true}]},
								{ view:"text",id:"picturepath", name:"picturepath",label:"照片地址",disabled:true,hidden:true,
								on:{
									onChange:function(newv,oldv){
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
									}
								}
								},
				]},
				{
					rows:[
								{template:"会员照片", type:"section"},
								{
								 view:"template",
								  id:"photoblockid",
								  name:"picturepath",
								  align:'center', 
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
					]
				}
			]
		 },
			
			{	
				margin:10,
				cols:[
				{rows:[
								{template:"重要日期", type:"section"},
								{ view:"datepicker",id:"anzlastbuydate", name:"anzlastbuydate", label:"上次购买", stringResult:true, format:"%Y-%m-%d",disabled:true},
								{ view:"datepicker",id:"ntcontdate", name:"ntcontdate", label:"下次联系", stringResult:true, format:"%Y-%m-%d",disabled:true},
								{ view:"datepicker",id:"devdate", name:"devdate", label:"开发日期", stringResult:true, format:"%Y-%m-%d"},
								{ view:"datepicker", id:"birthday",name:"birthday", label:"会员生日", stringResult:true, format:"%Y-%m-%d"},
								{ view:"datepicker", id:"matebirthday",name:"matebirthday", label:"配偶生日", stringResult:true, format:"%Y-%m-%d"},
								{ view:"datepicker", id:"childbirthday",name:"childbirthday", label:"孩子生日", stringResult:true, format:"%Y-%m-%d"},
								{ view:"datepicker", id:"weddingannidate",name:"weddingannidate", label:"纪念日", stringResult:true, format:"%Y-%m-%d"},
								{view: "text", id:"weddinganniremark",name: "weddinganniremark", label: "纪念日备注"},
				]},
				{
					rows:[
						{ template:"会员偏好", type:"section"},
						{ view:"multiselect", id:"prefcontway",name:"prefcontway", label:"联系方式",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/prefcontway/DSSuffix/'+_DSSuffix},
						{ view:"multiselect", id:"prefconttime",name:"prefconttime", label:"联系时间",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/prefconttime/DSSuffix/'+_DSSuffix},
						{ view:"multiselect", id:"prefsize",name:"prefsize", label:"适用尺码",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/prefsize/DSSuffix/'+_DSSuffix},
								
						{ view:"multiselect", id:"interest",name:"interest", label:"兴趣爱好",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/interest/DSSuffix/'+_DSSuffix},
						{ view:"multiselect", id:"prefcolor",name:"prefcolor", label:"喜欢颜色",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/prefcolor/DSSuffix/'+_DSSuffix},
						{ view:"multiselect", id:"prefstyle",name:"prefstyle", label:"喜欢风格",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/prefstyle/DSSuffix/'+_DSSuffix},
								
						{ view:"multiselect", id:"prefbuysites",name:"prefbuysites", label:"购物商圈",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/prefbuysites/DSSuffix/'+_DSSuffix},
						{view: "multiselect", id:"buyreasons",name: "buyreasons", label: "购买原因",
								options:urlstr+'/WBVIPMng/getGlobalVIPParameters/paraname/buyreasons/DSSuffix/'+_DSSuffix},
					]
				}
			]
		 }
		]
	};

	var layout = {
				view: "form",
				id: "vipBasicView",
				type:"clean",

					rows:[
							 form,
							 {			
									view: "form",
									id:"saveanddelete",
									css: "highlighted_header header6",
									paddingX:5,
									paddingY:5,	
									cols:[
												{ view: "button", type: "form", icon: "plus", label: "保存", width: 90,
												click:function(){												
													var values = $$('vipbasicinfo').getValues();
													values.webix_operation = 'update';
//													 console.log(values);
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
		$fnInvoke: function(vipcode){

			$$("vipbasicinfo").clear();
			$$("vipbasicinfo").refresh();
			$$("vipbasicinfo").parse(vipobject.getSingleVIPBasicDetail(vipcode));
			
		}
	};
	

});