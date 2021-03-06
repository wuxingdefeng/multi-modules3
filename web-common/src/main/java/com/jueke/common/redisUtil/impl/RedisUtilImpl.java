package com.jueke.common.redisUtil.impl;

import com.jueke.common.redisUtil.RedisUtilInter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2017/5/10.
 */
@Service
public class RedisUtilImpl implements RedisUtilInter {
    @Autowired
    private RedisTemplate redisTemplate;
    private Logger logger= LoggerFactory.getLogger(this.getClass());

    public boolean setString(String key, Object value,long time) {
        try {
            ValueOperations vo = redisTemplate.opsForValue();
            vo.set(key,value);
            if(time>0)redisTemplate.expire(key,time, TimeUnit.SECONDS);
            return true;
        }catch (Exception e){
            logger.error("redis插入string失败key:"+key+",value:"+value,e);
        }
        return false;
    }

    public Object getString(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public boolean setList(String key, List<?> value, long time){
        try {
            ListOperations vo = redisTemplate.opsForList();
            vo.leftPush(key,value);
            if(time>0)redisTemplate.expire(key,time,TimeUnit.SECONDS );  // TimeUnitSECONDS
            return true;
        }catch (Exception e){
            logger.error("redis插入list失败key:"+key+",value:"+value,e);
        }
        return false;
    }
    public Object getList(String key){
        ListOperations vo = redisTemplate.opsForList();
      // return  vo.range(key,0,-1);
       // return vo.rightPop(key);
        return vo.leftPop(key);
    }

    public boolean setHashMap(String key, Map<String,?> value,long time){
        try {
            HashOperations vo = redisTemplate.opsForHash();
            vo.putAll(key,value);
            if(time>0)redisTemplate.expire(key,time, TimeUnit.SECONDS);
            return true;
        }catch (Exception e){
            logger.error("redis插入hashMap失败key:"+key+",value:"+value,e);
        }
        return false;
    }

    public Object getHashMap(String key){
        return redisTemplate.opsForHash().entries(key);
    }

    public void deleteKey(String key){
        redisTemplate.delete(key);
    }

    public boolean containsKey(String key){
        return redisTemplate.hasKey(key);
    }

}
