$("#leaveButton").hide();

var localVideo = document.getElementById("localVideo");
var localAudio = document.getElementById("localAudio");

var initVideoSelect = document.getElementById("initVideoSource");
var initAudioSelect = document.getElementById("initAudioSource");

var resolutionSelect = document.getElementById("resolutionSelect");
var frameRateSelect = document.getElementById("frameRateSelect");

var guideDiv = document.getElementById("guideDiv");
var connectionStatuseDiv = document.getElementById("connectionStatuseDiv");

var statsIntervalId = null;

var AVDEngine = ModuleBase.use(ModulesEnum.avdEngine);
var avdEngine = new AVDEngine();

//avdEngine.setLog(Appender.popup, LogLevel.debug);
avdEngine.setLog(Appender.browserConsole, LogLevel.debug);
avdEngine.initDevice();

var version = avdEngine.getVersion();
avdEngine.getResolutionEnum().then(fillResolutionElement);

setVideoCodingType();

 var logAjax = {
 	 enabled : true,
 	 level : 20000,  
 	 server : '121.41.102.126:8086',
 	 userName : 'server_admin',
 	 password : '654321',
 	 db : 'log_db',
 }

function getAccessToken(){
	var serverURI = $("#serverURI").val();
	var accessKey = $("#accessKey").val();
    var secretKey = $("#secretKey").val();
    
    var restJs= new RestJs(serverURI);
    restJs.getAccessToken(accessKey,secretKey,function(accessToken){
    	                           $("#accessToken").val(accessToken);
    	                           $("#tokenAndRoomErrorDiv").html("");
	                      },function(error){
	                      	   $("#tokenAndRoomErrorDiv").html(error);
	                      });
}

function createRoom(){
	 var serverURI = $("#serverURI").val();
	 var accessToken = $("#accessToken").val();
	 var topic = $("#topic").val();
	 var maxVideo = $("#maxVideo").val();
	 var maxAudio = $("#maxAudio").val();
	 var hostPassword = $("#hostPassword").val();
	 var roomMode=$('input:radio[name="roomMode"]:checked').val();
	 
	 var restJs= new RestJs(serverURI);
	 restJs.createRoom(accessToken, topic, maxVideo,maxAudio,hostPassword,roomMode,function(roomId){
	 	                   $("#room_id").val(roomId);
	 	                   $("#tokenAndRoomErrorDiv").html("");
	                  },function(error){
	                       $("#tokenAndRoomErrorDiv").html(error);
	                  });
}

function browserDetect(){
	var detect = avdEngine.getBrowserDetect();
    var browserSupport= avdEngine.checkBrowserSupport();
    browserDetectOutput(detect,browserSupport);
}

function browserDetectOutput(detect,browserSupport){
    var output = '浏览器内核名称: ' + detect.browser.name + '<br>';
        output += '内核版本: ' + detect.browser.fullVersion + '<br>';
        output += '操作系统名称: ' + detect.osName + '<br>';
        output += '是否支持webrtc的GetUserMedia: ' + detect.getUserMediaSupport + '<br>';
        output += '是否支持webrtc的RTCPeerConnection: ' + detect.RTCPeerConnectionSupport + '<br>';
        output += '是否支持webrtc的DataChannel: ' + detect.dataChannelSupport + '<br>';
        output += '是否支持WebSocket: ' + detect.WebSocketSupport + '<br>';
        output += '是否支持屏幕共享(chrome42以上及https访问): ' + detect.screenSharingSupport + '<br>';
        output += '是否支持ORTC: ' + detect.ORTCSupport + '<br>';
        output += '结论：是否支持3tee open-avd: ' + browserSupport + '<br>';
	    document.getElementById('browserDetectDiv').innerHTML = output;
}

function checkDevice(){
//	window.open("checkDevice.html");
	$("#checkInfoTable").show();
	avdEngine.checkDevice().then(checkResult).otherwise(checkError);
	avdEngine.getDeviceObject().then(showDevices).otherwise(alertError);
	avdEngine.checkOpenVideo().then(showVideo).otherwise(alertError);
	avdEngine.checkOpenAudio().then(showAudio).otherwise(alertError);
}

function setVideoCodingType(){
	for (var key in VideoCodingType) {
		var resolutionObject = VideoCodingType[key];
		var option = document.createElement("option");
		option.value = resolutionObject;
		option.text = key;
		videoCodingSelect.appendChild(option);
	}
}

function fillResolutionElement(resolutionEnum) {
	for (var key in resolutionEnum) {
		var resolutionObject = resolutionEnum[key];
		var option = document.createElement("option");
		option.value = key;
		option.text = resolutionObject.width + " X " + resolutionObject.height;
		if (key == "640") {
			option.selected = true;
		}
		resolutionSelect.appendChild(option);
	}
}

function getResolutionAndFrameRate(cameraId){
	var video = room.selfUser.getVideo(cameraId);
	if(video !=null){
		    if(video.resolution){
			    for(var i=0; i<resolutionSelect.options.length; i++){  
			    	    var resolutionStr = video.resolution.width + " X " + video.resolution.height;
				    if(resolutionSelect.options[i].innerHTML == resolutionStr){ 
				        resolutionSelect.options[i].selected = true;  
				        break;  
				    }  
				}
			 }
		 
		     if(video.frameRate){
		     	for(var i=0; i<frameRateSelect.options.length; i++){  
			        if(frameRateSelect.options[i].value == video.frameRate){  
			            frameRateSelect.options[i].selected = true;  
			            break;  
			       }  
			    }
		     }
	}
}


function joinRoom() {
	var serverURI = $("#serverURI").val();
    var accessToken = $("#accessToken").val();
    
    avdEngine.setVideoCoding(videoCodingSelect.value);
	avdEngine.init(serverURI, accessToken).then(initSuccess).otherwise(initError);
}

function initSuccess() {
	/**
	 *如果有“没有设备不允许加会”的需求，可以通过下面二个方法来判断,具体调用参看文档 
	 *avdEngine.cameraMap
	 *avdEngine.microphoneMap
	 */
	var roomId = $("#room_id").val();
	var userId = $("#user_id").val();
	var userName = $("#user_name").val();
	var userData = $("#user_data").val();
	var password = $("#password").val();
	
    room = avdEngine.obtainRoom(roomId);
	room.join(userId, userName, userData, password).then(joinSuccess).otherwise(joinError);
}

