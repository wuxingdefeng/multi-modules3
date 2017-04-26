package com.jueke.controller;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2017/3/30.
 */
@Component
@Aspect
public class MathAdvice {
    @Pointcut("execution(* com.jueke.controller..*.*(..))")
    public void pointCut(){}
    @Before("pointCut()")
    public void before(JoinPoint jp){
        System.out.println("----------前置通知----------");
        System.out.println(jp.getSignature().getName());
    }
    @After("pointCut()")
    public void after(JoinPoint jp){
        Object object[] = jp.getArgs(); // 获取被切函数 的参数
        System.out.println("----------最终通知----------");
    }
}
