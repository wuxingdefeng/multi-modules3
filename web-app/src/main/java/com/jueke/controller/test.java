package com.jueke.controller;

/**
 * Created by Administrator on 2017/3/30.
 */
public class test {
    public static void main(String[] args) {
                //ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
               // Math math = (Math) ctx.getBean("math");
              //  userService.add();
               //  math.add(1,2);
        int[] qb ={32,34,12,77,54,28,65,9,73,93,23};
        for(int i=0;i<qb.length-1;i++){
            for(int j=i;j<qb.length-1;j++){
                int temp =qb[j+1];
                if(temp>qb[i]){
                    qb[j+1]=qb[i];
                    qb[i]=temp;
                }
            }
        }


        for(int z:qb){
            System.out.println(z);
        }
      System.out.println(2.415*8.29);
    }
}
