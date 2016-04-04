define(
["data/storeobject"],
function(storeobject){
	return {
		$ui:{
			width:260,
			type: "clean",
			css: "highlighted_header header5",
			header:"分仓列表",
			body:{
			rows:[	
				{					
					view: "list",
					id: "lt_dwhs",
					select: true,
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