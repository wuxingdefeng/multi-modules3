package com.jueke.service.impl.order;


import com.jueke.common.UUidUtils.UUIDUtil;
import com.jueke.common.webSocket.WebSocketTest;
import com.jueke.dao.intef.order.QSysAdminDao;
import com.jueke.service.intef.order.QSysAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.websocket.Session;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/12/8.
 */
@Service
public class QSysAdminServiceImpl implements QSysAdminService {
    @Autowired
    private QSysAdminDao qSysAdminDao;

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

}
