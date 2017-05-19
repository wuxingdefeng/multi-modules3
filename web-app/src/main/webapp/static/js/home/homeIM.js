function alert_(message){
	 layer.alert(message, {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 5 //动画类型
		 });
}
//WebSocket
$(function(){
	  var websocket = null;
	  var flog=true;
	   //登录IM
	  if('WebSocket' in window){
		     var href=window.location.href;
		     href=href.split("://")[1];
		     var wssURL=href.split("/")[0];
		     var ID=$("input[name='loginID']").val();
		     websocket = new WebSocket("ws://"+wssURL+"/yun_core/loginPCIM/"+ID);
	  }else{
		     alert_("您当前浏览器暂未支持哦！！");
	  }
	   websocket.onerror = function(){
		   alert_("连接发生错误，暂不能使用通知");
		   flog=false;
	   };
	   //连接成功需要做啥呢
	   websocket.onopen = function(event){
	       if(flog){
	    	   
	       }
	   };
	   //接受到相关消息
	   websocket.onmessage = function(event){
           if(flog){
        	   var json=eval("("+event.data+")");
        	   alert_(json.data);
	       }else{
	    	   flog=false;
	       }
	        
	   };
	   websocket.onclose = function(){
	      /*    if(flog){
	        	  alert_("关闭连接");
		       }else{
		    	   flog=false;
		       }*/
	   };
	   //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	   window.onbeforeunload = function(){
	          websocket.close();
	   };
	   
});