package com.cyjt.test.system;

import com.cyjt.oa.dao.system.AppFunctionDao;
import com.cyjt.oa.model.system.AppFunction;
import com.cyjt.test.BaseTestCase;
import javax.annotation.Resource;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

public class AppFunctionDaoTestCase extends BaseTestCase {

	@Resource
	private AppFunctionDao appFunctionDao;

	@Test
	@Rollback(false)
	public void add() {
		AppFunction appFunction = new AppFunction();

		this.appFunctionDao.save(appFunction);
	}
}
