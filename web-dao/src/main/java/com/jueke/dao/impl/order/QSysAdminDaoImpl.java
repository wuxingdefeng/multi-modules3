package com.jueke.dao.impl.order;


import com.jueke.dao.impl.mybatisCommonDAOImpl;
import com.jueke.dao.intef.order.QSysAdminDao;
import com.jueke.model.system.QSysAdminDo;
import org.springframework.stereotype.Repository;


/**
 * Created by Administrator on 2016/12/8.
 */
 @Repository
public class QSysAdminDaoImpl extends mybatisCommonDAOImpl<QSysAdminDo> implements QSysAdminDao {



    public Object getAdminList() {
        System.out.println(getDefaultSqlNamespace());
        return sqlSessionTemplate.selectList(getDefaultSqlNamespace() + "." + "getAdminList");
    }


}
