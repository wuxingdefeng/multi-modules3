package com.jueke.common.webSocket;

import com.google.gson.Gson;

import java.util.List;

/**
 * Created by Administrator on 2017/4/25.
 */
public class Message {
    private int type;
    private List<String> user;
    private String msg;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public List<String> getUser() {
        return user;
    }

    public void setUser(List<String> user) {
        this.user = user;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
    public String toJson(Message message){
        Gson gson = new Gson();
         return gson.toJson(message).toString();
    }
}
