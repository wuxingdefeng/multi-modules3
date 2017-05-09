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

function createRecord() {
	var accessToken = document.getElementById("accessToken").value;
	var name = document.getElementById("name").value;
	var tag = document.getElementById("tag").value;
	var roomId = document.getElementById("roomId").value;
	var userId = document.getElementById("userId").value;
	var audioType = document.getElementById("audioType").value;
	var videoType = document.getElementById("videoType").value;
	var fileType = document.getElementById("fileType").value;

	var recordInfo = {};
	recordInfo.name = name;
	recordInfo.tag = tag;
	recordInfo.roomId = roomId;
	recordInfo.userId = userId;
	recordInfo.audioType = audioType;
	recordInfo.videoType = videoType;
	recordInfo.fileType = fileType;
	
	$("#createResultShow").text("");
	
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var record = avdEngine.obtainRecord(serverAdminUrl);
	
	record.createUserRecord(accessToken, recordInfo).then(function(data) {
		$("#stopRecordId").val(data.id);
		$("#getRecordId").val(data.id);
		$("#deleteRecordId").val(data.id);
		$("#createResultShow").text(JSON.stringify(data));
		$("#errorShow").html("");
	}).otherwise(function(error) {
		$("#errorShow").html(JSON.stringify(error));
	});
}

function stopRecord() {
	$("#stopResultShow").text("");
	var accessToken = document.getElementById("accessToken").value;

	var recordId = document.getElementById("stopRecordId").value;
	
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var record = avdEngine.obtainRecord(serverAdminUrl);
	record.stopRecord(accessToken, recordId).then(function(data) {
		$("#stopResultShow").text(JSON.stringify(data));
		$("#errorShow").html("");
	}).otherwise(function(error) {
		$("#errorShow").html(JSON.stringify(error));
	});
}

function getRecord() {
	$("#getResultShow").text("");
	var accessToken = document.getElementById("accessToken").value;
	
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var recordId = document.getElementById("getRecordId").value;
	
	var record = avdEngine.obtainRecord(serverAdminUrl);
	record.getRecord(accessToken, recordId).then(function(data) {
		$("#getResultShow").text(JSON.stringify(data));
		$("#errorShow").html("");
	}).otherwise(function(error) {
		$("#errorShow").html(JSON.stringify(error));
	});
}

function deleteRecord() {
	$("#deleteResultShow").text("");
	var accessToken = document.getElementById("accessToken").value;

	var recordId = document.getElementById("deleteRecordId").value;
	
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var record = avdEngine.obtainRecord(serverAdminUrl);
	record.deleteRecord(accessToken, recordId).then(function(data) {
		$("#deleteResultShow").text(JSON.stringify(data));
		$("#errorShow").html("");
	}).otherwise(function(error) {
		$("#errorShow").html(JSON.stringify(error));
	});
}

function findRecords() {
	$("#findResultShow").text("");
	var accessToken = document.getElementById("accessToken").value;

	var begin = document.getElementById("begin").value;
	var count = document.getElementById("count").value;
	var filter = document.getElementById("filter").value;
	
	var serverAdminUrl = document.getElementById("serverAdminUrl").value;
	var record = avdEngine.obtainRecord(serverAdminUrl);
	record.findRecords(accessToken, begin, count, filter).then(function(data) {
		$("#findResultShow").text(JSON.stringify(data));
		$("#errorShow").html("");
	}).otherwise(function(error) {
		$("#errorShow").html(JSON.stringify(error));
	});
}

function setTypeSelect() {
	var audioType = document.getElementById("audioType");
	fillSelectElement(RecordEnum.AudioType, audioType, RecordEnum.AudioType.singleuser);
	var videoType = document.getElementById("videoType");
	fillSelectElement(RecordEnum.VideoType, videoType, RecordEnum.VideoType.mainflow);
	var fileType = document.getElementById("fileType");
	fillSelectElement(RecordEnum.FileType, fileType, RecordEnum.FileType.mp4);
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

setTypeSelect();
