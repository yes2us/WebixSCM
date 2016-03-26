define(function(){
	    var tr_InOutProcessEvent = {
            view:"unitlist",
            id:"tr_InOutProcessEvent",
            width:200,
            select:true,
            template:"#event#",
            url:urlstr+"/WBDeptMng/getDeptEvents/ShowType/AllEvent/DSSuffix/"+_DSSuffix,
			drag:"source",
			uniteBy:function(obj){return obj.eventtype;},
			scheme:{
                    $sort:{
                        by:"eventtype",
                        dir:"asc"
                    }
                },
			on:{
					onBeforeDrag:function(context, ev){//做数据校验
						var item_dept = $$("lt_deptlist").getSelectedItem();												
						if(!item_dept || !item_dept['deptcode'])
						{
							webix.message("请选择部门");
							return false;
						}
						
							
						var dragItem = this.getItem(context.start);
						var duplicated = $$("dt_deptevent").find(function(obj){
							return obj.eventcode === dragItem['eventcode']; 
						});
						if(duplicated.length) 
						{
							webix.message("本记录已经存在");
							return false;
						}
						
					    return true;         
					}
				},
       };

	return {
		$oninit:function(){
			webix.dp.$$("dt_deptevent").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});
			
			webix.dp("dt_deptevent").attachEvent("onAfterInsert",
			function(response, id, object){
				$$("dt_deptevent").getItem(id)._identify = response;
				$$("dt_deptevent").refresh();
			});
		},
		$ui:{
			id:"deptEventView",
			padding: 0,
			margin: 5,
			cols:[
			tr_InOutProcessEvent,
			{view:"resizer"},
			{
				rows:[{
					id:"dt_deptevent",
					view:"datatable",
					editable:false,
					headerRowHeight:35,
					select:true,
				dragColumn:true,
				headermenu:{
				    width:250,
				    autoheight:false,
				    scroll:true
				},
					save:urlstr+"/WBCURDMng/saveDeptEvent",
					columns:[
						{id:"deletebutton3", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"_identify",	header:"#", fillspace:0.5},
						{ id:"iskeyevent", header:"关键",template:"{common.checkbox()}",fillspace:0.5},
						{ id:"deliveryway", header:["奖扣方式",{content:"selectFilter"}]},
						{ id:"deptcode", header:"部门编号",fillspace:0.7,hidden:true},												
						{ id:"eventcode", header:"事件编号",fillspace:0.7,hidden:true},
						{ id:"eventscope",header:["事件范围",{content:"selectFilter"}]},
						{ id:"eventtype",header:["事件类型",{content:"selectFilter"}]},
						{ id:"event",header:"事件内容", fillspace:2.5},
					],
					rowHeight:40,
					select:"row",
					drag:"target",
					
					externalData:function (data, id){
						var item_dept = $$("lt_deptlist").getSelectedItem();							
						data['deptcode'] = item_dept['deptcode'];
	                	return data;
       				},
		       		on:{
					    onBeforeDrop:function(context, e){
						    for (var i=0; i< context.source.length; i++){//复制数据,使原数据不被删除
						        context.from.copy(context.source[i],context.start,this,webix.uid());
						    }
						    return false;
					    }
					},

					onClick:{
					webix_icon:function(e,id,node){
						webix.confirm({
							text:"你将删除本条记录.<br/>确定吗?", ok:"确定", cancel:"取消",
							callback:function(res){
								if(res){
									webix.$$("dt_deptevent").remove(id);
								}
							}
						});
					}},
					pager:"event_pagerA",
				},
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:5,
						paddingY:5,
						height:40,
						cols:[{
							view:"pager", id:"event_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 35,
							group:5
						}]
					}]},
//				{}
			]

		}
	}
});