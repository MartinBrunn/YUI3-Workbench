
YUI.add('calendar-multipane',function (Y){
	function CalendarMultiPane(config)
	{
		CalendarMultiPane.superclass.constructor.apply(this, arguments);	
	}

		
	CalendarMultiPane.ATTRS = {
			startDate : {
				value: null
			}
	} ;
	CalendarMultiPane.CSS_PREFIX = Y.Calendar.CSS_PREFIX ;
	CalendarMultiPane.NAME = "CalendarMultiPane" ;
	CalendarMultiPane.PANE_TEMPLATES = {
			Start: 	'<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">' ,
			End: '</div>',
			TableBegin : '<table id="yearcalendar" class="mygrid" >' ,
			HeaderBegin: '<tr class="myheaderrow" >' ,
			HeaderContent: '{header_template}' ,
			HeaderEnd: '</tr>' ,
			TableEnd : '</table>',
			TableRowStart :
				 '<tr class="myrow" >' ,
			TableRowEnd :	 
				'</tr>' ,
			TableCellBegin :
				'<td class="mycell" >' , 
			TableCellBegin1 :
				'<td class="mycell" >' ,
			TableCellBegin2 :
				'<td class="mycell yui3-u-1-2" >' ,
			TableCellBegin3 :
				'<td class="mycell yui3-u-1-3" >' ,
			TableCellBegin4 :
				'<td class="mycell yui3-u-1-4" >' ,
			TableCellEnd :
				'</td>' ,
			DivUI1_3Begin: '<div class="mydiv">' ,
			DivUI1_3Begin1: '<div class="yui3-u-1">' ,
			DivUI1_3Begin2: '<div class="yui3-u-1-2">' ,
			DivUI1_3Begin3: '<div class="yui3-u-1-3">' ,
			DivUI1_3Begin4: '<div class="yui3-u-1-4">' ,
			DivUI1_3End: '</div>' ,
			DivCalendarLeft : '<div class="monthname">{month_name}</div>' +
			'<div class = "{calendar_left_grid_class}">' +
			 '{calendar_grid_template}' +
				'</div>' ,
			DivCalendar : '<div class="monthname">{month_name}</div>' +
				'{calendar_grid_template}' ,
			DivCalendarMiddle : '<div class="monthname">{month_name}</div>' +
				'<div class = "{calendar_right_grid_class}">' +
				 '{calendar_grid_template}' +
					'</div>' ,
			DivCalendarRight : '<div class="monthname">{month_name}</div>' +
			'<div class = "{calendar_right_grid_class}">' +
			 '{calendar_grid_template}' +
				'</div>' 
				
		} ;

	
	
	Y.extend(CalendarMultiPane,Y.Calendar,{
		initializer: function(config)
		{
			//this.on('init',this._initFun,config) ;
			this.after('render',function(ev){
				startDate = this.get('startDate') ;
				this._updateNames(Y,startDate) ;
				if(this.wrapper)
				{
					var bound = this.get('boundingBox') ;
					width = bound.getDOMNode().clientWidth ;
					bound.getDOMNode().clientLeft += 6 ;
					if(width)
						this.wrapper.panel.set('width',Math.floor(width) + 14) ;
					/*box = Y.one('#' + this.wrapper.id ) ;
					if(box)
						box.setStyle('padding-left','6px') ;*/
				}
			}) ;
			this.readConfig(config) ;
		
			startDate = this.get('startDate') ;
			this._setupCalendar(Y,startDate) ;
			this.on("dateChange", function (ev) {
				var date = ev.newVal ;
				this._updateNames(Y,date) ;				
			}) ;
		},
		count : 1 ,
		width : 340 ,
		columns : 1,
		_updateNames: function (Y,startDate)
		{
			cont = this.get('contentBox') ;
			var all = cont.all('.monthname') ;
			month = startDate.getMonth() ;
			year = startDate.getYear() ;
			for(i = 0 ; i < all.size() ; ++month,++i)
			{
				if(month > 11)
					month = 0 ;
				var node = all.item(i).getDOMNode() ;
				var ydate = Y.DataType.Date ;
				date = new Date(year,month,1) ;
				node.innerHTML = ydate.format(date,{ format: "%B" } ) ;
			}
		},
		_initFun: function(ev)
		{
		},
		
		_setupCalendar: function(Y,date)
		{
			var template = this.makeTemplate(this.count,this.columns) ;

			this.navigator.set("shiftByMonths" , Math.floor(this.count)) ;

			Y.CalendarBase.CONTENT_TEMPLATE = template ;
			var that = this ;
			var yearspan = function(date)
			{
				month = date.getMonth() ;
				if((month + Math.floor(that.count) - 1) > 11)
					return 1 ;
				return 0 ;
			} ;
			this.set("headerRenderer", function (curDate) {
				var ydate = Y.DataType.Date ;
				span = yearspan(curDate) ;
				if(span == 0){
					output = ydate.format(curDate, this.count == 1 ?
							{ format: "%B %Y" } : { format: "%Y" }) ; // %B Monthname
				}
				else {
					year = curDate.getFullYear() ;
					output =  year + ' - ' + (year+span) ;
				}
				return output ;
				});
			
		},
		readConfig: function(config)
		{
			if(config.wrapper != undefined)
				this.wrapper = config.wrapper ;
			else
				this.wrapper = null ;
				
		    function AdjustMonth(date,count,columns)
		    {	
		    	month = date.getMonth() ;
		    	//adjust = count % columns ;
		    	just = 0 ;
		    	first = 12 - count ;
		    	if(first >= month )
		    		just = 0 ;
		    	else
		    	{
		    		just = month - first ;
		    		just -= just % columns ;
		    	}
		    	
		    	shift = (columns == 1) ? 0 : (month + just )%  columns ;
		    	if(shift < 0)
		    		shift = -shift ;
		 		date = Y.DataType.Date.addMonths(date,-shift-just) ;
		 		return date ;
		    }
			startDate = config.date ; //startDate ;
			if(config.lang != undefined)
			{
				lang = config.lang ;
				if(Y.Lang.isString(lang))
				{
					this.langPack = new LanguagePack(Y,lang) ;
					//this.lang = lang ;
				}			
			}
			if(config.count != undefined)
				this.count = config.count ;
		/*	var multiple = 'single' ;
			if(config.getSelectionCount() != 1)
				multiple = 'multiple' ; // 'multiple-sticky'
				*/
			if(config.columns != undefined)
			{
				columns = config.columns ;
				if((this.count %columns) && ((this.count % (++columns)) != 0))
				{
					while(this.count % columns)
						columns-- ;
				}
				this.columns = columns ;
			}
		    if(config.bAdjustMonth != undefined && config.bAdjustMonth)
		    {
		    	date = AdjustMonth(startDate,config.count,config.columns) ;
		    	config.date = date ;
		    	startDate = date ;
		    }
		    this.set('date',startDate) ;
	    	this.set('startDate',startDate) ;
			if(config.widthPanel != undefined)
			{
				width = config.widthPanel ;
			    if(width == undefined || width == null || width.length == 0)
			    	width = this.columns * 240 ;
			    width = Math.floor(width) ;
				
				this.width = width ;
			}
						
		},
		makeTemplate : function (count,width)
		{
			var u = CalendarMultiPane.PANE_TEMPLATES ;
			var div = u.Start ;
			bRowStart = false ;
			div += u.TableBegin ;
			div += u.HeaderBegin ;
			div += u.HeaderContent ;
			div += u.HeaderEnd ;
			if(count == 1)
				return Y.CalendarBase.ONE_PANE_TEMPLATE ; 
			for(i = 0 ; i < count ; i++)
			{
				if(!(i%width))
				{
					if(bRowStart)
						div += u.TableRowEnd ;
					div += u.TableRowStart ;
					bRowStart = true ;
				}
				div += u.TableCellBegin ;
				div += u.DivUI1_3Begin1 ;
				
				
				if(width == 1)
					div += u.DivCalendar ;
/*				else if((i % width) == 0)
					div += u.DivCalendarLeft ;
				else if( (i % width) == width-1)
					div += u.DivCalendarRight ;
				else if( (i%width) == 1)
					div += u.DivCalendarLeft ;
				else if( (i % width) == width-2)
					div += u.DivCalendarRight ;*/
				else 
					div += u.DivCalendarMiddle ;
				div += u.DivUI1_3End ;
				div += u.TableCellEnd ;
				
			}
			if(bRowStart)
				div += u.TableRowEnd ;
			div += u.TableEnd ;
			div += u.End ;
			
			return div ; 

		}
		
		
	}) ;
	Y.CalendarMultiPane = CalendarMultiPane ;
},'3.4.1',{ requires : [ 'calendar' ]}) ;
