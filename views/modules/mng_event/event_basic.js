define(["views/modules/mng_event/event_event"],
	function(events){

var footer = {
									css: "highlighted_header header6",
									paddingX:5,
									paddingY:5,									
									cols:[
										{ view: "button", type: "form", icon: "plus", label: "保存", width: 90,
											click:function(){
											var selid = $$("dt_events").getSelectedId();
											var item = $$("dt_events").getSelectedItem();
											var values = $$("eventBasicInfo").getValues();
	
											for(var att in values) 	item[att] = values[att];
											$$("dt_events").updateItem(selid, item);
											
											webix.message('保存成功');
										}},
										{ view: "button", css: "button0", icon: "times", label: "删除", width: 90,
											click:function(){
											webix.confirm({text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
												callback:function(res){
												if(res){$$("dt_events").remove($$("dt_events").getSelectedId());}}});										
										}},
										{},
									]
							};
							
	var form = {
		view: "form",
		id: "eventBasicInfo",
		type:"clean",
		elementsConfig:{
			labelWidth: 130
		},
		scroll: true,
		elements:[
			{
				cols:[
				events,
				{view:"resizer"},
				{  
					margin:10,
					type:"wide",
					width:500,
					rows:[
					{ view:"text", name:"eventcode",label:"事件编号", id:"eventcode",disabled:true},
					{ view:"select", name:"eventscopecode", label:"事件范围", id:"eventscopecode",  required:true,
					 options:urlstr+"/WBEventMng/getScopeSelectList/DSSuffix/"+_DSSuffix,
					on:{
						  onChange:function(newval,oldval){
							webix.ajax().post(urlstr+"/WBEventMng/getTypeSelectList",{EventScopeCode:newval,DSSuffix:_DSSuffix},function(response){
								$$("eventtypecode").define('options',JSON.parse(response));
								$$("eventtypecode").refresh();
							});
						}
					}
					},
					
					{ view:"select", name:"eventtypecode", label:"事件类型", id:"eventtypecode", options:[]},
					{ view:"text", name:"event", label:"事件内容", id:"event"},
					{ view:"text", name:"yscore", label:"给予Y分", id:"yscore"},
					{ view:"text", name:"xscore", label:"给予X分", id:"xscore"},
					{ view:"select", name:"deliveryway", label:"得分方式", id:"deliveryway", 
					options:[{id:1,value:'申请分数'},{id:2,value:'下达分数'},{id:3,value:'申请或下达'}]},
					{ view:"text", name:"eventorder", label:"事件次序", id:"eventorder"},
					{ view:"checkbox", name:"eventenabled", label:"是否启用", value:1},
					{ view:"textarea",name:"remark", id:'remark', height:200, label:"备注", labelPosition:"top"},
					{},
					footer
				]
			}]}
		]
	};


							
	var layout = {
				view: "form",
				id: "eventBasicView",
				type:"clean",

				rows:[ form]
		};

	return {
		$ui:layout
	};
	

});