define([
	"data/roleobject",
	'data/moduleobject'
	],
function(roleobject,moduleobject){
	
	checkauthorization(false);
	
    var modulelist;
    var selrolename;
    
	var grid_role = {
		rows:[
		    		{
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:5,
							paddingY:5,
							height:35,
							cols:[
								{
									"template": "<span class='webix_icon fa-adjust'></span>角色列表", "css": "sub_title2", borderless: true
								},
							]
				},
			{
				view:"datatable", 
				id:"dt_role",
				maxHeight:250,
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
				headermenu:{width:250,autoheight:false,scroll:true},
				resizeColumn:true,
				editable:false,
				select:"row",
				columns:[
					{id:"roleenabled", header:"启用", template:"{common.checkbox()}", sort:"string",fillspace:1,enabled:false},
					{id:"rolename", header:"角色", sort:"string",fillspace:1},
					{id:"roletype", header:"类型", editor:"text", sort:"string",fillspace:1},
					{id:"roledesc", header:"描述", editor:"text", sort:"string",fillspace:1},
				],
				on: {
					onSelectChange:function(){
						$$("tree").define("disabled",false);
						
						var selRow = this.getSelectedItem();
						if(selRow){
						selrolename = selRow.rolename;
						var premzRolePrevData = roleobject.getRolePrevilege(selRow.rolename);
						premzRolePrevData.then(function(response){
							var jsondata = response.json();
								$$("dt_roleprevilege").clearAll();
								$$("dt_roleprevilege").parse(jsondata);
								
								jsondata.forEach(function(item){
									$$("tree").checkItem(item.moduleid);
								});
						});
						}
					}
				}
			}
		]

	};

var grid_module={
	maxWidth:200,
	rows:[
		    		{
							view: "toolbar",
							css: "highlighted_header header4",
							paddingX:5,
							paddingY:5,
							height:35,
							cols:[
								{
									"template": "<span class='webix_icon fa-adjust'></span>模块列表", "css": "sub_title2", borderless: true
								},
							]
				},
				
				{
					view:"tree",
					id:"tree",
					template:"{common.icon()} {common.checkbox()} {common.folder()} #value#",
					threeState: false,
					disabled:true,
					url:urlstr+"/WBModuleMng/getModuleTree",
					on:{
						onItemCheck:function(id){
							if(!selrolename)  return;
							
							var isChecked = $$("tree").isChecked(id);						
							if(!isChecked){
								var arr = $$("dt_roleprevilege").find(function(row){
										return row.moduleid == id;
									});
									
									if(arr.length) $$("dt_roleprevilege").remove(arr[0].id);
								return;
							}
							
							moduleList.forEach(function(item){
								if(item.moduleid==id)
								{
									var arr = $$("dt_roleprevilege").find(function(row){
										return row.moduleid == id;
									});
									
									if(!arr.length)
									$$("dt_roleprevilege").add({
										rolename:selrolename,
										moduleid:id,
										modulename:item.modulename,
										moduledesc:item.moduledesc
									});
								}
							});
						},
					}
				}

			]
};

var grid_rolepreviledge ={
	 view:"datatable",
	 id:"dt_roleprevilege",
	rowHeight:_RowHeight,
	headerRowHeight:_HeaderRowHeight,
	headermenu:{width:250,autoheight:false,scroll:true},
	resizeColumn:true,
	editable:true,
	select:"row",
	save:urlstr+"/WBCURDMng/savePrevilege",
	 columns:[
						{id:"_identify",header:"",hidden:true,width:30},
//					    {id:"rolename",header:"角色",width:150},
					    {id:"modulelevel",header:"模块级别",width:90},
					    {id:"moduleid",header:"模块ID",width:150},
					    {id:"modulename",header:"模块名称",width:200},
					    	{id:"moduledesc",header:"模块描述",width:200},
					    {id:"open",header:"展示状态",width:100,template:"{common.checkbox()}"},
					    {id:"operation",header:"操作",width:100,editor:"select",
					    options:[{id:"r",value:"读"},{id:"rw",value:"读写"}]},
	 ],
}


	var layout = {
		type: "clean",
		cols:[grid_module,{view:"resizer"},
		{rows:[grid_role,{view:"resizer"},grid_rolepreviledge]}]

	};


	return {
		$ui: layout,
		$oninit:function(){
			$$("dt_role").clearAll();
			$$("dt_role").parse(roleobject.getRoleList());
			
			moduleobject.getModuleList().then(function(response){
				moduleList = response.json();
			});
//			
//			$$("tt_module").clearAll();
//			$$("tt_module").parse(moduleobject.getModuleList());
			//			$$("dt_party").parse(partyobject.getSysPara());
//			webix.dp.$$("dt_party").attachEvent('onBeforeDataSend', function(obj){obj.data.DSSuffix = _DSSuffix;});

		}
	};

});