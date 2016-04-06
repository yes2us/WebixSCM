define([],
function(){

	return {
		$ui:{
			width:_ListWidth,
			type: "clean",
			css: "highlighted_header header5",
			header:"总仓列表",
			body:{
			rows:[	
				{					
					view: "list",
					id: "lt_cwhs",
					select: true,
				    template:"#id# - #value#",
				    url:urlstr+'/WBPartyMng/getCWHList',
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