define(function(){
	
	return {
		$oninit:function(){
			webix.dp.$$("dt_staffsubcriber").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix});			
							
			webix.dp("dt_staffsubcriber").attachEvent("onAfterInsert",
			function(response, id, object){
				$$("dt_staffsubcriber").blockEvent();
				$$("dt_staffsubcriber").getItem(id)._identify = response;
				$$("dt_staffsubcriber").unblockEvent();
				
				$$("dt_staffsubcriber").refresh();
			});
		},
		$ui:{
			id:"staffSubcriberView",
			padding: 0,
			margin: 5,
			type:"wide",
			cols:[
				{
					view: "grouplist",
//					id: "lt_stafflist",
					width:200,
					select:true,
					url:urlstr+"/WBStaffMng/getAllStaffs/IsOnJob/1/DSSuffix/"+_DSSuffix,
					templateGroup:"#value#<br> Results:#$count#",
					templateBack: "#value#<br> Results:#$count#",
				    templateItem:"#staffcode#- #staffname#<div class='marker  status#isonjob#' style='width:50px;'>&nbsp;</div>",
				    scheme:{$group:function(obj){return obj.deptsname; },}, 
					drag:"source",
					on:{
					onBeforeDrag:function(context, ev){//做数据校验
					    var lt_stafflist = $$("lt_stafflist");
						var item_subcriber = lt_stafflist.getSelectedItem();												
						if(lt_stafflist.getOpenState().parents.length===0 || !item_subcriber || !item_subcriber['staffcode'])
						{
							webix.message("请选择员工");
							return false;
						}
							
//						console.log(context);
						var dragItem = this.getItem(context.start);
						
//						console.log(dragItem['staffcode']);

						var duplicated = $$("dt_staffsubcriber").find(function(obj){
							return obj.staffcode === dragItem['staffcode']; 
						});
						if(duplicated.length) 
						{
							webix.message("本记录已经存在");
							return false;
						}
						
					    return true;         
					}
				},
				},
			{view:"resizer"},
			{
					id:"dt_staffsubcriber",
					view:"datatable",
					editable:true,
					headerRowHeight:35,
					dragColumn:true,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},					
					save:urlstr+"/WBCURDMng/saveStaffSubcriber",
					columns:[
					    {id:"deletebutton3", header:"&nbsp;",hidden:false, width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"},
						{ id:"_identify",	header:"#", fillspace:0.5,hidden:true},
						{ id:"isonjob",  header:"在职",template:"{common.checkbox()}",width:60},
						{ id:"staffcode", header:"员工编号", fillspace:1.5},
						{ id:"staffname",header:"员工姓名" ,  fillspace:1.5},
						{ id:"isgetyscores", template:"{common.checkbox()}", header:"订阅Y分", fillspace:1},
						{ id:"yscoreslimit",  editor:"text",	header:"Y分门限", fillspace:1},
						{ id:"isgettscores",  template:"{common.checkbox()}",	header:"订阅T分", fillspace:1},
						{ id:"tscoreslimit",  editor:"text",	header:"T分门限", fillspace:1}
					],
//					maxheight:550,
					rowHeight:40,
					select:"row",
					drag:"target",
					externalData:function (data, id){
						var item_subcriber = $$("lt_stafflist").getSelectedItem();							
						data['subcribercode'] = item_subcriber['staffcode'];
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
									webix.$$("dt_staffsubcriber").remove(id);
								}
							}
						});
					}
					},
				},
//				{}
			]

		}
	}
});