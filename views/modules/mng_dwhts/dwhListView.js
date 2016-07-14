define(
[],
function(){
	var _UserCode = webix.storage.local.get('_UserCode');

	return {
		$ui:{
			width:_ListWidth,
			type: "clean",
			css: "highlighted_header header5",
			header:"分仓列表",
			body:{
			rows:[	
				{					
					view: "list",
					id: "lt_dwhs",
					select: true,
					navigation:true,
				    template:"#id# - #value#",
				    url:urlstr+'/WBPartyMng/getRegionList',
					scheme:{
					$init:function(obj){
					}
				}
				}
			]
			}
		}
	}
});