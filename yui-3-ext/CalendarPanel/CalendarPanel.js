
YUI.add('calendar-panel',function (Y){
	var myPurgeElement = function(el, recurse, type) {
	    // var oEl = (Y.Lang.isString(el)) ? Y.one(el) : el,
	    var oEl = (Y.Lang.isString(el)) ?  Y.Selector.query(el, null, true) : el,
	        lis = Y.Event.getListeners(oEl, type), i, len, children, child;

	    if (recurse && oEl) {
	        lis = lis || [];
	        children = Y.Selector.query('*', oEl,false);
	        i = 0;
	        len = children.length;
	        for (; i < len; ++i) {
	            child = Event.getListeners(children[i], type);
	            if (child) {
	                lis = lis.concat(child);
	            }
	        }
	    }

	    if (lis) {
	        for (i = 0, len = lis.length; i < len; ++i) {
	            lis[i].detachAll();
	        }
	    }

	};
	
	function CalendarPanel(config)
	{
		r = Y.Array(arguments,0,true) ;
		//config.x = 700 ;

		this.id_cal = 'calendar_node_'  + Y.guid() ;
		id_cont = 'content_calendar_' + Y.guid() ;
		
		var cal = Y.Node.create('<div id="' + id_cont + '"> </div>') ;
		//var cul = Y.Node.create('<div >Text</div>') ;
		this.calNode = Y.Node.create('<div id="' + this.id_cal + '"> </div>') ;
		//cal.appendChild(cul) ;
		cal.appendChild(this.calNode) ;
		if(config.contentBox == undefined){
			config.contentBox = cal ;
		}
		if(config.footerContent == undefined){
			config.footerContent = '' ;
		}
		if(config.buttons == undefined){
			config.buttons = [ 
					    { 
					    	type: 'close' 
					    },
					    {
					    	value: '<span class="mybutton">OK</span>', 
					    	action: function(e)
					    	{
					    		e.preventDefault();
					    		this.destroy() ;
					    	},
						    section: 'footer' 
					    },
					    { 
					    	section: 'footer' , 
					    	value: '<span class="mybutton">Cancel</span>',
					    	action: function(e)
					    	{
					    		e.preventDefault();
					    		this.destroy() ;
					    	}
					    }
				    ] ;
			
		}

		CalendarPanel.superclass.constructor.apply(this, arguments);
				
	}

		
	CalendarPanel.ATTRS = {
			startDate : {
				value: null
			}
	} ;
	CalendarPanel.CSS_PREFIX = 'yui3-panel' ;
	CalendarPanel.NAME = "CalendarPanel" ;

	Y.extend(CalendarPanel,Y.Panel,{
		initializer: function(config)
		{
			node = this.get('boundingBox') ;
			nl = node.all('#panel_calendar .yui3-widget-hd') ;
			nl.setStyle('cursor','pointer') ;
			this._createCalendar(config) ;
			Y.Event.purgeElement = myPurgeElement ;
			
			this.set('hideOn',[]) ;
			this.after('destroy',this._afterDestroy,this) ;
			this.after('render',this._afterRender,this) ;
			this.set('hideOn',[]) ;
			this._plugAll() ;
		},
		_createCalendar: function(config){
			this.cfgCalendar = config.cfgCalendar ;			
			
			this.calendar = new Y.CalendarMultiPane({
				contentBox: this.calNode , //'#' + this.id_cal ,
				selectionMode: 'multiple',
				width: this.cfgCalendar.width + 'px',
				showPrevMonth: true,
				showNextMonth: true,
				date: this.cfgCalendar.startDate ,
				columns : this.cfgCalendar.columns,
				count : this.cfgCalendar.count,
				lang : this.cfgCalendar.lang,
				widthPanel: this.cfgCalendar.width,
				bAdjustMonth: this.cfgCalendar.bAdjustMonth,
				wrapper: { panel: this , id: this.id_cal }
			}) ;
			
		},
		_plugAll: function(){
			this.plug( { fn:Y.Plugin.Resize , cfg: {handles:'r, l'} } ) ;
			this.resize.after('resize:end',this._afterResize,this	) ;

			this.plug( { fn: Y.Plugin.Drag, cfg: {handles:['.yui3-widget-hd']} }) ;
			this.dd.plug(Y.Plugin.DDConstrained,{ constrain :'view'} ) ;
			this.dd.con.set('constrain','view') ;			
		},
		_afterRender: function(ev){
			this.calendar.plug(Y.CalendarFeastPlugin,{ culture : new Y.CultureEuropean }) ;
			if(this.cfgCalendar.selectionType == 2)
				this.calendar.plug(Y.CalendarSelectionConstraint) ;

			this.calendar.render() ;
		},
		_afterResize: function(ev){
			node = Y.one('#' + this.id_cal) ;
			newWidth =  ev.info.offsetWidth ;
			node.setStyle('width',newWidth - 14) ;
		},
		_afterDestroy: function(ev){
			this.unplug() ;
			this.calendar.destroy(true) ;
			this.calendar = null ;
		},
		calendar: null,
		cfgCalendar: null,
		id_cal: 0
	}) ;
	Y.CalendarPanel = CalendarPanel ;
},'3.4.1',{ requires: [ 'panel' , 'dd-plugin' , 'culture-european' , 'feast-plugin' , 'calendar-multipane' ] }) ;
