<%@ page language="java" import="java.util.*" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>

<html>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<meta name="renderer" content="webkit"/>
<script type="text/javascript" src="<%=basePath%>static/jsLib/jquery/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>static/js/cn.tee3.avd-2.3.0.0.min.js?20161230165622"></script>

<style>
    .am-panel {
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 0;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05)
    }
    .am-panel-hd {
        padding: .6rem 1.25rem;
        border-bottom: 1px solid transparent;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        color: #444;
        background-color: #f5f5f5;
        border-color: #ddd
    }
    .am-panel-bd {
        padding: 1.25rem
    }

</style>

<body>
<h2>Hello World!</h2>
<div id="userName">${sessionScope.userName}</div>
浏览器信息
<input type="button" value="开始检测"   onclick="browserDetect();" />
<br>
<br>
<div id="browserDetectDiv"></div>
<HR>

检查设备
<input type="button" value="开始检测"   onclick="checkDevice();" />
<br>
<br>
<table style="border: 1px solid black;display: none;" id="checkInfoTable">
    <thead>
    <td><b>视频检查</b></td>
    <td><b>音频检查</b></td>
    </thead>
    <tbody>
    <tr>
        <td id="hasVideo">有视频：true</td>
        <td id="hasAudio">有音频：true</td>
    </tr>
    <tr>
        <td>视频列表：
            <select id="videoList" onchange="changeVideo()"></select>
        </td>
        <td>音频列表：
            <select id="audioList" onchange="changeAudio()"></select>
        </td>
    </tr>
    <tr>
        <td>
            <video id="checkVideo" autoplay style="width: 300px; height: 200px;"></video>
        </td>
        <td>
            <audio id="checkAudio" autoplay></audio>
            <span id="audioLevel"></span>
        </td>
    </tr>
    </tbody>
</table>
<HR>

获取访问令牌及创建会议
<div id='done1' ><a href="#" onclick="document.getElementById('tokenAndRoomDiv').style.display = 'block';document.getElementById('done1').style.display = 'none';document.getElementById('done2').style.display = 'block';" title="展开操作">↓↓↓</a></div>
<div id='done2' style="display: none;"><a href="#" onclick="document.getElementById('tokenAndRoomDiv').style.display = 'none';document.getElementById('done2').style.display = 'none';document.getElementById('done1').style.display = 'block';"  title="隐藏操作">↑↑↑</a></div>

<br>
<div id="tokenAndRoomDiv" style="display: none;">
    ***注：该实现只在demo中使用，因令牌安全问题，生产环境中该逻辑需要在服务器端实现；

    <br><br>&nbsp;&nbsp;&nbsp;&nbsp;
    access_key:<input type="text" placeholder="请输入access_key"  value="demo_access"  id="accessKey" name="accessKey" />&nbsp;&nbsp;
    secret_key:<input type="text" placeholder="请输入demo_secret" value="demo_secret"  id="secretKey" name="secretKey" />&nbsp;&nbsp;
    <input type="button" value="获取访问令牌"   onclick="getAccessToken();" />

    <br><br>&nbsp;&nbsp;&nbsp;&nbsp;
    会议主题:<input type="text" placeholder="请输入会议主题"  value="testingMeeting"  id="topic" name="topic" />&nbsp;&nbsp;
    最大视频数:<input type="text" placeholder="请输入允许的最大视频数"  value="5"  id="maxVideo" name="maxVideo" style="width:25px;"/>&nbsp;&nbsp;
    最大音频数:<input type="text" placeholder="请输入允许的最大音频数"  value="5"  id="maxAudio" name="maxAudio" style="width:25px;"/>&nbsp;&nbsp;
    主持人密码:<input type="text" placeholder="请输入主持人密码"    value="123456"  id="hostPassword" name="hostPassword" style="width:50px;"/>&nbsp;&nbsp;
    会议类型:
    <input  name="roomMode" type="radio" value="1" checked="checked"/>MCU
    <input name="roomMode" type="radio" value="3"/>P2P

    &nbsp;&nbsp;
    <input type="button" value="创建会议"   onclick="createRoomByOwn();" />
</div>

<br>
<div id="tokenAndRoomErrorDiv"></div>
<br>
<HR>