function joinSuccess() {
    $("#joinButton").hide();
   	$("#leaveButton").show();
	
	initDevice();
	
	registerRoomCallback();

	var divCon = "加会成功!<br>";
	divCon += "当前会议信息：［roomId:" + room.id + ";  topic:" + room.getRoomTopic() + ";  ownerId:" + room.getOwnerId() + ";  maxAudio:" + room.getMaxAudio() + ";  maxVideo:" + room.getMaxVideo() + ";  maxAttendee:" + room.getMaxAttendee() + "］<br>";
	divCon += "当前用户信息：［nodeId:" + room.selfUser.nodeId + "; userId:" + room.selfUser.id + ";  userName:" + room.selfUser.name + "］";
	guideDiv.innerHTML = divCon;
     
    onPublishCameraNotify(room.pubVideos); //加会登陆前，会议中已经发布的视频资源,采取订阅处理
    
	participantsHandle(room.getParticipants());
}



function initError(error) {
	$("#guideDiv").html("AVDEngine 初始化失败！" + error.errorShow()).show();
}


function joinError(error) {
	$("#guideDiv").html("加会失败！" + error.errorShow()).show();
}


function showError(error) {
	$("#guideDiv").html("code:" + error.code + " ;  message:" + error.message).show();
}

function alertError(error) {
	alert("code:" + error.code + " ;  message:" + error.message);
}

/**
 * 初始化本地音视频设备
 */
function initDevice() {
	fillSelectElement(avdEngine.cameraMap, initVideoSelect);
	fillSelectElement(avdEngine.microphoneMap, initAudioSelect);
}


function fillSelectElement(map, element) {
	element.options.length = 0;
	for (key in map) {
		var val = map[key];
		var option = document.createElement("option");
		option.value = key;
		option.text = val;
		element.appendChild(option);
	}
}


/**
 * 注册房间级别的回调
 */
function registerRoomCallback() {
	room.addCallback(RoomCallback.connection_status, onConnectionStatus);
	room.addCallback(RoomCallback.room_status_notify, onRoomStatusNotify);
	
	room.addCallback(RoomCallback.user_join_notify, onUserJoinNotify);
	room.addCallback(RoomCallback.user_leave_notify, onUserLeaveNotify);
	room.addCallback(RoomCallback.leave_indication, onLeaveIndication);
	
	room.addCallback(RoomCallback.app_data_notify, onAppdataNotify);
    room.addCallback(RoomCallback.user_data_notify, onUserDataNotify);
    room.addCallback(RoomCallback.public_message, onPublicMessage);
	room.addCallback(RoomCallback.private_message, onPrivateMessage);
	room.addCallback(RoomCallback.public_data, onPublicData);
	room.addCallback(RoomCallback.private_data, onPrivateData);
	
	room.addCallback(RoomCallback.mcu_peerconnection_completed, onMCUPeerConnectionCompleted);
}


function refreshDevice() {
	avdEngine.refreshDevice().then(initDevice);
}

function setRecordingMicrophone() {
	avdEngine.setRecordingMicrophone(initAudioSelect.value);
}

function setResolutionOrFrameRate(cameraId){
	room.setCameraResolutionOrFrameRate(initVideoSelect.value,resolutionSelect.value,frameRateSelect.value).otherwise(function(error){
		   alert("code:" + error.code + " ;  message:" + error.message);
	});
}

function reJoin(){
	 //window.location.href="sdk_guide.html";
	 room.reJoin();
}

function onConnectionStatus(status) {
	if (status == ConnectionStatus.connecting) {
		$("#connectionStatuseDiv").html("网络故障,正在与服务器重连中...");
	} else if (status == ConnectionStatus.connected) {
		$("#connectionStatuseDiv").html("");
	} else if (status == ConnectionStatus.connectFailed) {
	    $("#connectionStatuseDiv").html("重连超时，请检查您的网络或者本机访火墙设置。请重新加会。 <input type='button' value='重新加会' onclick='reJoin();'/>");
	}
}


function onRoomStatusNotify() {

}

/**
 * @desc 参会者加会回调
 * @param {Object} users － 参会者数组
 */
function onUserJoinNotify(users) {
	participantsHandle(users);
}


/**
 * @desc 参会者退会回调
 * @param {int} opt - 退会类型
 * @param {int} reason  - 退会原因
 * @param {Object} user - 退会用户
 */
function onUserLeaveNotify(opt,reason,user) {
	//该用户信息在用户列表中删除
	
	//IE 不支持直接remove()，通过.parentNode.removeChild处理
	//$('#participant_' + user.id).remove();
	 var leaveUserDiv = document.getElementById("participant_"+user.id);
     leaveUserDiv.parentNode.removeChild(leaveUserDiv);
	
	
    //该用户已发布且被订阅的视频进行清除
	if(user.videos != null  &&  user.videos.length > 0){
		  for(var key in user.videos){
		 	    var video=user.videos[key];
		 	  
		 	  	var remoteVideoName = "remoteVideo_" + user.id;
	            var remoteName = "remoteName_" + user.id;
	            var remoteVideoElement = document.getElementById(remoteVideoName);
		 	    var remoteNameElement = document.getElementById(remoteName);
		 	    if(remoteVideoElement !=null){
		 	    	     
		 	    	     //IE浏览中必需,chrome不需要
		 	    	     //原因：IE播件中，把video控件转成ocx object后渲染。清除时也需要把ocx object控件转成video,然后remove()
		 	    	     attachMediaStream(remoteVideoElement,null);
		 	    	
		 	    	     //IE 不支持直接remove()，通过.parentNode.removeChild处理
		 	    	     //remoteVideoElement.remove();
                     remoteVideoElement.parentNode.removeChild(remoteVideoElement);
		 	    }
		 	    if(remoteNameElement !=null){
		 	    	    //IE 不支持直接remove()，通过.parentNode.removeChild处理
		 	    	   //remoteNameElement.remove();
		 	    	   remoteNameElement.parentNode.removeChild(remoteNameElement);
		 	    }
          }
	}
	
	//该用户已发布且被订阅的音频进行清除
	if(user.audio != null){
		 var remoteAudioName = "remoteAudio_" +  user.id;
         var remoteAudioElement = document.getElementById(remoteAudioName);
         if(remoteAudioElement !=null){
         	   //IE 不支持直接remove()，通过.parentNode.removeChild处理
		 	   //remoteAudioElement.remove();
		 	    remoteAudioElement.parentNode.removeChild(remoteAudioElement);
         }
	}
}



