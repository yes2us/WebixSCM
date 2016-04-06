define(
["data/partyobject"],
function(partyobject){
	var _UserCode = webix.storage.local.get('_UserCode');
    var regionCode;
    
	return {
		getRegionCode:function(){return regionCode;},
		$ui:{
			width:_ListWidth,
			type: "clean",
			css: "highlighted_header header5",
			header:"店铺列表",
			body:{
			rows:[
			 {
                view:"toolbar",
                elements:[
					{rows:[
								{view: "combo",label: "选择区域",//css:"fltr",
									options:urlstr+'/WBPartyMng/getRegionList',
									on:{
										onChange:function(newregioncode, oldregioncode){
											regionCode = newregioncode;
											if(newregioncode!=oldregioncode)
											{
												 $$("lt_refrstores").clearAll();
												 $$("lt_refrstores").refresh();
											}
											var postData = 
											{
												RegionCode:newregioncode,
												FieldStr:"PartyCode,PartyName"
											}
											$$("lt_refrstores").parse(partyobject.getRelPartyList(postData));
										}
									}},
									
					                {view:"text", id:"grouplist_input",label:"查询门店",placeholder:"请输入门店编号，名称进行查询",
					                  on:{onTimedKeyPress:function(){
					                	        var value = this.getValue();
								       	 		$$("lt_refrstores").filter(function(obj){
								            	return (obj.partycode && obj.partycode.indexOf(value)>=0) || (obj.partyname && obj.partyname.indexOf(value)>=0);
					                });
					                  }}},
					                
									]}
                ]
            },
				{					
					view: "list",
					id: "lt_refrstores",
					select: true,
				    template:"#partycode# - #partyname#",
					scheme:{
					$init:function(obj){
					}
				},
				    
					on: {
						onAfterLoad: function(){this.select(1);}
					}
				}
			]
			}
		}
	}
});