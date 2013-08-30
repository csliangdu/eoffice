OutMailSetView=Ext.extend(Ext.Panel,{searchPanel:null,gridPanel:null,store:null,topbar:null,constructor:function(a){Ext.applyIf(this,a);this.initUIComponents();OutMailSetView.superclass.constructor.call(this,{id:"OutMailSetView",title:"外部邮箱配置",iconCls:"menu-mail_send",region:"center",layout:"border",items:[this.searchPanel,this.gridPanel]});},initUIComponents:function(){this.searchPanel=new Ext.FormPanel({id:"OutMailSetSearchForm",region:"north",height:40,frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"查询条件:"},{text:"用户名称"},{width:80,xtype:"textfield",name:"Q_userName_S_LK"},{text:"smtp端口"},{width:80,xtype:"textfield",name:"Q_smtpPort_S_LK"},{text:"pop端口"},{width:80,xtype:"textfield",name:"Q_popPort_S_LK"},{xtype:"button",text:"查询",iconCls:"search",handler:this.search.createCallback(this)}]});this.store=new Ext.data.JsonStore({url:__ctxPath+"/system/listOutMailSet.do",totalProperty:"totalCounts",remoteSort:true,root:"result",id:"id",fields:[{name:"id",type:"int"},"userName","mailAddress","smtpHost","smtpPort","popHost","popPort"]});this.store.setDefaultSort("id","desc");this.store.load({params:{start:0,limit:25}});var b=[];if(isGranted("_OutMailSetDelete")){b.push({iconCls:"btn-del",qtip:"删除",style:"margin:0 3px 0 3px"});}if(isGranted("_OutMailSetEdit")){b.push({iconCls:"btn-mail_edit",qtip:"编辑",style:"margin:0 3px 0 3px"});}this.rowActions=new Ext.ux.grid.RowActions({header:"管理",width:80,actions:b});var c=new Ext.grid.CheckboxSelectionModel();var a=new Ext.grid.ColumnModel({columns:[c,new Ext.grid.RowNumberer(),{header:"id",dataIndex:"id",hidden:true},{header:"用户名称",dataIndex:"userName"},{header:"外部邮件地址",dataIndex:"mailAddress"},{header:"smtp主机",dataIndex:"smtpHost"},{header:"smtp端口",dataIndex:"smtpPort"},{header:"pop主机",dataIndex:"popHost"},{header:"pop端口",dataIndex:"popPort"},this.rowActions],defaults:{sortable:true,menuDisabled:false,width:100}});this.topbar=new Ext.Toolbar({height:30,bodyStyle:"text-align:left",items:[]});if(isGranted("_OutMailSetAdd")){this.topbar.add(new Ext.Button({text:"添加邮箱",iconCls:"btn-add",handler:this.createRecord,scope:this}));}if(isGranted("_OutMailSetDelete")){this.topbar.add(new Ext.Button({iconCls:"btn-del",text:"删除邮箱",handler:this.delRecords,scope:this}));}this.gridPanel=new Ext.grid.GridPanel({id:"OutMailSetGrid",tbar:this.topbar,region:"center",stripeRows:true,store:this.store,trackMouseOver:true,disableSelection:false,loadMask:true,autoHeight:true,cm:a,sm:c,plugins:this.rowActions,viewConfig:{forceFit:true,autoFill:true,forceFit:true},bbar:new Ext.PagingToolbar({pageSize:25,store:this.store,displayInfo:true,displayMsg:"当前页记录索引{0}-{1}， 共{2}条记录",emptyMsg:"当前没有记录"})});this.gridPanel.addListener("rowdblclick",function(f,d,g){f.getSelectionModel().each(function(e){new OutMailSetForm({id:e.data.id}).show();});});this.rowActions.on("action",this.onRowAction,this);},search:function(c){var a=Ext.getCmp("OutMailSetSearchForm");if(a.getForm().isValid()){var e=Ext.getCmp("OutMailSetGrid");var b=e.getStore();var f=Ext.Ajax.serializeForm(a.getForm().getEl());var d=Ext.urlDecode(f);d.start=0;d.limit=b.baseParams.limit;b.baseParams=d;e.getBottomToolbar().moveFirst();}},createRecord:function(){new OutMailSetForm().show();},delByIds:function(a){Ext.Msg.confirm("信息确认","您确认要删除所选记录吗？",function(b){if(b=="yes"){Ext.Ajax.request({url:__ctxPath+"/system/multiDelOutMailSet.do",params:{ids:a},method:"POST",success:function(c,d){Ext.ux.Toast.msg("操作信息","成功删除该邮箱帐号！");Ext.getCmp("OutMailSetGrid").getStore().reload();},failure:function(c,d){Ext.ux.Toast.msg("操作信息","操作出错，请联系管理员！");}});}});},editRecord:function(a){new OutMailSetForm({id:a.data.id}).show();},delRecords:function(){var c=Ext.getCmp("OutMailSetGrid");var a=c.getSelectionModel().getSelections();if(a.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var d=Array();for(var b=0;b<a.length;b++){d.push(a[b].data.id);}this.delByIds(d);},onRowAction:function(c,a,d,e,b){switch(d){case"btn-del":this.delByIds(a.data.id);break;case"btn-mail_edit":this.editRecord(a);break;default:break;}}});