/**
 * @desc 被踢出会议室
 * @param {Object} reason - 被踢原因
 * @param {Object} userId - 踢人的操作者
 */
function onLeaveIndication(reason,userId) {
	 var user= room.getUser(userId);
	 var userName='';
	 if(user !=null){
	 	userName=user.name;
	 }
	 $("#guideDiv").html("你被"+userName+"踢出会议室。被踢原因：" + reason).show();
	 
	 setTimeout(function(){
	     top.location = "sdk_guide.html";
	     return false;
	  },5000);
}

function onMCUPeerConnectionCompleted(){
	var statsInterval = 500; //sdk语音激励计算频率
	room.audioLevel.start(statsInterval).then(audioLevelHandler);  
	//room.audioLevel.stop().then(audioLevelStop);                 //停止语音激励
	
	//room.connectionInfoCollector.start();  //开始网络情况收集
}


function audioLevelHandler(){
	var statsInterval = 1000; //应用层语音激励显示频率
	statsIntervalId = setInterval(
		function() {
			 var participants = room.getParticipants();
			 participants.forEach(function(user) {
			 	 var elementId= "audioLevel_" + user.id;
			 	 var elemenObject = document.getElementById(elementId);
			 	 if(user.audio){
			 	 	 elemenObject.innerHTML = "音量值：" + user.audio.getAudioLevel(); 
			 	 }
			 });
	    }, statsInterval);
}

function audioLevelStop(){
	if(statsIntervalId){
		clearInterval(statsIntervalId);
		statsIntervalId = null;
		var participants = room.getParticipants();
		participants.forEach(function(user) {
		 	 var elementId= "audioLevel_" + user.id;
		 	 var elemenObject = document.getElementById(elementId);
		 	 if(user.audio){
		 	 	 elemenObject.innerHTML = 0; 
		 	 }
		});
	}
}

/**
 * @desc 退出会议室 
 */
function leaveRoom() {
	var close = window.confirm('Close window?');
	if (close) {
		var reason = 1; //退会原因
		room.leave(reason).then(function() {
			top.location = "sdk_guide.html";
			return false;
		});
	}
}


function participantsHandle(participants) {

	participants.forEach(function(user) {
		user.addCallback(UserCallback.microphone_status_notify, onMicrophoneStatusNotify);
		user.addCallback(UserCallback.camera_status_notify, onCameraStatusNotify);
		user.addCallback(UserCallback.screen_status_notify, onScreenStatusNotify);
		
		user.addCallback(UserCallback.camera_data_notify, onCameraDataNotify);
		user.addCallback(UserCallback.screen_data_notify, onScreenDataNotify);
		
		user.addCallback(UserCallback.publish_camera_notify, onPublishCameraNotify);
		user.addCallback(UserCallback.unpublish_camera_notify, onUnpublishCameraNotify);
		user.addCallback(UserCallback.subscrible_camera_result, onSubscribleCameraResult);
        user.addCallback(UserCallback.unsubscrible_camera_result, onUnsubscribleCameraResult);
        
        user.addCallback(UserCallback.subscrible_microphone_result, onSubscribleMicrophoneResult);
        user.addCallback(UserCallback.unsubscrible_microphone_result, onUnsubscribleMicrophoneResult);
        
		var userId = user.id;
		var selfUserFlag="&nbsp;&nbsp;";
		var isSelfUser = false;
		if (userId == room.selfUser.id) { //自己
			 isSelfUser = true;
			 selfUserFlag= " ★ ";
	    }	

		var val = document.getElementById('participantDiv').innerHTML;
		var participantTR = '';
		var trId = 'participant_' + userId;
		participantTR = participantTR + "<tr id='" + trId + "'><td>" + selfUserFlag  +user.nodeId + "［" + user.id + "/" + user.name + "］</td>";
		participantTR += "<td>  角色：" + user.role + "</td>  ";

		var videoTD = "<td  id='video_" + userId + "'> 摄像头状态：";
		var videos = user.videos;
		if (videos != null && videos.length > 0) {
			for (key in videos) {
				var video = videos[key];
				
				var cameraType= video.cameraType;
				var cameraTypeStr= '';
				if(cameraType == CameraType.unknown){
					cameraTypeStr= "［未知前后置］";
				}else if(cameraType == CameraType.front){
					cameraTypeStr= "［前置］";
				}else if(cameraType == CameraType.back){
					cameraTypeStr= "［后置］";
				}
				
				var videoStatus=video.status;
				var videoStatusStr= '';
				if(videoStatus == StreamStatus.init){
					videoStatusStr= '已初始化';
				}else if(videoStatus == StreamStatus.published){
					videoStatusStr= '已发布';
				}
				
				videoTD += "<div id='videoState_" + video.id + "'>" + video.name+ cameraTypeStr + " ,当前状态:" + videoStatusStr;
				if (isSelfUser) { 
					if (video.status == StreamStatus.init) {
						videoTD += "<input type='button' value='预览摄像头及发布流' onclick='openCameraAndPubVideo(\"" + video.id + "\");'/>";
					} else if (video.status == StreamStatus.published) {
						
						videoTD += "<input type='button' value='取消预览摄像头及取消发布流' onclick='closeCameraAndPubVideo(\"" + video.id + "\");'/>";
					}
				} else {
					if (video.status == StreamStatus.init) {
						videoTD += "<input type='button' value='命令该用户发布摄像头视频'  onclick='remotecmdPublishCamera(\"" + video.id +"\",\"" + userId + "\");'/>";
					} else if (video.status == StreamStatus.published) {
						videoTD += "<input type='button' value='命令该用户取消发布摄像头视频'  onclick='remotecmdUnpublishCamera(\""  + video.id + "\");'/>";
					}
				}
				videoTD += "</div>";
			}
			participantTR += videoTD + "</td> ";
		}else {
			participantTR += videoTD + "&nbsp;&nbsp;</td> ";
		}


		var audioTD = "<td  id='audio_" + userId + "'>麦克风状态：";
		var audio = user.audio;
		if (audio != null && audio.id != null) {
		    var audioStatus=audio.status;
			var audioStatusStr= '';
			if(audioStatus == StreamStatus.init){
				audioStatusStr= '已初始化';
			}else if(audioStatus == StreamStatus.published){
				audioStatusStr= '已发布且未禁音';
			}else if(audioStatus == StreamStatus.muted){
				audioStatusStr= '已发布且禁音';
			}
			
			audioTD += "<div id='audioState_" + audio.id + "'>" + audio.name + " ,当前状态:" + audioStatusStr;
			if (isSelfUser) { 
				if (audio.status == StreamStatus.init) {
					audioTD += "<input type='button' value='打开麦克风' onclick='openMicrophone(\"" + audio.id + "\");'/>";
				} else if (audio.status == StreamStatus.published) {
					audioTD += "<input type='button' value='关闭麦克风' onclick='closeMicrophone(\"" + audio.id + "\");'/>";
					audioTD += "<input type='button' value='禁音' onclick='muteMicrophone(\"" + audio.id + "\");'/>";
				} else if (audio.status == StreamStatus.muted) {
					audioTD += "<input type='button' value='取消禁音' onclick='unmuteMicrophone(\"" + audio.id + "\");'/>"; 
				}
				
			} else {
				if (audio.status == StreamStatus.init) {
					audioTD += "<input type='button' value='命令该用户打开麦克风'  onclick='remotecmdOpenMicrophone(\"" + userId + "\");'/>";
				} else if (audio.status == StreamStatus.published || audio.status == StreamStatus.muted) {
					audioTD += "<input type='button' value='命令该用户关闭麦克风'  onclick='remotecmdCloseMicrophone(\"" + userId + "\");'/>";
				}
			}
			participantTR += audioTD + "</div></td> ";;
		} else {
			participantTR += audioTD + "&nbsp;&nbsp;</td> ";
		}
		
		participantTR += "<td><span class='audioLevelicon'  id='audioLevel_" + userId + "'>音量值：0</span></td>";
		
		if (isSelfUser) { 
               participantTR += "<td>&nbsp;&nbsp;&nbsp;&nbsp; </td>";
        } else {
        	       participantTR += "<td><br><input type='button' value='踢人' onclick='kickoffUser(\"" + userId + "\");'/></td>";
        	}
        participantTR += "</tr>";
		val += participantTR;
		document.getElementById('participantDiv').innerHTML = val;
	});
}


