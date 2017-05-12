package com.jueke.service.impl.order;


import com.jueke.common.UUidUtils.UUIDUtil;
import com.jueke.common.santi.AuthServer;
import com.jueke.common.santi.RestSdk;
import com.jueke.common.santi.RoomServer;
import com.jueke.common.santi.exception.AuthException;
import com.jueke.common.santi.exception.RoomException;
import com.jueke.common.webSocket.WebSocketTest;
import com.jueke.dao.intef.order.QSysAdminDao;
import com.jueke.service.intef.order.QSysAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.websocket.Session;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.jueke.common.webSocket.WebSocketTest.userSessionMap;

/**
 * Created by Administrator on 2016/12/8.
 */
@Service
public class QSysAdminServiceImpl implements QSysAdminService {
    @Autowired
    private QSysAdminDao qSysAdminDao;
   // @Autowired
    //private RedisUtilInter redisUtilInter;


    public Object getAdminList() {
        // UUIDUtil
        UUIDUtil uu = new UUIDUtil();
        for(int i=0;i<100;i++){
            System.out.println(uu.getUUid());
            System.out.println(uu.getUUid());
        }
        Object results = qSysAdminDao.getAdminList();
        List<Map<String,Object>> list = (List<Map<String,Object>>)results;

        for(Map<String,Object> map:list){
                System.out.println(list.size()+":"+map);
        }
        System.out.println("--------------------aop----------------------");
//        System.out.println("--------------------redis----------------------");
//        System.out.println("--------------------redis  String----------------------");
//        redisUtilInter.setString("user1","xiaozhi",-1);
//        System.out.println(redisUtilInter.getString("user1"));
//        List<String> rlist = new ArrayList<String>();
//        rlist.add("a中");
//        rlist.add("b中");
//        rlist.add("c中");
//        rlist.add("d中");
//        redisUtilInter.setList("rlist",rlist,-1);
//         rlist = (List<String>)redisUtilInter.getList("rlist");
//        System.out.println("--------------------redis  list----------------------");
//        for(String s:rlist){
//            System.out.println(s);
//        }
//        Map<String,String> rmap = new HashMap<String, String>();
//        rmap.put("a","a中");
//        rmap.put("b","b中");
//        rmap.put("c","c中");
//        rmap.put("d","d中");
//        redisUtilInter.setHashMap("rmap",rmap,-1);
//        rmap = (HashMap<String,String>)redisUtilInter.getHashMap("rmap");
//        System.out.println("--------------------redis  map----------------------");
//        for(Map.Entry entry:rmap.entrySet()){
//            System.out.println("key:"+entry.getKey()+",value:"+entry.getValue());
//        }
//        boolean isList = redisUtilInter.containsKey("rlist");
//        boolean isMap = redisUtilInter.containsKey("rmap");
//        boolean suijiqqq = redisUtilInter.containsKey("suijiqqq");
//        System.out.println("isList:"+isList+",isMap:"+isMap+",suijiqqq:"+suijiqqq);
//        System.out.println("--------------------redis----------------------");

        return results;
       // return uu.getUUid();
    }


    public void webSocketTestP()  {
        WebSocketTest ws = new WebSocketTest();
        Session ss = WebSocketTest.getConnections().get(0);
        try {

            ss.getBasicRemote().sendText("nihaonihao");
            //  ws.onMessage("nihaoma",ss);
        }catch (Exception e){
            System.out.println("00000000000000000000000000000000000000000000000000000");
            e.printStackTrace();
        }

    }

    public Object getRoomToken(String accessKey, String secretKey, String roomMode, int maxVideo, int maxAudio, String hostPassword, String topic) {
        Map<String,Object> result = new HashMap<String,Object>();
        String restServer= "121.41.102.126:8080";
         accessKey= "demo_access";
         secretKey= "demo_secret";

        RestSdk.init(restServer);
        AuthServer authServer = new  AuthServer(accessKey,secretKey);
        try{
            //获取认证
            String accessTocken = authServer.getAccessTocken();
            System.out.println("ACCESS_TOKEN:"+ accessTocken);
            result.put("accessTocken",accessTocken);
            //获取房间
           try{
                String roomId = RoomServer.createRoom(accessTocken,topic,maxVideo,maxAudio,hostPassword,roomMode);
                System.out.println("roomId:"+ roomId);
               result.put("roomId",roomId);
            }catch(RoomException roomException){
                System.out.println(roomException.getKey() + ":" + roomException.getMessage());
            }
        }catch(AuthException authException){
            System.out.println(authException.getKey() + ":" + authException.getMessage());
        }

        return result;
    }

    public Object yaoqingJoin(String userNames, String room_id,String accessTocken) {
        WebSocketTest ws = new WebSocketTest();
        try {
            Session s = userSessionMap.get(userNames);
            if(null != s){
                ws.onMessage(room_id+"-"+accessTocken,s);
            }
            //  ws.onMessage(room_id,ss);
        }catch (Exception e){
            System.out.println("00000000000000000000000000000000000000000000000000000");
            e.printStackTrace();
        }
        return "success";
    }

}
