package com.jueke.common.webSocket;



import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by Administrator on 2017/4/24.
 */
@ServerEndpoint("/websocketTest")
public class WebSocketTest {

    public static final List<Session> connections = new ArrayList<Session>();
    public static final List<String> userOnLine = new ArrayList<String>();
    public static final List<Map<String,Session>> userSession = new ArrayList<Map<String, Session>>();
    public static final Map<String,Session> userSessionMap = new HashMap<String, Session>();
    public static  Message m;



    @OnMessage
    public void onMessage(String message, Session session) throws IOException, InterruptedException {
        System.out.println("接收到消息"+"--------------"+message);
        String userStr = URLDecoder.decode(session.getQueryString(),"UTF-8");
        m.setType(5); //视频打开
        //System.out.println(userStr.split("=")[1]+"00000000000000000000000000");
        m.setMsg(message);
        session.getBasicRemote().sendText(m.toJson(m));
        /*for(Session s :connections){
            s.getBasicRemote().sendText(m.toJson(m));
        }*/

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
        userSessionMap.put(userStr.split("=")[1],session);
       // String userStr = URLDecoder.decode(session.getQueryString(),"UTF-8");
        m.setType(1);
        System.out.println(userStr.split("=")[1]+"00000000000000000000000000");
        m.setMsg("欢迎新人到来"+userStr.split("=")[1]);
        for(Session s :connections){
            s.getBasicRemote().sendText(m.toJson(m));
        }

    }
    @OnClose
    public void onClose(Session session) throws Exception{
        connections.remove(session);
        String userStr = URLDecoder.decode(session.getQueryString(),"UTF-8");
        userOnLine.remove(userStr.split("=")[1]);
        userSessionMap.put(userStr.split("=")[1],session);
        m.setType(1);
        System.out.println(userStr.split("=")[1]+"00000000000000000000000000");
        m.setMsg("欢送"+userStr.split("=")[1]+"离开了");
        for(Session s :connections){
            s.getBasicRemote().sendText(m.toJson(m));
        }
    }

    public static List<Session> getConnections() {
        return connections;
    }

    public static List<String> getUserOnLine() {
        return userOnLine;
    }
}
