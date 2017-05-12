package com.jueke.service.intef.order;

/**
 * Created by Administrator on 2017/4/25.
 */
public interface QSysAdminService {
    Object getAdminList();

    void webSocketTestP() ;

    Object getRoomToken(String accessKey, String secretKey, String roomMode, int maxVideo, int maxAudio, String hostPassword, String topic);

    Object yaoqingJoin(String userNames, String room_id,String accessTocken);
}
