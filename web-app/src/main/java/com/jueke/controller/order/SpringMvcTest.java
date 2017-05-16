package com.jueke.controller.order;

import com.jueke.service.intef.order.QSysAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2017/3/28.
 */
@Controller
public class SpringMvcTest {

    @Autowired
    private QSysAdminService qSysAdminService;

    @RequestMapping("/goHome")
    public  String goHome(String userName, HttpServletRequest request, HttpSession session){

        qSysAdminService.getAdminList();
        session.setAttribute("userName",userName);
        return "/index";
        //return "/webRTC/index";
    }
    @RequestMapping("/login")
    public String goLogin(){
        return "/login";
     //  return "/webRTC/sdk_guide";
    }
    @ResponseBody
    @RequestMapping("/webSozz")
    public String webSocketTestP(){
        qSysAdminService.webSocketTestP();
        return "success";
    }
    @RequestMapping("/webApp")
    public String webApp(){
        return "/webApp";
    }
    @RequestMapping("/webRTCGuide")
    public String goWebRTCGuide(){
        return "/login";
        //return "/webRTC/sdk_guide";
    }

    /**
     *
     * @param accessKey accessKey
     * @param secretKey  secretKey
     * @param roomMode 类型
     * @param maxVideo 最大视频
     * @param maxAudio 最大音频
     * @param hostPassword  密码
     * @param topic  主题
     * @return
     */
    @ResponseBody
    @RequestMapping("/getRoomToken")
    public Object getRoomToken(String accessKey,String secretKey,String roomMode,int maxVideo,
                               int maxAudio,String hostPassword,String topic){
        Object obj = qSysAdminService.getRoomToken(accessKey,secretKey,roomMode,maxVideo,maxAudio,hostPassword,topic);
        return obj;
    }
    @ResponseBody
    @RequestMapping("/yaoqingJoin")
    public Object yaoqingJoin(String userNames,String room_id,String accessTocken){
        Object obj = qSysAdminService.yaoqingJoin(userNames,room_id,accessTocken);
        return obj;
    }
}
