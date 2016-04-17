define(["data/moduleobject"],function(moduleobject){
	
	return {
		$oninit:function(){
			var _UserObject = webix.storage.local.get('UserObject');
			if(_UserObject)
			{
			_UserObject = JSON.parse(_UserObject);
			_UserCode = _UserObject['MyBasic'][0]['usercode'];
			_UserName = _UserObject['MyBasic'][0]['usertruename'];
			
			$$("sysmenu").clearAll();
			$$("sysmenu").load(urlstr+"/WBModuleMng/getMyMenuTree/UserCode/"+_UserCode);
			}
		},
		$ui:{
			maxWidth: 70,
//			rows:[
//				{
//					view: "tree",
					view:"sidebar",
					id: "sysmenu",
//					type: "menuTree2",
//					css: "menu",
					activeTitle: true,
					select: true,
					tooltip: {
						template: function(obj){
							return obj.$count?"":obj.details;
						}
					},
					on:{
						onBeforeSelect:function(id){
							if(this.getItem(id).$count){
//								debugger;
								return false;
							}
							
						},
						onAfterSelect:function(id){
							this.$scope.show("./"+id);
						}
					}
				}
//			]
//		}
	};

});
