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
        System.out.println("--------------------------------------------------------"+userName);
        System.out.println("-------------------------e-------------------------------"+userName);
        System.out.println("------------------------ee--------------------------------"+userName);
        System.out.println("------------------------e-------------------------------"+userName);
        System.out.println("--------------------------------------------------------"+userName);
        //qSysAdminService.getAdminList();
        session.setAttribute("userName",userName);
        return "/index";
    }
    @RequestMapping("/login")
    public String goLogin(){
        return "/login";
    }
    @ResponseBody
    @RequestMapping("/webSozz")
    public String webSocketTestP(){
        qSysAdminService.webSocketTestP();
        return "success";
    }
}