/**
 * 摄像头状态更新
 * @param {Object} status － 状态
 * @param {Object} cameraId － 摄像头设备Id
 * @param {Object} cameraName－ 摄像头设备名称
 * @param {Object} userId－ 摄像头设备所属者ＩＤ
 */
function onCameraStatusNotify(status, cameraId, cameraName, userId) {
	var videoElement = document.getElementById("video_" + userId);
	var videoStateElement = document.getElementById("videoState_" + cameraId);
	if (videoStateElement != null) {
		videoElement.removeChild(videoStateElement);
	}

    if(status == StreamStatus.none){
		return false;
	}
	var videoTD = videoElement.innerHTML;
	
	var user = room.getUser(userId);
	var video= user.getVideo(cameraId);
    var cameraType= video.cameraType;
	var cameraTypeStr= '';
	if(cameraType == CameraType.unknown){
		cameraTypeStr= "［未知前后置］";
	}else if(cameraType == CameraType.front){
		cameraTypeStr= "［前置］";
	}else if(cameraType == CameraType.back){
		cameraTypeStr= "［后置］";
	}
	
	
	
	var statusStr= '';
	if(status == StreamStatus.init){
		statusStr= '已初始化';
	}else if(status == StreamStatus.published){
		statusStr= '已发布';
	}
	
	videoTD += "<div id='videoState_" + cameraId + "'>" + cameraName + cameraTypeStr+ " ,当前状态:" + statusStr + "";
	if (userId == room.selfUser.id) { //自己
		if (status == StreamStatus.init) {
			videoTD += "<input type='button' value='预览摄像头及发布流' onclick='openCameraAndPubVideo(\"" + cameraId + "\");'/>";
		} else if (status == StreamStatus.published) {
			videoTD += "<input type='button' value='取消预览摄像头及取消发布流' onclick='closeCameraAndPubVideo(\"" + cameraId + "\");'/>";
		}
	} else {
		if (status == StreamStatus.init) {
			videoTD += "<input type='button' value='命令该用户发布摄像头视频'  onclick='remotecmdPublishCamera(\"" + cameraId +"\",\"" + userId + "\");'/>";
		} else if (status == StreamStatus.published) {
			videoTD += "<input type='button' value='命令该用户取消发布摄像头视频'  onclick='remotecmdUnpublishCamera(\"" + cameraId + "\");'/>";
		}
	}
	videoElement.innerHTML = videoTD + "</div>";
}


/**
 * 麦克风状态更新
 * @param {Object} status － 状态
 * @param {Object} microphoneId － 麦克风设备Id 
 * @param {Object} microphoneName － 麦克风设备名称
 * @param {Object} userId － 麦克风设备所属者ＩＤ
 */
