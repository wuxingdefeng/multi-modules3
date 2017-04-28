package com.jueke.common.webSocket;


import com.jueke.model.websocket.Message;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by Administrator on 2017/4/24.
 */
@ServerEndpoint("/websocketTest")
public class WebSocketTest {

    public static final List<Session> connections = new ArrayList<Session>();
    public static final List<String> userOnLine = new ArrayList<String>();
    public static  Message m;



    @OnMessage
    public void onMessage(String message, Session session) throws IOException, InterruptedException {
        System.out.println("接收到消息"+"--------------"+message);
       // String userStr = session.getQueryString();
        //发送消息给客户端
       // session.getBasicRemote().sendText("This is the first server message");
        //int sentMessages =0;
        //session.getQueryString().getBytes("iso8859-1","UTF-8")
        String userStr = URLDecoder.decode(session.getQueryString(),"UTF-8");
       // = new String(.getBytes("d"));
        m.setType(1);
        System.out.println(userStr.split("=")[1]+"00000000000000000000000000");
        m.setMsg("欢迎新人到来"+userStr.split("=")[1]);
       // while (sentMessages <3){
        for(Session s :connections){
            s.getBasicRemote().sendText(m.toJson(m));
        }

        // s.getBasicRemote().sendText("This is an intermediate server message. Count:"+sentMessages);
          //  Thread.sleep(5000);
        //    sentMessages++;
       // }

        //发送最后一个消息
        //session.getBasicRemote().sendText("This is the last server message");
    }
    @OnOpen
    public void onOpen(Session session) throws Exception{
       connections.add(session);
        String userStr = URLDecoder.decode(session.getQueryString(),"UTF-8");
        userOnLine.add(userStr.split("=")[1]);
        if(m ==null){
            m= new Message();
        }
        m.setUser(userOnLine);

    }
    @OnClose
    public void onClose(Session session) throws UnsupportedEncodingException{
        connections.remove(session);
        String userStr = URLDecoder.decode(session.getQueryString(),"UTF-8");
        userOnLine.remove(userStr.split("=")[1]);
        System.out.println("Connection closed");
    }

    public static List<Session> getConnections() {
        return connections;
    }

    public static List<String> getUserOnLine() {
        return userOnLine;
    }
}
