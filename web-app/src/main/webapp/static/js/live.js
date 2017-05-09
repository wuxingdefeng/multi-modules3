var AVDEngine = ModuleBase.use(ModulesEnum.avdEngine);
var avdEngine = new AVDEngine();

function getAccessToken() {
	var serverURI = $("#serverURI").val();
	var accessKey = $("#accessKey").val();
	var secretKey = $("#secretKey").val();

	var restJs = new RestJs(serverURI);
	restJs.getAccessToken(accessKey, secretKey, function(accessToken) {
		$("#accessToken").val(accessToken);
	}, function(error) {
		$("#tokenAndRoomErrorDiv").html(JSON.stringify(error));
	});
}


function createLive() {
	var accessToken = document.getElementById("accessToken").value;
	var name = document.getElementById("name").value;
	var tag = document.getElementById("tag").value;
	var roomId = document.getElementById("roomId").value;
	var userId = document.getElementById("userId").value;
	var audioType = document.getElementById("audioType").value;
	var videoType = document.getElementById("videoType").value;
	
	var liveInfo = {};
	liveInfo.name = name;
	liveInfo.tag = tag;
	liveInfo.roomId = roomId;
	liveInfo.userId = userId;
	liveInfo.audioType = audioType;
	liveInfo.videoType = videoType;
	
	$("#createResultShow").text("");
	
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var live = avdEngine.obtainLive(serverAdminUrl);
	
	live.createUserLive(accessToken, liveInfo).then(function(data) {
		$("#stopLiveId").val(data.id);
		$("#getLiveId").val(data.id);
		$("#deleteLiveId").val(data.id);
		$("#createResultShow").text(JSON.stringify(data));
		$("#errorShow").html("");
	}).otherwise(function(error) {
		$("#errorShow").html(JSON.stringify(error));
	});
}

function stopLive() {
	$("#stopResultShow").text("");
	var accessToken = document.getElementById("accessToken").value;

	var liveId = document.getElementById("stopLiveId").value;
	
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var live = avdEngine.obtainLive(serverAdminUrl);
	live.stopLive(accessToken, liveId).then(function(data) {
		$("#stopResultShow").text(JSON.stringify(data));
		$("#errorShow").html("");
	}).otherwise(function(error) {
		$("#errorShow").html(JSON.stringify(error));
	});
}

function getLive() {
	$("#getResultShow").text("");
	var accessToken = document.getElementById("accessToken").value;
	
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var liveId = document.getElementById("getLiveId").value;
	
	var live = avdEngine.obtainLive(serverAdminUrl);
	live.getLive(accessToken, liveId).then(function(data) {
		$("#getResultShow").text(JSON.stringify(data));
		$("#errorShow").html("");
	}).otherwise(function(error) {
		$("#errorShow").html(JSON.stringify(error));
	});
}

function deleteLive() {
	$("#deleteResultShow").text("");
	var accessToken = document.getElementById("accessToken").value;

	var liveId = document.getElementById("deleteLiveId").value;
	
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var live = avdEngine.obtainLive(serverAdminUrl);
	live.deleteLive(accessToken, liveId).then(function(data) {
		$("#deleteResultShow").text(JSON.stringify(data));
		$("#errorShow").html("");
	}).otherwise(function(error) {
		$("#errorShow").html(JSON.stringify(error));
	});
}

function findLives() {
	$("#findResultShow").text("");
	var accessToken = document.getElementById("accessToken").value;

	var begin = document.getElementById("begin").value;
	var count = document.getElementById("count").value;
	var filter = document.getElementById("filter").value;
	
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var live = avdEngine.obtainLive(serverAdminUrl);
	live.findLives(accessToken, begin, count, filter).then(function(data) {
		$("#findResultShow").text(JSON.stringify(data));
		$("#errorShow").html("");
	}).otherwise(function(error) {
		$("#errorShow").html(JSON.stringify(error));
	});
}

function setTypeSelect() {
	var audioType = document.getElementById("audioType");
	fillSelectElement(LiveEnum.AudioType, audioType, LiveEnum.AudioType.singleuser);
	var videoType = document.getElementById("videoType");
	fillSelectElement(LiveEnum.VideoType, videoType, LiveEnum.VideoType.mainflow);
}

function fillSelectElement(map, element, selectTrue) {
	element.options.length = 0;
	for (key in map) {
		var val = map[key];
		var option = document.createElement("option");
		option.value = val;
		option.text = key;
		if (val == selectTrue) {
			option.selected = true;
		}
		element.appendChild(option);
	}
}

function rtmpPlay(){
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var liveStr = createResultShow.innerHTML;
	
	if(liveStr == null || ''=== liveStr){
		 alert("先创建直播！");
	}else{
		liveJson = eval("(" + liveStr + ")");  
		var rtmpurl= liveJson.rtmpurl;
		if(rtmpurl !=null && rtmpurl !=""){
			var newURL="http://"+serverAdminUrl+"/admin/live/rtmpPlayer.html?src="+rtmpurl;
		    window.open(newURL);
		}
	}
}

function hlsPlay(){
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var liveStr = createResultShow.innerHTML;
	
	if(liveStr == null || ''=== liveStr){
		 alert("先创建直播！");
	}else{
		liveJson = eval("(" + liveStr + ")");  
	     var hlsurl= liveJson.hlsurl;
		if(hlsurl !=null && hlsurl !=""){
			var newURL="http://"+serverAdminUrl+"/admin/live/qrcode.html?src="+hlsurl;
		    window.open(newURL);
		}
	}
}

setTypeSelect();