function onMicrophoneStatusNotify(status, microphoneId, microphoneName, userId) {
	var audioElement = document.getElementById("audio_" + userId);
	var audioStateElement = document.getElementById("audioState_" + microphoneId);
    if (audioStateElement != null) {
		audioElement.removeChild(audioStateElement);
	}

    if(status == StreamStatus.none){
		return false;
	}
    var audioTD = audioElement.innerHTML;
     
	var statusStr= '';
	if(status == StreamStatus.init){
		statusStr= '已初始化';
	}else if(status == StreamStatus.published){
		statusStr= '已发布且未禁音';
	}else if(status == StreamStatus.muted){
		statusStr= '已发布且禁音';
	}
    
	audioTD += "<div id='audioState_" + microphoneId + "'>" + microphoneName + ",当前状态:" + statusStr + "";
	if (userId == room.selfUser.id) { //自己
		if (status == StreamStatus.init) {
			audioTD += "<input type='button' value='打开麦克风' onclick='openMicrophone(\"" + microphoneId + "\");'/>";
		} else if (status == StreamStatus.published) {
			audioTD += "<input type='button' value='关闭麦克风' onclick='closeMicrophone(\"" + microphoneId + "\");'/>";
		    audioTD += "<input type='button' value='禁音' onclick='muteMicrophone(\"" + microphoneId + "\");'/>";
		} else if (status == StreamStatus.muted) {
			audioTD += "<input type='button' value='关闭麦克风' onclick='closeMicrophone(\"" + microphoneId + "\");'/>";
			audioTD += "<input type='button' value='取消禁音' onclick='unmuteMicrophone(\"" + microphoneId + "\");'/>"; 
		}
	} else {
		if (status == StreamStatus.init) {
			audioTD += "<input type='button' value='命令该用户打开麦克风'  onclick='remotecmdOpenMicrophone(\"" + userId + "\");'/>";
		} else if (status == StreamStatus.published || status == StreamStatus.muted) {
			audioTD += "<input type='button' value='命令该用户关闭麦克风'  onclick='remotecmdCloseMicrophone(\"" + userId + "\");'/>";
		}
	}
	audioElement.innerHTML = audioTD + "</div>";
}

function onScreenStatusNotify(status, screenId, screenName, userId) {
	//用户列表上需要显示桌面共享的状态图标，该接口才有意义
}

 /*桌面共享数据更新
  * param : level － 级别
  * param : description － 描述
  * param : cameraId － 桌面共享设备Id
  * param : cameraName－ 桌面共享设备名称
  * param : userId－ 桌面共享设置所属者ＩＤ
  */
function onCameraDataNotify(level, description, cameraId, cameraName, userId){
	alert(cameraId+"_"+cameraName+":"+level+"/"+description);
}

/*桌面共享数据更新
 * param : {int} level － 级别
 * param : {String} description － 描述
 * param : screenId － 桌面共享设备Id
 * param : screenName－ 桌面共享设备名称
 * param : userId－ 桌面共享设置所属者ＩＤ
 */
function onScreenDataNotify(level, description, screenId, screenName, userId) {
	alert(screenId+"_"+screenName+":"+level+"/"+description);
}


function onPublishCameraNotify(videos) {
	videos.forEach(function(video) {
		 //只订阅未订阅过的视频
		 var  subVideoIdsLen  = room.selfUser.subVideoIds.length;
		 if(subVideoIdsLen > 0){
			 for(var i = 0; i < room.selfUser.subVideoIds.length; i++){
	    	     	  var videoId = room.selfUser.subVideoIds[i];
	    	     	  if(video.id != videoId){
	    	     	  	 video.subscrible();
		          }
	    	     }
		 }else{
		 	 video.subscrible();
		 }
	});
}

function onUnpublishCameraNotify(video) {
	video.unsubscrible();
}


/**
 * 订阅远端视频流反馈
 * @param {Object} stream － 远端视频流
 * @param {Object} userId － 所属用户ＩＤ
 * @param {Object} userName－ 所属用户名称
 * @param {Object} cameraId－ 摄像头设备ＩＤ
 */
function onSubscribleCameraResult(stream, userId, userName,cameraId) {
	var remoteVideoName = "remoteVideo_" + userId;
	var remoteName = "remoteName_" + userId;

	var remoteVideoNode = document.getElementById("remoteVideo");
	var NewVideo = document.createElement("video");
	var NewDiv = document.createElement("Div");
	NewVideo.id = remoteVideoName;
	NewVideo.autoplay = true;
	NewVideo.muted = true;
	NewVideo.width = "250";
	NewVideo.height = "250";
	NewDiv.id = remoteName;
	remoteVideoNode.appendChild(NewVideo);
	remoteVideoNode.appendChild(NewDiv);
	document.getElementById(remoteName).innerHTML = "user_id:" + userId + "  user_name:" + userName;

	var remoteVideoElement = document.getElementById(remoteVideoName);
	room.selfUser.attachVideoElementMediaStream(remoteVideoElement, stream);
}


/**
 * 取消订阅远端视频流反馈
 * @param {Object} userId－ 所属用户ＩＤ
 * @param {Object} userName－所属用户名称
 * @param {Object} cameraId－摄像头设备ＩＤ
 */
function onUnsubscribleCameraResult(userId, userName,cameraId){
	var remoteVideoName = "remoteVideo_" + userId;
	var remoteName= "remoteName_" + userId;
	var remoteVideoNameElement = document.getElementById(remoteVideoName);
	var remoteNameElement = document.getElementById(remoteName);
	
	room.selfUser.attachVideoElementMediaStream(remoteVideoNameElement,null);
	
	//IE 不支持直接remove()，通过.parentNode.removeChild处理
	 //remoteVideoNameElement.remove(); 
	 //remoteNameElement.remove();
	
     remoteVideoNameElement.parentNode.removeChild(remoteVideoNameElement);
     remoteNameElement.parentNode.removeChild(remoteNameElement);
}

/**
 * 订阅远端音频流反馈
 * @param {Object} stream－ 远端音频流
 * @param {Object} userId－ 所属用户ＩＤ
 * @param {Object} userName－所属用户名称
 */
function onSubscribleMicrophoneResult(stream, userId, userName){
     var remoteAudioName = "remoteAudio_" + userId;
     var remoteAudioNode = document.getElementById("remoteAudio");
     
     var newAudio = document.createElement("audio");
     newAudio.id = remoteAudioName;
     newAudio.autoplay = true;
     remoteAudioNode.appendChild(newAudio);
     
     var remoteAudioElement = document.getElementById(remoteAudioName);
     room.selfUser.attachAudioElementMediaStream(remoteAudioElement, stream);
}


/**
 * 取消订阅远端音频流反馈
 * @param {Object} userId－ 所属用户ＩＤ
 * @param {Object} userName－所属用户名称
 */