加入会议
<br>
<br>
服务器地址:<input type="text" placeholder="请输入服务器IP及端口" value="nice2meet.cn"  id="serverURI" name="serverURI" />&nbsp;&nbsp;
访问令牌:<input type="text" placeholder="请输入访问令牌"   id="accessToken" name="accessToken" style="width:520px;" value=""/>
<br>
<label for='videoCodingSelect'>视频编码格式： </label>
<select id='videoCodingSelect'></select>
<br>
<br>
<input type="text" placeholder="请输入会议号" id="room_id" name="room_id" value=""/>
<input type="text" placeholder="请输入用户Id" id="user_id" name="user_id"  value=""/>
<input type="text" placeholder="请输入用户名" id="user_name" name="user_name"  value=""/>
<input type="text" placeholder="请输入用户扩展数据" id="user_data" name="user_data" />
<input type="text" placeholder="请输入主持人或会议的密码" id="password" name="password" />
<input type="button" id="joinButton"  name="joinButton"  value="加会" onclick="joinRoom();" />
<input type="button" id="leaveButton"  name="leaveButton"  value="退会" onclick="leaveRoom();"/>

<br>
<br>
<div id="guideDiv"></div>
<br>

<br>
<div id="connectionStatuseDiv"></div>
<br>
邀请加入成员：<input name="userNames" id="userNames">
<input type="button" id="yaoqingJoin"  name="yaoqingJoin"  value="邀请加会" onclick="yaoqingJoin();" />
<div>
    <div>参会者列表:</div>
    <div >
        <div>
            <table border="1" cellspacing="0" cellpadding="0" id="participantDiv" name="participantDiv"></table>
        </div>
    </div>
</div>

<br>
<br>
<br>
<HR>
设备有热插拔情况,请点击更新设备
<input type="button" value="更新设备"   onclick="refreshDevice();" />


<br>
<br>
<div id='container'>
    <div class="am-panel" >
        <div class="am-panel-hd">摄像头设备</div>
        <div class="am-panel-bd">
            <label for='initVideoSource'>设备列表: </label>
            <select id='initVideoSource' onchange="getResolutionAndFrameRate(this.value)"></select>

            &nbsp;&nbsp; &nbsp;&nbsp;
            <label for='resolutionSelect'>分辨率: </label>
            <select id='resolutionSelect'></select>

            &nbsp;&nbsp; &nbsp;&nbsp;
            <label for='frameRateSelect'>帧率: </label>
            <select id='frameRateSelect'>
                <option value=1>1</option>
                <option value=3>3</option>
                <option value=5>5</option>
                <option value=8>8</option>
                <option value=10>10</option>
                <option value=12>12</option>
                <option value=15 selected>15</option>
                <option value=18>18</option>
                <option value=20>20</option>
                <option value=25>25</option>
                <option value=30>30</option>
            </select>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <input type="button" value="设置分辨率或帧率确认" onclick="setResolutionOrFrameRate();" />
        </div>
    </div>

    <div class="am-panel" >
        <div class="am-panel-hd">麦克风设备</div>
        <div class="am-panel-bd">
            <label for='initAudioSource'>设备列表: </label>
            <select id='initAudioSource'></select>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <input type="button" value="设置为当前麦克风" onclick="setRecordingMicrophone();" />
        </div>
    </div>
</div>
<br>
<HR>
设备操作：
<br>
<br>
<input type="button" value="预览摄像头" onclick="previewCamera();" />
<input type="button" value="发布流" onclick="pubVideo();" />
&nbsp;&nbsp;或&nbsp;&nbsp;
<input type="button" value="预览摄像头及发布流" onclick="openCameraAndPubVideo();" />

<br>
<br>
<input type="button" value="取消预览摄像头" onclick="unpreviewCamera();" />
<input type="button" value="取消发布流" onclick="unpubVideo();" />
&nbsp;&nbsp;或&nbsp;&nbsp;
<input type="button" value="取消预览摄像头及取消发布流" onclick="closeCameraAndPubVideo();" />

<br>
<br>
<br>
<input type="text" placeholder="摄像头级别" id="cameraLevel" name="cameraLevel" width="100%">
<input type="text" placeholder="摄像头描述" id="cameraDescription" name="cameraDescription"  width="100%">
<input type="button" value="设置摄像头级别及描述" onclick="updateCameraData();" />


