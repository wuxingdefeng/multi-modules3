package com.jueke.common.redisUtil;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface RedisUtilInter {
    /**
     * 字符串插入
     * @param key
     * @param value
     * @param time 大于0才设置保存时间（秒）
     * @return
     */
    public boolean  setString(String key,Object value,long time);

    /**
     * 获取字符串
     * @param key
     * @return
     */
    public Object getString(String key);

    /**
     * list插入
     * @param key
     * @param value
     *  @param time 大于0才设置保存时间（秒）
     * @return
     */
    public boolean setList(String key, List<?> value,long time);

    /**
     * list获取值
     * @param key
     * @return
     */
    public Object getList(String key);

    /**
     * map放入值
     * @param key
     * @param value
     * @param time 大于0才设置保存时间（秒）
     * @return
     */
    public boolean setHashMap(String key, Map<String,?> value,long time);

    /**
     * 获取map值
     * @param key
     * @return
     */
    public Object getHashMap(String key);

    /**
     * 删除
     * @param key
     */
    public void deleteKey(String key);

    /**
     * 判断key是否存在
     * @param key
     * @return
     */
    public boolean containsKey(String key);
}