function onUnsubscribleMicrophoneResult(userId, userName){
	var remoteAudioName = "remoteAudio_" + userId;
	var remoteAudioNameElement = document.getElementById(remoteAudioName);
			  	    
	room.selfUser.attachAudioElementMediaStream(remoteAudioNameElement,null);
	
	//IE 不支持直接remove()，通过.parentNode.removeChild处理
	//remoteAudioNameElement.remove();
     remoteAudioNameElement.parentNode.removeChild(remoteAudioNameElement);
}

/**
 * 预览摄像头
 * @param {String} cameraId- 摄像头设备id
 */
function previewCamera(cameraId) {
	if (typeof(cameraId) == 'undefined') {
		cameraId = initVideoSelect.value;
	}
	
	var video = room.selfUser.getVideo(cameraId);
	if(! video.resolution){
		video.setResolution(resolutionSelect.value);
	}
	if(! video.frameRate){
		video.setFrameRate(frameRateSelect.value);
	}
	video.preview(localVideo).otherwise(showError);
}


/**
 * 取消预览摄像头
 * @param {String} videoId- 摄像头设备id
 */
function unpreviewCamera(cameraId) {
	if (typeof(cameraId) == 'undefined') {
		cameraId = initVideoSelect.value;
	}
	var video = room.selfUser.getVideo(cameraId);
	video.unpreview();
}


/**
 * 发布流
 * @param {String} cameraId- 摄像头设备id 
 */
function pubVideo(cameraId) {
	if (typeof(cameraId) == 'undefined') {
		cameraId = initVideoSelect.value;
	}
	var video = room.selfUser.getVideo(cameraId);
	video.publish().otherwise(alertError);
}

/**
 * 取消发布流
 * @param {String} cameraId- 摄像头设备id 
 */
function unpubVideo(cameraId){
	if (typeof(cameraId) == 'undefined') {
		cameraId = initVideoSelect.value;
	}
	var video = room.selfUser.getVideo(cameraId); 
	video.unpublish();
}

/**
 * 打开麦克风
 * @param {String} microphoneId - 麦克风设备id 
 */
function openMicrophone(microphoneId){
	if (typeof(microphoneId) == 'undefined') {
		microphoneId = initAudioSource.value;
	}
	var audio = room.selfUser.getAudio(microphoneId);
	audio.openMicrophone(localAudio).otherwise(alertError);
}

/**
 * 关闭麦克风
 *@param {String} microphoneId - 麦克风设备id 
 */
function closeMicrophone(microphoneId){
	if (typeof(microphoneId) == 'undefined') {
		microphoneId = initAudioSource.value;
	}
	var audio = room.selfUser.getAudio(microphoneId);
	audio.closeMicrophone();
}

/**
 * 禁音
 * @param {String} microphoneId - 麦克风设备id 
 */
function muteMicrophone(microphoneId){
	if (typeof(microphoneId) == 'undefined') {
		microphoneId = initAudioSource.value;
	}
	var audio = room.selfUser.getAudio(microphoneId);
	audio.muteMicrophone();
}


/**
 * 取消禁音
 * @param {String} microphoneId - 麦克风设备id 
 */
function unmuteMicrophone(microphoneId){
	if (typeof(microphoneId) == 'undefined') {
		microphoneId = initAudioSource.value;
	}
	var audio = room.selfUser.getAudio(microphoneId);
	audio.unmuteMicrophone();
}

/**
 *屏蔽会议声音 
 */
function muteSpeaker(){
	if(!room.ismuteSpeaker()){
		room.muteSpeaker();
	}
}

/**
 * 取消屏蔽会议声音
 */
function unmuteSpeaker(){
	if(room.ismuteSpeaker()){
	   room.unmuteSpeaker();
	}
}


/**
 * 预览摄像头及发布流
 * @param {String} cameraId - 摄像头设备id 
 */
function openCameraAndPubVideo(cameraId) {
	if (typeof(cameraId) == 'undefined') {
		cameraId = initVideoSelect.value;
	}
	var video = room.selfUser.getVideo(cameraId);
	if(! video.resolution){
		video.setResolution(resolutionSelect.value);
	}
	if(! video.frameRate){
		video.setFrameRate(frameRateSelect.value);
	}
	
	
	/**
	 * 调用方式1： 当视频路数满时，preview 及publish都不允许
	 */
	//video.previewAndPublish(localVideo).otherwise(alertError);
	
	/**
	 * 调用方式2： 当视频路数满时，preview被充许，但publish不允许
	 */
	video.preview(localVideo).then(function() {
		video.publish().otherwise(alertError);
	}).otherwise(showError);
}


/**
 * 取消预览摄像头及取消发布流
 * @param {String} cameraId - 摄像头设备id 
 */
function closeCameraAndPubVideo(cameraId) {
	if (typeof(cameraId) == 'undefined') {
		cameraId = initVideoSelect.value;
	} 
	var video = room.selfUser.getVideo(cameraId);
	video.unpreview();
	video.unpublish();
}


/**
 * 预览摄像头及发布流和打开麦克风 
 */
function openCameraAndMicrophone(){
	if (typeof(cameraId) == 'undefined') {
		cameraId = initVideoSelect.value;
	}
	var video = room.selfUser.getVideo(cameraId);
	
	if(! video.resolution){
		video.setResolution(resolutionSelect.value);
	}
	if(! video.frameRate){
		video.setFrameRate(frameRateSelect.value);
	}
	
	if (typeof(microphoneId) == 'undefined') {
		microphoneId = initAudioSource.value;
	}
	var audio = room.selfUser.getAudio(microphoneId);
	
	room.selfUser.openCameraAndMicrophone(video,audio,localVideo,localAudio).otherwise(alertError);
}


/**
 * 命令远端用户发布摄像头视频
 * @param {String} cameraId -  摄像头设备id
 * @param {String} userId -  远端用户id
 */
function remotecmdPublishCamera(cameraId,userId){
	var user = room.getUser(userId);
	var video = user.getVideo(cameraId);
	
	if(! video.resolution){
		video.setResolution(resolutionSelect.value);
	}
	if(! video.frameRate){
		video.setFrameRate(frameRateSelect.value);
	}
	
	room.selfUser.remotecmdPublishCamera(video);
}

