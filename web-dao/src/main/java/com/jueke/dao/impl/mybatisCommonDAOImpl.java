package com.jueke.dao.impl;




import com.jueke.common.mybatisUtil.ReflectUtils;
import com.jueke.dao.intef.CommonDAO;
import org.mybatis.spring.SqlSessionTemplate;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/12/8.
 */
public class mybatisCommonDAOImpl<T> implements CommonDAO<T> {
    private static final String SQL_INSERT = "insert";

    private static final String SQL_UPDATE = "update";

    private static final String SQL_DELETE = "delete";

    private static final String SQL_GET    = "get";

    private static final String SQL_LIST   = "list";

    private static final String SQL_COUNT  = "count";

    //protected SqlSession sqlSession;
    @Resource(name = "sqlSessionTemplate")
    protected SqlSessionTemplate sqlSessionTemplate;

    /**
     * 注入sqlSession
     *
     * @param sqlSessionTemplate
     */
   /* public void setSqlSession(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }*/


    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    //public void setsqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
//        this.sqlSessionTemplate = sqlSessionTemplate;
//    }

    /**
     * 获取默认SqlMapping命名空间。 使用泛型参数中业务实体类型的全限定名作为默认的命名空间。 如果实际应用中需要特殊的命名空间，可由子类重写该方法实现自己的命名空间规则。
     *
     * @return 返回命名空间字符串
     */
    @SuppressWarnings("unchecked")
    protected String getDefaultSqlNamespace() {
        Class<T> clazz = ReflectUtils.getClassGenricType(this.getClass());
        String nameSpace = clazz.getName();

        return nameSpace;
    }



    public void insert(Object o) {
        sqlSessionTemplate.insert(getDefaultSqlNamespace() + "." + SQL_INSERT, o);
    }

    public void update(Object o) {
        int i= sqlSessionTemplate.update(getDefaultSqlNamespace() + "." + SQL_UPDATE, o);
        System.out.println(i);
    }


    public void delete(String pk) {
        sqlSessionTemplate.delete(getDefaultSqlNamespace() + "." + SQL_DELETE, pk);
    }


    public T get(String pk) {
        T o = sqlSessionTemplate.selectOne(getDefaultSqlNamespace() + "." + SQL_GET, pk);
        return o;
    }


    public List list(Object o) {
        List<T> list = sqlSessionTemplate.selectList(getDefaultSqlNamespace() + "." + SQL_LIST, o);
        return list;
    }


    public int count(Object o) {
        int count = sqlSessionTemplate.selectOne(getDefaultSqlNamespace() + "." + SQL_COUNT, o);
        return count;
    }


    public List<Map<String, Object>> listMap(Map params) {
        return sqlSessionTemplate.selectList(getDefaultSqlNamespace() + "." + SQL_LIST,params);
    }
}
