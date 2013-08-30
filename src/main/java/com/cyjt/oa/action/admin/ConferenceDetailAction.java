package com.cyjt.oa.action.admin;

import com.cyjt.core.web.action.BaseAction;
import com.cyjt.oa.model.admin.Conference;
import com.cyjt.oa.service.admin.ConferenceService;
import javax.annotation.Resource;

public class ConferenceDetailAction extends BaseAction {

	@Resource
	private ConferenceService conferenceService;
	private Long confId;
	private Conference conference;

	public Conference getConference() {
		return this.conference;
	}

	public void setConference(Conference conference) {
		this.conference = conference;
	}

	public Long getConfId() {
		return this.confId;
	}

	public void setConfId(Long confId) {
		this.confId = confId;
	}

	@Override
	public String execute() throws Exception {
		this.conference = (this.conferenceService.get(this.confId));
		return "success";
	}
}