<br>
<br>
<br>
<input type="button" value="打开麦克风" onclick="openMicrophone();" />
<input type="button" value="关闭麦克风" onclick="closeMicrophone();" />
&nbsp;&nbsp;&nbsp;&nbsp;

<input type="button" value="禁音" onclick="muteMicrophone();" />
<input type="button" value="取消禁音" onclick="unmuteMicrophone();" />
&nbsp;&nbsp;&nbsp;&nbsp;

<input type="button" value="屏蔽会议声音" onclick="muteSpeaker();" />
<input type="button" value="取消屏蔽会议声音" onclick="unmuteSpeaker();" />

<br>
<br>
<br>
<input type="button" value="预览摄像头及发布流和打开麦克风" onclick="openCameraAndMicrophone();" />


<br>
<br>
<br>
<HR>
音视频显示：
<br>
<br>
<div id='container'>
    <video id="localVideo" muted autoplay></video>
    <audio id="localAudio" muted autoplay></audio>

    <div id='remoteVideo'></div>
    <div id='remoteAudio'></div>
</div>

<br>
<br>
<HR>
<div>聊天</div>
<table>
    <tr>
        <td>
            <input type="text" placeholder="输入对方userId,空表示公聊" id="messageUserId" name="messageUserId" width="100%">
            <input type="text" placeholder="请输入聊天内容" id="message" name="message"  style="width:510px;"   onkeydown="if(event.keyCode==13) messageSend();">
        </td>
    </tr>
    <tr>
        <td>
            <textarea id="messageColl" name="messageColl" disabled="disabled" type="textarea" cols="100" rows="10"></textarea>
        </td>
    </tr>
</table>


<br>
<br>
<HR>
<div>透明通道</div>
<table>
    <tr>
        <td>
            <input type="text" placeholder="输入对方userId,空表示广播" id="dataUserId" name="dataUserId" width="100%">
            <input type="text" placeholder="请输入内容" id="dataMsg" name="dataMsg" style="width:510px;" onkeydown="if(event.keyCode==13) dataSend();">
        </td>
    </tr>
    <tr>
        <td>
            <textarea id="dataColl" name="dataColl" disabled="disabled" type="textarea" cols="100" rows="6"></textarea>
        </td>
    </tr>
</table>

<br>
<br>
<br>
<HR>
<div>用户扩展字段</div>
<table>
    <tr>
        <td>
            <input type="text" placeholder="请输入用户扩展字段内容" id="userDataMsg" name="userDataMsg" style="width:510px;"  onkeydown="if(event.keyCode==13)  updateUserData();">
        </td>
    </tr>
    <tr>
        <td>
            <textarea id="userDataColl" name="userDataColl" disabled="disabled" type="textarea" cols="100" rows="6"></textarea>
        </td>
    </tr>
</table>


<br>
<br>
<div>获取用户扩展字段</div>
<table>
    <tr>
        <td>
            <input type="text" placeholder="输入用户id,空表示自己" id="userDataUserId" name="userDataUserId" width="100%" onkeydown="if(event.keyCode==13)  getUserData();">
            <input type="text" placeholder="显示用户扩展字段内容" id="viewUserData" name="viewUserData" style="width:510px;">
        </td>
    </tr>
</table>



<br>
<br>
<HR>
<div>房间应用扩展字段</div>
<table>
    <tr>
        <td>
            <input type="text" placeholder="请输入房间应用扩展字段内容，格式：key:value" id="appDataKV" name="appDataKV" style="width:510px;"  onkeydown="if(event.keyCode==13)  updateAppData();">
        </td>
    </tr>
    <tr>
        <td>
            <textarea id="appDataColl" name="appDataColl" disabled="disabled" type="textarea" cols="100" rows="6"></textarea>
        </td>
    </tr>
</table>


<br>
<br>
<div>获取房间应用扩展字段</div>
<table>
    <tr>
        <td>
            <input type="text" placeholder="输入key值，,空表示返回所有key" id="appDataKey" name="appDataKey" style="width:510px;" onkeydown="if(event.keyCode==13)  getAppData();">
            <br>
            <textarea  id="viewAppDataValue" name="viewAppDataValue" disabled="disabled" type="textarea" cols="100" rows="6"></textarea>
        </td>
    </tr>
