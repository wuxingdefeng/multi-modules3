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
<meta name="renderer" content="webkit" />

<script type="text/javascript" src="<%=basePath%>js/cn.tee3.avd-2.2.8.0.min.js?20160415021957"></script>

<script type="text/javascript" src="../js/lib/jsbase64.js"></script>
<script type="text/javascript" src="../js/lib/jquery.min.js"></script>
<script type="text/javascript" src="../js/lib/Long.js"></script>
<script type="text/javascript" src="../js/lib/bytebuffer.js"></script>
<script type="text/javascript" src="../js/lib/log4javascript.js"></script>
<script type="text/javascript" src="../js/lib/protobuf.js"></script>
<script type="text/javascript" src="../js/lib/adapter.js"></script>
<script type="text/javascript" src="../js/lib/SdpSerializer.js"></script>
<script type="text/javascript" src="../js/lib/when.js"></script>
<script type="text/javascript" src="../js/lib/eventUtil.js"></script>

<script type="text/javascript" src="../js/util/constant.js"></script>
<script type="text/javascript" src="../js/util/enum.js"></script>
<script type="text/javascript" src="../js/util/util.js"></script>
<script type="text/javascript" src="../js/util/moduleBase.js"></script>
<script type="text/javascript" src="../js/util/error.js"></script>
<script type="text/javascript" src="../js/util/cmdProtobufCoded.js"></script>

<script type="text/javascript" src="../js/detect/browserInfo.js"></script>
<script type="text/javascript" src="../js/detect/OSInfo.js"></script>
<script type="text/javascript" src="../js/detect/checkGetUserMedia.js"></script>
<script type="text/javascript" src="../js/detect/checkRTCPeerConnection.js"></script>
<script type="text/javascript" src="../js/detect/checkDataChannel.js"></script>
<script type="text/javascript" src="../js/detect/browserDetect.js"></script>

<script type="text/javascript" src="../js/stream/stream.js"></script>
<script type="text/javascript" src="../js/stream/video.js"></script>
<script type="text/javascript" src="../js/stream/audio.js"></script>
<script type="text/javascript" src="../js/stream/screen.js"></script>
<script type="text/javascript" src="../js/stream/streamUtil.js"></script>

<script type="text/javascript" src="../js/server/logServer.js"></script>
<script type="text/javascript" src="../js/server/restServer.js"></script>
<script type="text/javascript" src="../js/server/masterServer.js"></script>
<script type="text/javascript" src="../js/server/p2pServer.js"></script>

<script type="text/javascript" src="../js/avdEngine.js"></script>
<script type="text/javascript" src="../js/room/room.js"></script>
<script type="text/javascript" src="../js/sdp/sdp.js"></script>

<script type="text/javascript" src="../js/connect/traceableWebsocket.js"></script>
<script type="text/javascript" src="../js/connect/traceablePeerConnection.js"></script>
<script type="text/javascript" src="../js/connect/traceableP2PPeerConnection.js"></script>
<script type="text/javascript" src="../js/connect/signalFactory.js"></script>

<script type="text/javascript" src="../js/record/recordRestServer.js"></script>
<script type="text/javascript" src="../js/record/record.js"></script>


<script type="text/javascript" src="../js/live/liveRestServer.js"></script>
<script type="text/javascript" src="../js/live/live.js"></script>

<script type="text/javascript" src="../js/user/user.js"></script>

<script type="text/javascript" src="../js/message/messageManager.js"></script>

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

<title>live SDK Guide</title>
<body>
获取访问令牌
<div id='done1'><a href="#" onclick="document.getElementById('tokenAndRoomDiv').style.display = 'block';document.getElementById('done1').style.display = 'none';document.getElementById('done2').style.display = 'block';" title="展开操作">↓↓↓</a></div>
<div id='done2' style="display: none;"><a href="#" onclick="document.getElementById('tokenAndRoomDiv').style.display = 'none';document.getElementById('done2').style.display = 'none';document.getElementById('done1').style.display = 'block';" title="隐藏操作">↑↑↑</a></div>

