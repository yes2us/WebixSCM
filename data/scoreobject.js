define([], function() {
	var scoreObject = new Object();

	scoreObject.getPosHotSpot = function() {
		return webix.ajax().post(urlstr+"/WBScoreMng/getPosHotSpots",{DSSuffix:_DSSuffix});
	}

	scoreObject.queryScoreRecord = function(condition) {
		if(arguments.length>0)
		return webix.ajax().post(urlstr+"/WBScoreMng/queryScoreRecord",{Condition:condition,DSSuffix:_DSSuffix});
		else
		return webix.ajax().post(urlstr+"/WBScoreMng/queryScoreRecord",{DSSuffix:_DSSuffix});
	}
	
	scoreObject.queryPeriodScoreSum = function(condition,rankarea) {
		if(arguments.length>0)
		return webix.ajax().post(urlstr+"/WBScoreMng/queryPeriodScoreSum",{Condition:condition,RankArea:rankarea,DSSuffix:_DSSuffix});
		else
		return webix.ajax().post(urlstr+"/WBScoreMng/queryScoreRecord",{DSSuffix:_DSSuffix});
	}
		
	scoreObject.getRanker = function(condition) {
//		console.log(condition);
		if(arguments.length>0)
		return webix.ajax().post(urlstr+"/WBScoreMng/getVariousRanks",condition);
		else
		return webix.ajax().post(urlstr+"/WBScoreMng/getVariousRanks",{DSSuffix:_DSSuffix});
	}
	
	scoreObject.getScoreCrossStructure = function(condition) {
		condition.DSSuffix=_DSSuffix;
		return webix.ajax().post(urlstr+"/WBScoreMng/getScoreCrossStructure",condition);
	}
	
	return scoreObject;
});