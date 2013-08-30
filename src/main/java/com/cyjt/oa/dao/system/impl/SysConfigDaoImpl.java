package com.cyjt.oa.dao.system.impl;

import com.cyjt.core.dao.impl.BaseDaoImpl;
import com.cyjt.oa.dao.system.SysConfigDao;
import com.cyjt.oa.model.system.SysConfig;
import java.util.List;

public class SysConfigDaoImpl extends BaseDaoImpl<SysConfig> implements
		SysConfigDao {
	public SysConfigDaoImpl() {
		super(SysConfig.class);
	}

	public SysConfig findByKey(String key) {
		String hql = "from SysConfig vo where vo.configKey=?";
		Object[] objs = { key };
		List list = findByHql(hql, objs);
		return (SysConfig) list.get(0);
	}

	public List<SysConfig> findConfigByTypeKey(String typeKey) {
		String hql = "from SysConfig vo where vo.typeKey=?";
		Object[] objs = { typeKey };
		return findByHql(hql, objs);
	}

	public List findTypeKeys() {
		String sql = "select vo.typeKey from SysConfig vo group by vo.typeKey";
		return findByHql(sql);
	}
}