/**
 * 命令远端用户取消发布摄像头视频
 * @param {String} videoId -  摄像头设备id
 * @param {String} userId -  远端用户id
 */
function remotecmdUnpublishCamera(videoId){
	room.selfUser.remotecmdUnpublishCamera(videoId);
}


/**
* @desc 命令远端用户打开麦克风
* @param {String} userId - 远端用户Id
*/
function remotecmdOpenMicrophone(userId){
	 room.selfUser.remotecmdOpenMicrophone(userId);
}


 /**
* @desc 命令远端用户关闭麦克风
* @param {String} userId - 远端用户Id
*/
function remotecmdCloseMicrophone(userId){
	 room.selfUser.remotecmdCloseMicrophone(userId);
}


/**
 * @desc 设置摄像头数据
 */
function updateCameraData(){
	var cameraLevel = document.getElementById('cameraLevel').value;
	var cameraDescription = document.getElementById('cameraDescription').value;
	if (strUtil.isEmpty(cameraLevel) && strUtil.isEmpty(cameraDescription)) {
		return;
	}else{
	     cameraId = initVideoSelect.value;
		 var video = room.selfUser.getVideo(cameraId);
		 video.updateCameraData(Number(cameraLevel),cameraDescription);
	}
}


/**
 * @desc 踢人
 * @param {String} userId - 被踢用户Id
 */
function kickoffUser(userId) {
	 var reason = 1; //踢人原因
	 room.kickoffUser(reason,userId);
}



/**
 * 发送聊天信息
 */
function messageSend() {
	var messageUserId = document.getElementById('messageUserId').value;
	var message = document.getElementById('message').value;
	if (strUtil.isEmpty(message)) {
		return;
	} else {
		if (strUtil.isEmpty(messageUserId)) {
			  room.sendPublicMessage(message).then(messageSendSuccess(message)).otherwise(messageSendError);
		} else {
			  room.sendPrivateMessage(message, messageUserId).then(messageSendSuccess(message)).otherwise(messageSendError);
		}
	}
}

function messageSendSuccess(message){
	    var val = document.getElementById('messageColl').innerHTML;
		var prefix = "";
		if (!strUtil.isEmpty(val)) {
			prefix = "\r\n";
		}
		val += prefix + room.selfUser.name + "：" + message;
		document.getElementById("messageColl").innerHTML = val;
		document.getElementById('message').value = "";
		document.getElementById('message').focus();
}

function messageSendError(error){
	 document.getElementById("messageColl").innerHTML = "发送聊天信息失败！" + error.errorShow();
}


/**
 * 公聊回调
 * @param {Object} Message
 */
function onPublicMessage(Message) {
	fillMessageElement(Message);
}


/**
 * 私聊回调
 * @param {Object} Message
 */
function onPrivateMessage(Message) {
	fillMessageElement(Message);
}


function fillMessageElement(Message) {
    var timestamp =Message.timestamp;
    var dt = new Date(timestamp);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset()); // 当前时间(分钟) + 时区偏移(分钟)
	console.log( "内容收到时间（本地时间）: ", dt.toLocaleString());
	
	var val = document.getElementById('messageColl').innerHTML;
	var prefix = "";
	if (!strUtil.isEmpty(val)) {
		prefix = "\r\n";
	}
	val += prefix + Message.fromName + "：" + Message.message;
	document.getElementById("messageColl").innerHTML = val;
}



/**
 * 透明通道发送
 */
function dataSend() {
	var dataUserId = document.getElementById('dataUserId').value;
	var dataMsg = document.getElementById('dataMsg').value;

	if (strUtil.isEmpty(dataMsg)) {
		return;
	} else {
		var dataArrayBuffer = typeConversionUtil.String2ArrayBuffer(dataMsg);
		if (strUtil.isEmpty(dataUserId)) {
			room.sendPublicData(dataArrayBuffer).then(dataSendSuccess(dataMsg)).otherwise(dataSendError);
		} else {
			room.sendPrivateData(dataArrayBuffer,dataUserId).then(dataSendSuccess(dataMsg)).otherwise(dataSendError);
		}
	}
}

function  dataSendSuccess(dataMsg){
    var val = document.getElementById('dataColl').innerHTML;
	var prefix = "";
	if (!strUtil.isEmpty(val)) {
		prefix = "\r\n";
	}
	val += prefix + room.selfUser.name + "：" + dataMsg;
	document.getElementById("dataColl").innerHTML = val;
	document.getElementById('dataMsg').value = "";
	document.getElementById('dataMsg').focus();
}

function dataSendError(error){
	 document.getElementById("dataColl").innerHTML = "透明通道发送信息失败！" + error.errorShow();
}


/**
 * 公有透明通道回调
 * @param {Object} dataArrayBuffer － DataArrayBuffer对象
 * @param {String} userId － user id
 */
function onPublicData(dataArrayBuffer, userId) {
	fillDataElement(dataArrayBuffer,userId);
}


/**
 * 私有透明通道回调
 * @param {Object} dataArrayBuffer － DataArrayBuffer对象
 * @param {String} userId － user id
 */
function onPrivateData(dataArrayBuffer, userId) {
	fillDataElement(dataArrayBuffer,userId);
}


function fillDataElement(dataArrayBuffer,userId){
	var content = typeConversionUtil.ArrayBuffer2String(dataArrayBuffer);
	var val = document.getElementById('dataColl').innerHTML;
	var prefix = "";
	if (!strUtil.isEmpty(val)) {
		prefix = "\r\n";
	}
	val += prefix + room.getUser(userId).name + "：" + content;
	document.getElementById("dataColl").innerHTML = val;
}

/**
 * 更新用户扩展内容
 */
function updateUserData(){
	var userDataMsg = document.getElementById('userDataMsg').value;
	if (strUtil.isEmpty(userDataMsg)) {
		return;
	} else {
		room.selfUser.updateUserData(userDataMsg);
		var val = document.getElementById('userDataColl').innerHTML;
		var prefix = "";
		if (!strUtil.isEmpty(val)) {
			prefix = "\r\n";
		}
		val += prefix + room.selfUser.name + "：" + userDataMsg;
		document.getElementById("userDataColl").innerHTML = val;
		document.getElementById('userDataMsg').value = "";
		document.getElementById('userDataMsg').focus();
	}
}

