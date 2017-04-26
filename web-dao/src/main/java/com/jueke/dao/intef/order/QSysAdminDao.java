package com.jueke.dao.intef.order;


import com.jueke.dao.intef.CommonDAO;
import com.jueke.model.system.QSysAdminDo;

/**
 * Created by Administrator on 2016/12/8.
 */
public interface QSysAdminDao extends CommonDAO<QSysAdminDo> {
    Object getAdminList();
}