<br>
<div id="tokenAndRoomDiv" style="display: none;">
    ***注：该实现只在demo中使用，因令牌安全问题，生产环境中该逻辑需要在服务器端实现；

    <br><br>&nbsp;&nbsp;&nbsp;&nbsp; access_key:
    <input type="text" placeholder="请输入access_key" value="demo_access" id="accessKey" name="accessKey" />&nbsp;&nbsp; secret_key:
    <input type="text" placeholder="请输入demo_secret" value="demo_secret" id="secretKey" name="secretKey" />&nbsp;&nbsp; 服务器MCU端口:
    <input type="text" placeholder="请输入服务器MCU端口" value="10.10.123.149:8080" id="serverURI" name="serverURI" />&nbsp;&nbsp;
    <input type="button" value="获取访问令牌" onclick="getAccessToken();" />

</div>
<br>
<div id="errorShow"></div>
<HR> 直播接口4——创建并开始直播
<br>
<br>
***注：选择的用户，其发布的视频编解码要求H264
<br>
<br> 服务器server admin端口:<input type="text" placeholder="请输入服务器server_admin对应的IP及端口" value="10.10.123.149:8050" id="serverAdminUrl" name="serverAdminUrl" />&nbsp;&nbsp; 访问令牌:
<input type="text" placeholder="请输入访问令牌" id="accessToken" name="accessToken" value="" style="width:520px;" />
<br><br> 直播名称:
<input type="text" placeholder="请输入直播名称" value="testLive" id="name" name="name" />&nbsp;&nbsp; 直播标签:
<input type="text" placeholder="请输入直播标签" value="" id="tag" name="tag" />&nbsp;&nbsp; 房间Id:
<input type="text" placeholder="请输入房间Id" value="" id="roomId" name="rommId" />&nbsp;&nbsp; 用户Id:
<input type="text" placeholder="请输入用户Id" value="" id="userId" name="userId" />&nbsp;&nbsp; 音频类型:
<select id='audioType'></select>&nbsp;&nbsp; 视频类型:
<select id='videoType'></select>&nbsp;&nbsp;
<input type="button" value="创建直播" onclick="createLive();" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input type="button" id="rtmpPlay" name="rtmpPlay" value="RTMP 网页播放" onclick="rtmpPlay();" />
<input type="button" id="hlsPlay" name="hlsPlay" value="HLS 产生二维码" onclick="hlsPlay();" />
<div>
    <div>创建结果显示:</div>
    <div>
        <div id="createResultShow"></div>
    </div>
</div>
<br>
<br>
<HR> 直播接口3——停止直播
<br> 停止接口直播Id:
<input type="text" placeholder="请输入直播Id" id="stopLiveId" name="stopLiveId" value="" />
<input type="button" id="stopLive" name="stopLive" value="停止直播" onclick="stopLive();" />
<div>
    <div>停止结果显示:</div>
    <div>
        <div id="stopResultShow"></div>
    </div>
</div>
<br>
<br>
<HR> 直播接口5——获取直播
<br> 获取接口直播Id:
<input type="text" placeholder="请输入直播Id" id="getLiveId" name="getLiveId" value="" />
<input type="button" id="getLive" name="getLive" value="获取直播" onclick="getLive();" />
<div>
    <div>获取结果显示:</div>
    <div>
        <div id="getResultShow">

        </div>
    </div>
</div>
<br>
<br>
<HR> 直播接口6——删除直播
<br> 删除接口直播Id:
<input type="text" placeholder="请输入直播Id" id="deleteLiveId" name="deleteLiveId" value="" />
<input type="button" id="deleteLive" name="deleteLive" value="删除直播" onclick="deleteLive();" />
<div>
    <div>删除结果显示:</div>
    <div>
        <div id="deleteResultShow">

        </div>
    </div>
</div>
<br>
<br>
<HR> 直播接口7——筛选直播
<br>
筛选条件:
<input type="text" placeholder="开始数" id="begin" name="begin" value="" />
<input type="text" placeholder="总计数" id="count" name="count" value="" />
<input type="text" placeholder="过滤条件" id="filter" name="filter" value="" />
<input type="button" id="findLives" name="findLives" value="筛选直播" onclick="findLives();" />
<div>
    <div>筛选结果显示:</div>
    <div>
        <div id="findResultShow">

        </div>
    </div>
</div>
<br>
<br>
<HR>

<script type="text/javascript" src="<%=basePath%>js/sha.js"></script>
<script type="text/javascript" src="<%=basePath%>js/restJS.js"></script>
<script type="text/javascript" src="<%=basePath%>js/live.js"></script>
</body>
</html>