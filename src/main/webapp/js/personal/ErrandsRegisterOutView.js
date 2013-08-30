Ext.ns("ErrandsRegisterOutView");var ErrandsRegisterOutView=function(){return new Ext.Panel({id:"ErrandsRegisterOutView",title:"外出情况列表",iconCls:"menu-errands",autoScroll:true,items:[new Ext.FormPanel({id:"ErrandsRegisterOutSearchForm",height:40,frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"查询条件:"},{text:"开始时间:从"},{xtype:"datetimefield",format:"Y-m-d H:i:s",name:"Q_startTime_D_GE",editable:false},{text:"到"},{xtype:"datetimefield",format:"Y-m-d H:i:s",name:"Q_endTime_D_LE",editable:false},{text:"审批状态"},{xtype:"combo",hiddenName:"Q_status_SN_EQ",mode:"local",width:80,editable:false,triggerAction:"all",store:[["0","未审批"],["1","通过审批"]]},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var a=Ext.getCmp("ErrandsRegisterOutSearchForm");var b=Ext.getCmp("ErrandsRegisterOutGrid");if(a.getForm().isValid()){$search({searchPanel:a,gridPanel:b});}}},{xtype:"button",text:"重置",iconCls:"btn-reseted",handler:function(){var a=Ext.getCmp("ErrandsRegisterOutSearchForm");a.getForm().reset();}}]}),this.setup()]});};ErrandsRegisterOutView.prototype.setup=function(){return this.grid();};ErrandsRegisterOutView.prototype.grid=function(){var d=new Ext.grid.CheckboxSelectionModel();var a=new Ext.grid.ColumnModel({columns:[d,new Ext.grid.RowNumberer(),{header:"dateId",dataIndex:"dateId",hidden:true},{header:"描述",dataIndex:"descp"},{header:"开始日期",dataIndex:"startTime"},{header:"结束日期",dataIndex:"endTime"},{header:"审批状态",dataIndex:"status",renderer:function(e){if(e=="0"){return"未审批";}if(e=="1"){return"通过审批";}}},{header:"审批意见",dataIndex:"approvalOption"},{header:"审批人",dataIndex:"approvalName"},{header:"管理",dataIndex:"dateId",width:50,sortable:false,renderer:function(h,g,e,k,f){var j=e.data.dateId;var i='<button title="删除" value=" " class="btn-del" onclick="ErrandsRegisterOutView.remove('+j+')">&nbsp;&nbsp;</button>';i+='&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ErrandsRegisterOutView.edit('+j+')">&nbsp;&nbsp;</button>';return i;}}],defaults:{sortable:true,menuDisabled:false,width:100}});var b=this.store();b.load({params:{start:0,limit:25}});var c=new Ext.grid.GridPanel({id:"ErrandsRegisterOutGrid",tbar:this.topbar(),store:b,trackMouseOver:true,disableSelection:false,loadMask:true,autoHeight:true,cm:a,sm:d,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new Ext.PagingToolbar({pageSize:25,store:b,displayInfo:true,displayMsg:"当前显示从{0}至{1}， 共{2}条记录",emptyMsg:"当前没有记录"})});c.addListener("rowdblclick",function(g,f,h){g.getSelectionModel().each(function(e){ErrandsRegisterOutView.edit(e.data.dateId);});});return c;};ErrandsRegisterOutView.prototype.store=function(){var a=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/personal/listErrandsRegister.do"}),baseParams:{"Q_flag_SN_EQ":2},reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"dateId",type:"int"},{name:"userName",mapping:"appUser.fullname"},"descp","startTime","endTime","approvalId","status","approvalOption","approvalName","flag"]}),remoteSort:true});a.setDefaultSort("dateId","desc");return a;};ErrandsRegisterOutView.prototype.topbar=function(){var a=new Ext.Toolbar({id:"ErrandsRegisterOutFootBar",height:30,bodyStyle:"text-align:left",items:[{iconCls:"btn-add",text:"添加外出单",xtype:"button",handler:function(){new ErrandsRegisterOutForm();}},{iconCls:"btn-del",text:"删除外出单",xtype:"button",handler:function(){var d=Ext.getCmp("ErrandsRegisterOutGrid");var b=d.getSelectionModel().getSelections();if(b.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var e=Array();for(var c=0;c<b.length;c++){e.push(b[c].data.dateId);}ErrandsRegisterOutView.remove(e);}}]});return a;};ErrandsRegisterOutView.remove=function(b){var a=Ext.getCmp("ErrandsRegisterOutGrid");Ext.Msg.confirm("信息确认","您确认要删除该记录吗？",function(c){if(c=="yes"){Ext.Ajax.request({url:__ctxPath+"/personal/multiDelErrandsRegister.do",params:{ids:b},method:"post",success:function(){Ext.ux.Toast.msg("信息提示","成功删除所选记录！");a.getStore().reload({params:{start:0,limit:25}});}});}});};ErrandsRegisterOutView.edit=function(a){new ErrandsRegisterOutForm(a);};