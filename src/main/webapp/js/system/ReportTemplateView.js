Ext.ns("ReportTemplateView");var ReportTemplateView=function(){return new Ext.Panel({id:"ReportTemplateView",title:"报表列表",iconCls:"menu-report",items:[new Ext.FormPanel({id:"ReportTemplateSearchForm",height:40,frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"请输入查询条件:"},{text:"标题"},{xtype:"textfield",name:"Q_title_S_LK"},{text:"描述"},{xtype:"textfield",name:"Q_descp_S_LK"},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var a=Ext.getCmp("ReportTemplateSearchForm");var b=Ext.getCmp("ReportTemplateGrid");if(a.getForm().isValid()){$search({searchPanel:a,gridPanel:b});}}}]}),this.setup()]});};ReportTemplateView.prototype.setup=function(){return this.grid();};ReportTemplateView.prototype.grid=function(){var d=new Ext.grid.CheckboxSelectionModel();var a=new Ext.grid.ColumnModel({columns:[d,new Ext.grid.RowNumberer(),{header:"reportId",dataIndex:"reportId",hidden:true},{header:"标题",dataIndex:"title"},{header:"模版路径",dataIndex:"reportLocation"},{header:"创建时间",dataIndex:"createtime"},{header:"修改时间",dataIndex:"updatetime"},{header:"是否缺省",dataIndex:"isDefaultIn",renderer:function(e){if(e==0){return"否";}else{if(e==1){return"是";}else{return e;}}}},{header:"管理",dataIndex:"reportId",sortable:false,width:55,renderer:function(i,h,f,l,g){var k=f.data.reportId;var e=f.data.title;var j="";if(isGranted("_ReportTemplateQuery")){j='<button title="查看" value=" " class="btn-preview" onclick="ReportTemplateView.preview('+k+",'"+e+"')\"></button>";}if(isGranted("_ReportParamSetting")){j+='&nbsp;<button title="设置参数" value=" " class="btn-setting" onclick="ReportTemplateView.param('+k+",'"+e+"')\"></button>";}if(isGranted("_ReportTemplateDel")&&f.data.isDefaultIn!=1){j+='<button title="删除" value=" " class="btn-del" onclick="ReportTemplateView.remove('+k+')"></button>';}if(isGranted("_ReportTemplateEdit")){j+='&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ReportTemplateView.edit('+k+","+f.data.isDefaultIn+')"></button>';}return j;}}],defaults:{sortable:true,menuDisabled:false,width:100}});var b=this.store();b.load({params:{start:0,limit:25}});var c=new Ext.grid.GridPanel({id:"ReportTemplateGrid",tbar:this.topbar(),store:b,trackMouseOver:true,disableSelection:false,loadMask:true,autoHeight:true,cm:a,sm:d,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new Ext.PagingToolbar({pageSize:25,store:b,displayInfo:true,displayMsg:"当前显示从{0}至{1}， 共{2}条记录",emptyMsg:"当前没有记录"})});c.addListener("rowdblclick",function(g,f,h){g.getSelectionModel().each(function(e){if(isGranted("_ReportTemplateEdit")){ReportTemplateView.edit(e.data.reportId,e.data.isDefaultIn);}});});return c;};ReportTemplateView.prototype.store=function(){var a=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/system/listReportTemplate.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"reportId",type:"int"},"title","descp","reportLocation","createtime","updatetime",{name:"isDefaultIn",type:"int"}]}),remoteSort:true});a.setDefaultSort("reportId","desc");return a;};ReportTemplateView.prototype.topbar=function(){var a=new Ext.Toolbar({id:"ReportTemplateFootBar",height:30,bodyStyle:"text-align:left",items:[]});if(isGranted("_ReportTemplateAdd")){a.add(new Ext.Button({iconCls:"btn-add",text:"添加报表",handler:function(){new ReportTemplateForm(null,0);}}));}if(isGranted("_ReportTemplateDel")){a.add(new Ext.Button({iconCls:"btn-del",text:"删除报表",handler:function(){var d=Ext.getCmp("ReportTemplateGrid");var b=d.getSelectionModel().getSelections();if(b.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var e=Array();for(var c=0;c<b.length;c++){if(b[c].data.isDefaultIn!=1){e.push(b[c].data.reportId);}else{Ext.ux.Toast.msg("操作信息",b[c].data.title+"为缺省报表,不能删除!");}}if(e.length>0){ReportTemplateView.remove(e);}else{Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}}}));}return a;};ReportTemplateView.remove=function(b){var a=Ext.getCmp("ReportTemplateGrid");Ext.Msg.confirm("信息确认","您确认要删除该记录吗？",function(c){if(c=="yes"){Ext.Ajax.request({url:__ctxPath+"/system/multiDelReportTemplate.do",params:{ids:b},method:"post",success:function(){Ext.ux.Toast.msg("操作信息","成功删除秘选记录！");a.getStore().reload({params:{start:0,limit:25}});}});}});};ReportTemplateView.edit=function(b,a){new ReportTemplateForm(b,a);};ReportTemplateView.param=function(b,a){new ReportParamView(b,a);};ReportTemplateView.preview=function(d,a){var b=Ext.getCmp("centerTabPanel");var c=Ext.getCmp("ReportPreview"+d);if(c==null){c=new ReportTemplatePreview(d,a);b.add(c);}else{b.remove("ReportPreview"+d);c=new ReportTemplatePreview(d,a);b.add(c);}b.activate(c);};