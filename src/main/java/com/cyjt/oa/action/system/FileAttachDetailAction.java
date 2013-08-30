package com.cyjt.oa.action.system;

import com.cyjt.core.web.action.BaseAction;
import com.cyjt.oa.model.system.FileAttach;
import com.cyjt.oa.service.system.FileAttachService;
import javax.annotation.Resource;

public class FileAttachDetailAction extends BaseAction {

	@Resource
	private FileAttachService fileAttachService;
	private Long fileId;
	private FileAttach fileAttach;

	public Long getFileId() {
		return this.fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	public FileAttach getFileAttach() {
		return this.fileAttach;
	}

	public void setFileAttach(FileAttach fileAttach) {
		this.fileAttach = fileAttach;
	}

	@Override
	public String execute() throws Exception {
		this.fileAttach = (this.fileAttachService.get(this.fileId));
		return "success";
	}
}
