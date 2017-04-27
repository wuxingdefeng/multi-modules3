<%@ page language="java" import="java.util.*" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!Doctype html>
<html>
<body>
<h2>Hello World!</h2>

<div>

    <input type="submit" value="Start" onclick="start()">
</div>
<div id="userName">${sessionScope.userName}</div>
<div>

<div id="messages" style="width:400px;height:400px;float: left;border: 1px solid #d0d0d0;overflow: scroll"></div>
<div id="userOnLine" style="width:100px;height:400px;float: left;border: 1px solid #d0d0d0;margin-left: 10px;"></div>
</div>
<script type="text/javascript">
    var userName="${sessionScope.userName}";
    var webSocket =
            new WebSocket('ws://localhost:8089/websocketTest?userName='+userName);
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
        document.getElementById('messages').innerHTML
                += '<br />' + data.msg;
        var type = data.type;
        if(type==1){
            document.getElementById("userOnLine").innerHTML ='';
            var html ="";
            for(var k=0;k<data.user.length;k++){
                html += data.user[k]+"<br>";
            }
            document.getElementById("userOnLine").innerHTML=html;
        }
    }

    function onOpen(event) {
        document.getElementById('messages').innerHTML
                = 'Connection established';
    }
    function onClose(event){
        document.getElementById('messages').innerHTML
                = 'Connection established closed';

    }
    function onError(event) {
        alert(event.data);
    }

    function start() {
        webSocket.send('hello');
        return false;
    }
</script>
</body>
</html>