package com.jueke.dao.intef;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/12/8.
 */
public interface CommonDAO<T> {
    /**
     * 新增
     *
     * @param mapper
     * @param t
     */
    public void insert(T t);

    /**
     * 修改
     *
     * @param mapper
     * @param t
     */
    public void update(T t);

    /**
     * 删除
     *
     * @param mapper
     * @param t
     */
    public void delete(String pk);

    /**
     * 查询
     *
     * @param mapper
     * @param t
     * @return
     */
    public T get(String pk);
    /**
     * 列表
     *
     * @param mapper
     * @param t
     * @return
     */
    public List<T> list(T t);
    /**
     * 返回listMap
     * @param params
     * @return
     */
    public List<Map<String,Object>> listMap(Map<String, Object> params);

    /**
     * 统计
     *
     * @param t
     * @return
     */
    public int count(T t);
}