/**
 * 用户扩展内容更新回调
 * @param {String} userData - 用户扩展内容
 * @param {String} userId - 用户id
 */
function onUserDataNotify(userData, userId ) {
	var val = document.getElementById('userDataColl').innerHTML;
	var prefix = "";
	if (!strUtil.isEmpty(val)) {
		prefix = "\r\n";
	}
	val += prefix + room.getUser(userId).name + "：" + userData;
	document.getElementById("userDataColl").innerHTML = val;
}

/**
 * 获得用户的扩展内容
 */
function getUserData() {
	var userDataUserId = document.getElementById('userDataUserId').value;
	var viewUserData = document.getElementById('viewUserData');
	var userData =room.selfUser.getUserData(userDataUserId);
	viewUserData.value = userData;
}



/**
 * 更新房间应用扩展字段
 */
function updateAppData(){
         var appDataKV = document.getElementById('appDataKV').value;
	     if(appDataKV ==null || appDataKV==''){
		      return;
		 }else{
		 	  var kvSp=appDataKV.split(':');
		 	  room.updateAppData(kvSp[0],kvSp[1]);
	 	 	  
	 	 	  var val = document.getElementById('appDataColl').innerHTML;
              var prefix="";
              if(val  !=null &&  val !=""){
                   prefix="\r\n";
              }
              val+= prefix + room.selfUser.name+"：" + appDataKV;	
              document.getElementById("appDataColl").innerHTML=val;
              document.getElementById('appDataKV').value="";
              document.getElementById('appDataKV').focus();
		 }
}


/**
 * 房间应用扩展字段回调
 * @param {object} appData - 间应用扩展字段
 */
function onAppdataNotify(appData) {
     if(appData !=null){
    	      for (var i = 0; i != appData.length; ++i) {
			  var kv = appData[i];
			  var val = document.getElementById('appDataColl').innerHTML;
		      var prefix="";
		      if(val  !=null &&  val !=""){
		 	        prefix="\r\n";
		      }
		      val+= prefix + kv.key+"："+kv.value;	
		      document.getElementById("appDataColl").innerHTML=val; 
		 }
    }
}


/**
 * 获得房间应用扩展字段内容
 */
function getAppData(){
	var appDataKey = document.getElementById('appDataKey').value;
	var appData =room.getAppData(appDataKey);
	if(typeof(appData)!='undefined' && typeof(appData)!='object' ){
		document.getElementById("viewAppDataValue").innerHTML=appData;  
	}else{
		if(appData !=null){
			  var val= '';
	    	      for (var key in appData) {
				  var value = appData[key];
			      var prefix="";
			      if(val  !=null &&  val !=""){
			 	      prefix="\r\n";
			      }
			      val+= prefix + key+"："+value;	
			  }
	    	      document.getElementById("viewAppDataValue").innerHTML=val; 
	    }
    }
}


/**
 * 字符串相关处理
 */
var strUtil = {
    /*
     * 判断字符串是否为空
     * @param str 传入的字符串
     * @returns {}
     */
    isEmpty:function(str){
        if(str != null && str.length > 0){
            return false;
        }else{
            return true;
        }
    }
}


/**
 * 返回当前用户所显示的格式的当前时间
 * @returns {string}
 */
function getCurrentTime(stamp) {
    var now     = (stamp? new Date(stamp): new Date());
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds();
    if(hour.toString().length === 1) {
        hour = '0'+hour;
    }
    if(minute.toString().length === 1) {
        minute = '0'+minute;
    }
    if(second.toString().length === 1) {
        second = '0'+second;
    }
    return hour+':'+minute+':'+second;
}

//检查设备代码
var checkVideo = document.getElementById("checkVideo");
var checkAudio = document.getElementById("checkAudio");
var localLevel = document.getElementById("audioLevel");
var hasVideo = document.getElementById("hasVideo");
var hasAudio = document.getElementById("hasAudio");
var videoList = document.getElementById("videoList");
var audioList = document.getElementById("audioList");
//var AVDEngine = ModuleBase.use(ModulesEnum.avdEngine);
//var avdEngine = new AVDEngine();

//avdEngine.checkDevice().then(checkResult).otherwise(checkError);

function checkResult(result) {
	hasVideo.innerHTML = "有视频：" + result.video;
	hasAudio.innerHTML = "有音频：" + result.audio;
	console.log("has video:" + result.video);
	console.log("has audio:" + result.audio);
	console.log("has speaker:" + result.speaker);
}

function checkError(error) {
	log.info("get device error!error code:" + error.code + "; error message:" + error.message);
}

//=============================================获取设备 

//avdEngine.getDeviceObject().then(showDevices).otherwise(alertError);

function showDevices(deviceObject) {
	var video = deviceObject.video;
	var audio = deviceObject.audio;
	for(var key in video){
		var option = document.createElement("option");
		option.value = key;
		option.text = video[key];
		videoList.appendChild(option);
	}
	
	for(var key in audio){
		var option = document.createElement("option");
		option.value = key;
		option.text = audio[key];
		audioList.appendChild(option);
	}
}

function changeVideo(){
	avdEngine.checkOpenVideo(videoList.value).then(showVideo).otherwise(alertError);
}

function changeAudio(){
	avdEngine.checkOpenAudio(audioList.value).then(showAudio).otherwise(alertError);
}

//==============================================打开设备

//avdEngine.checkOpenVideo().then(showVideo).otherwise(alertError);
//avdEngine.checkOpenAudio().then(showAudio).otherwise(alertError);

function showVideo(stream) {
	//console.log(stream);
	checkVideo.srcObject = stream;
}

function showAudio(stream) {
	//console.log(stream);
	checkAudio.srcObject = stream;

	var localCollector = new LocalStatsCollector(stream, 1000, showAudioLevel);
	localCollector.start();
}

function showAudioLevel(audioLevel) {
	//console.log(audioLevel);
	localLevel.innerHTML = "音量值(阈值0-1):" + audioLevel;
}

function getLocalKey(map) {
	for(key in map) {
		return key;
	}
}

function alertError(error) {
	alert("code:" + error.code + " ;  message:" + error.message);
}