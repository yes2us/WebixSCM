define(
[],
function(){
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
					id: "lt_RetProd_Regions",
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