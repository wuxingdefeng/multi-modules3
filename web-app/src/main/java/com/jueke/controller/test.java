package com.jueke.controller;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by Administrator on 2017/3/30.
 */
public class test {
    public static void main(String[] args) {
                ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
                Math math = (Math) ctx.getBean("math");
              //  userService.add();
                 math.add(1,2);

    }
}