</table>

<script type="text/javascript">
window.onload=function(){

}
//创建房间
function createRoomByOwn(){
    var accessKey = $("#accessKey").val();
    var secretKey = $("#secretKey").val();

   // var restJs= new RestJs(serverURI);
//    restJs.getAccessToken(accessKey,secretKey,function(accessToken){
//        $("#accessToken").val(accessToken);
//        $("#tokenAndRoomErrorDiv").html("");
//    },function(error){
//        $("#tokenAndRoomErrorDiv").html(error);
//    });

    var serverURI = $("#serverURI").val();
   // var accessToken = $("#accessToken").val();
    var topic = $("#topic").val();
    var maxVideo = $("#maxVideo").val();
    var maxAudio = $("#maxAudio").val();
    var hostPassword = $("#hostPassword").val();
    var roomMode=$('input:radio[name="roomMode"]:checked').val();
    var params ={};
   // params['accessToken']=accessToken;
    params['topic']=topic;
    params['maxVideo']=maxVideo;
    params['maxAudio']=maxAudio;
    params['hostPassword']=hostPassword;
    params['accessKey']=accessKey;
    params['secretKey']=secretKey;
    params['roomMode']=roomMode;
    $.post("/getRoomToken",params,function(data){
        console.log(data)
        var roomId = data.roomId;
        var accessTocken = data.accessTocken;
        $("#room_id").val(roomId);
        $("#tokenAndRoomErrorDiv").html("");
        $("#accessToken").val(accessTocken);
        $("#tokenAndRoomErrorDiv").html("");
    },"json");
//    var restJs= new RestJs(serverURI);
//    restJs.createRoom(accessToken, topic, maxVideo,maxAudio,hostPassword,roomMode,function(roomId){
//        $("#room_id").val(roomId);
//        $("#tokenAndRoomErrorDiv").html("");
//    },function(error){
//        $("#tokenAndRoomErrorDiv").html(error);
//    });
}
function yaoqingJoin(){
    var userNames = $("#userNames").val();
    var room_id = $("#room_id").val();
    var accessTocken = $("#accessToken").val();
    var params ={};
    // params['accessToken']=accessToken;
    params['userNames']=userNames;
    params['room_id']=room_id;
    params['accessTocken']=accessTocken;
    $.post("/yaoqingJoin",params,function(data){
        console.log(data);
        alert("邀请成功！");
    },"json");
}
</script>
<script type="text/javascript">
    var userName="${sessionScope.userName}";
    var webSocket =
            new WebSocket('ws://localhost:8080/websocketTest?userName='+userName);
    webSocket.onerror = function(event) {
        onError(event)
    };

    webSocket.onopen = function(event) {
        onOpen(event)
    };

    webSocket.onmessage = function(event) {
        onMessage(event)
    };
    webSocket.onclose = function(event) {
        onClose(event)
    };
    function onMessage(event) {
        var data = eval("("+event.data+")");
        console.log(data);
        var str = data.msg;
        var  ss = str.split("-");
        var roomMag = ss[0];
        var accessTocken = ss[1];
//        document.getElementById('messages').innerHTML
//                += '<br />' + data.msg;
      var type = data.type;
//        if(type==1){
//            document.getElementById("userOnLine").innerHTML ='';
//            var html ="";
//            for(var k=0;k<data.user.length;k++){
//                html += data.user[k]+"<br>";
//            }
//            document.getElementById("userOnLine").innerHTML=html;
//        }
        if(type ==5){
            $("#room_id").val(roomMag);
            $("#accessToken").val(accessTocken);
        }
    }

    function onOpen(event) {
       // document.getElementById('messages').innerHTML  = 'Connection established';
    }
    function onClose(event){
       // document.getElementById('messages').innerHTML  = 'Connection established closed';

    }
    function onError(event) {
        alert(event.data);
    }

    function start() {
        var content = document.getElementById("contents").value;
        console.log(content);
        webSocket.send(content);
        return false;
    }
</script>
<script type="text/javascript" src="<%=basePath%>static/js/sha.js"></script>
<script type="text/javascript" src="<%=basePath%>static/js/restJS.js"></script>
<script type="text/javascript" src="<%=basePath%>static/js/sdk_guide.js"></script>
</body>
</html>