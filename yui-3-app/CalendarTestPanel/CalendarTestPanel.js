YUI().add('calendartest-panel',function(Y){
	
	function CalendarTestPanel(config){
		CalendarTestPanel.superclass.constructor.apply(this,arguments) ;
	}
	CalendarTestPanel.ATTRS = {} ;
	CalendarTestPanel.NAME = 'calendarPanel' ;
	CalendarTestPanel.DLG_TEMPLATE =
		'<div id="content_root" style="padding-left:0px"> ' +
		'<div id="links"  class="panel_control_part" >' +
	//	'<br>' +
		'	<div>' +
		'   	<div class="editline" >' +
			'	<div class="static" >' +
			'    Selected date: ' +
			'	</div>' +
			'	<div class="editbox>" id="selecteddate"' +
			'	</div>' +
			'	</div>' +
		'	</div>' +
		'      <br>' +
		'	<div>' +
		'   	<div class="editline" >' +
		'		<div class="static" >Select Language</div>' +
		'	   	<div class="selectbox" >' +
		'      	<select id="sel_lang" name="lang" >' +
		'      	<option selected>Deutsch</option>' +
		'      	<option value="Francais">Fran&ccedil;ais</option>' +
		'      	<option>English</option>' +
		'      	<option>Putonghua</option>' +
		'      	<option value="Pinyin">Pinyin</option>' +
		'      	</select>' +
		'   	</div>' +
		'   	</div>' +
		
		'   	<div class="editline" >' +
		'		<div class="static" >Select Count of Months </div>' +
		'   	<div class="selectbox" >' +
			'      <select id="sel_count" name="count" width="20">' +
			'      	<option selected>1</option>' +
			'      	<option>2</option>' +
			'      	<option>3</option>' +
			'      	<option>4</option>' +
			'      	<option>6</option>' +
			'      	<option>8</option>' +
			'      	<option>9</option>' +
			'      	<option>12</option>' +
			'      </select>' +
			'	</div>' +
			'   </div>' +
			'   <div>' +
			'  <div class="editline" >' +
			'      <div class="static" ">Select Column Count </div>' +
			'      <div class="selectbox" >' +
			'      <select id="sel_columns" name="columns" width="20" >' +
			'      	<option selected>1</option>' +
			'      	<option>2</option>' +
			'      	<option>3</option>' +
			'      	<option>4</option>' +
			'      </select>' + 
			'	   </div>' +
			'  </div>' +
			'  </div>' +
		'   </div>' +
		'      <br>' +
		'   <div> ' +
		'		<br>' + 
		' 		<div class="editline">' +
		'      		<div class="static">Adjust Start Date:</div>' +
			' 		<div class="editbox">' +
			'			<input id="check_adjust" class="editbox" text="adjust" type="CHECKBOX" >' +
			'		</div>' +
			'		<br>' +
		' 		</div>' +
		' 		<div class="editline">' +
		'      		<div class="static">Width:</div>' +
			' 		<div class="editbox">' +
			'		<input id="sel_width" class="editbox" type="EDIT" value="340">' +
			'		</div>' +
		' 		</div>' +
		' 		<div class="editline">' +
			'		<div class="static">Year:</div>' +
			' 		<div class="editbox">' +
			'		<input id="newyear" class="editbox" type="EDIT" value=""><br>' +
			'		</div> ' + 
		'		</div> ' + 
		'		<br>' + 
		' 		<div class="buttongroup" > ' +	
			'		<div class="buttonframe"> ' + 
			'      <div id="setYear" class="yui3-button leftbutton yui3-button-color-blue">Set Year</div>' +
			'		</div> ' + 
			'		<div class="buttonframe"> ' + 
			'      <div id="showCalendar" class="yui3-button rightbutton yui3-button-color-blue">Show Calendar</div>' +
			'		</div> ' + 
			'   </div>' +
		'   </div>' +
		'<br>' +
		'<br>' +
		'<div class="lower_part" style="min-height:300px;">' +
	' 		<div class="editline">' +
	'      		<div class="static">Show in Panel:</div>' +
		' 		<div class="editbox">' +
		'			<input id="check_inpanel" class="editbox" text="inpanel" type="CHECKBOX" checked="checked">' +
		'		</div>' +
		'		<br>' +
	' 		</div>' +
			'<br>' +
			'<div class="radiogroup"><p>' +
				'<div> Type of selection</div>' +
				'<input type="radio" name="selection_type" value="singleselection" checked="checked">' +
				'Single selection<br>' +
				'<input type="radio" name="selection_type" value="multipleselection">Multiple selection<br>' +
				'<input type="radio" name="selection_type" value="doubleselection">Double selection' +
			'<p></div>' +
		'</div>' +
		'</div>'  +
		'</div>'  ;
	
	
	Y.extend(CalendarTestPanel,Y.Base,{
		config: null,
		initializer: function(config){
		this.config = config ;
			this._initPanelContent(config) ;
		},
		_initColumnsBox: function(){
			var sel_width = Y.one("#sel_width") ; 
			var sel_columns = Y.one("#sel_columns") ; 
			if(sel_columns != null)
			{
				var bFirst = true ;
				sel_columns.on('click', function (ev) {
					if(bFirst)
					{
						bFirst = false ;
						return ;
					}
					bFirst = true ;
					var t = ev.target ;
					html = sel_columns.getDOMNode() ;
					con = Math.floor(html.value) ;
					width = con * 210 ;
					sel_width.getDOMNode().value = width+'' ;
					//sel_width.value = width+'' ;
				}) ;
			}
			return sel_columns ;
			
		},
		_initCountBox: function(sel_columns,sel_width){
			var sel_count = Y.one("#sel_count") ;
			if(sel_count != null)
			{
				var bFirst = true ;
				sel_count.on('click', function (ev) {
					var t = ev.target ;
					if(bFirst)
					{
						bFirst = false ;
						return ;
					}
					bFirst = true ;
						
					/*if(t.getDOMNode().id == "sel_count")
						return ;*/
					val = sel_count.getDOMNode().value ;
					html = sel_columns.getDOMNode() ;
					xcon = Math.floor(html.value) ;
					con = 0 ;
					if(!(val%4))
						con = 4 ;
					else if(!(val%3))
						con = 3 ;
					else if(!(val%2))
						con = 2 ;
					else
						con = 1 ;
					found = 0 ;
					for( i = 0 ; i < html.options.length ; i++ )
					{
						if(html.options[i].innerHTML == '' + con)
						{
							html.options[i].selected = 'selected' ;
							found = i ;
						}
						else
							html.options[i].selected = '' ;
					}
					width = con * 210 ;
					var sel_width = Y.one("#sel_width") ; 
					sel_width.getDOMNode().value = width+'' ;
					
				} ) ;
				
			}
			
		},
		_initYear : function(){
			var setyear = Y.one("#setYear") ;
			if(setyear != null)
				setyear.on('click', function (ev) {
				ev.preventDefault();
				var edit = Y.one("#newyear") ;
				var year  = 1983 ;
				if(edit != null)
					year = edit.getDOMNode().value ;
				var date = calendar.get("date") ;
				if(this.calendar){
					this.calendar.set("date",new Date(year,0,1,12,0,0)) ;
					date = this.calendar.get("date") ;
					this.calendar.render() ;
				}
			}) ;
			
		},
		_initPanelContent: function(config){
		
			var sel_width = Y.one("#sel_width") ; 
			sel_columns = this._initColumnsBox() ;
			this._initCountBox(sel_columns) ;
			this._initYear() ;
			var show = Y.one("#showCalendar") ; 
			var that = this ;
			if(show != null) 
				show.on('click', this._createCalendar ,that ) ;
		},
		_createStandaloneCalendar: function(that,cfg){
			if(that.calendar){
				that.calendar.destroy() ;
				that.calendar = null ;
				if(that.cal){
					cfg.panel.removeChild(that.cal) ;
					that.cal = null ;
				}
			}
				
			id_cont = 'content_calendar_' + Y.guid() ;
			var id_cal = 'calendar_node_'  + Y.guid() ;
			that.cal = Y.Node.create('<div id="' + id_cont + '"> </div>') ;
			var calNode = Y.Node.create('<div id="' + id_cal + '"> </div>') ;
			that.cal.appendChild(calNode) ;
			root = cfg.panel ;
			root.appendChild(that.cal) ;
			calendar = new Y.CalendarMultiPane({
				  x: '268px',				  
				  contentBox: calNode ,
				  selectionMode: 'multiple',
				  width: width + 'px',
				  showPrevMonth: true,
				  showNextMonth: true,
				  date: cfg.startDate ,
				  columns : cfg.columns,
				  count : cfg.count,
				  lang : cfg.lang,
				  widthPanel: cfg.width,
				  bAdjustMonth: cfg.bAdjustMonth,
				  wrapper: { panel : calNode , id : id_cal }
				  }) ;
			calendar.plug(Y.CalendarFeastPlugin,{ culture: new CultureEuropean }) ;
			calendar.render() ;
			that.cal.setStyle('marginLeft',268) ;
			that.cal.setStyle('border','1px solid gray') ;
			that.cal.setStyle('borderRadius',4) ;
			that.cal.setStyle('paddingTop',10) ;
				
			that.calendar = calendar ;
			
		},
		_createCalendar: function (ev) {
			ev.preventDefault();
			that = this ;
			YUI().use('calendar-panel','selectconstraint-plugin','calendar-multipane','resize' , 
					'resize-plugin','feast-plugin','panel','datatype-date',  
					'dd-plugin' , 'dd-constrain',function(Y){
				var columns = 1 ;
				var count = 1 ;
				var newpane = "twopane" ;
				var sel = Y.one('#sel_lang');			
				lang = sel ? sel.getDOMNode().value : 'Deutsch' ;
				sel = Y.one('#sel_count');
				
				count = sel ? sel.getDOMNode().value : 1 ;
				sel = Y.one('#sel_columns');
				columns = sel ? sel.getDOMNode().value : 1 ;
				sel = Y.one('#sel_width');			
				width = sel ? sel.getDOMNode().value : 1 ;
	
				var check = Y.one("#check_adjust") ;
				var bAdjustMonth = false ;
				if(check.getDOMNode().checked )
				{
					bAdjustMonth = true ;
				}
				check = Y.one("#check_inpanel") ;
				var bAdjustMonth = false ;
				bInPanel = false ;
				if(check.getDOMNode().checked )
				{
					bInPanel = true ;
				}
				var edit = Y.one("#newyear") ;
				var year  = null ;
				if(edit != null)
					year = edit.getDOMNode().value ;
				var startDate = new Date() ;
				if(year && year > 0 )
					startDate = new Date(year,0,1,12,0,0) ;
				cont = that.get('contentNode') ;
				edit = Y.all('*[name=selection_type]') ;		
				edit.each(function(node){
					var dom = node.getDOMNode() ;
					if(dom && dom.checked )
					{
						if(dom.getAttribute('value') == 'multipleselection')
						{
							that.config.selectionType = CalendarConfig.MULTIPLE_SELECTION ;
						}
						else if(dom.getAttribute('value') == 'singleselection')
							that.config.selectionType = 1 ;
						else
							that.config.selectionType = 2 ;
						return false ;
					}
				}) ;
				config = that.config ;
				config.lang = lang ;
				config.width = width ;
				config.columns = columns ;
				config.count = count ;
				config.bAdjustMonth = bAdjustMonth ; 
				config.startDate = startDate ;
				var dtdate = Y.DataType.Date;
	
				Y.WidgetButtons.DEFAULT_BUTTONS.close.action = function(e)
				{
					e.preventDefault() ;
					that.destroy() ;
				} ;
				cfg = config ;
				if(bInPanel){
					var K = new Y.CalendarPanel({ x: 100+ cfg.leftMargin, 
						y: cfg.topMargin , 
						headerContent : 'Calendar',
						//contentBox : cal ,
						//footerContent: footer,
						modal: cfg.modal,
						cfgCalendar: cfg
					}) ;
					K.render(cfg.panel) ;
					K.move([ cfg.pos.left , cfg.pos.right ]) ;
					that.calendar = K.calendar ;
				}
				else {
					that._createStandaloneCalendar(that,config) ;
				}
					
				
				//panel = CreateCalendar(Y,config) ;
				if(that.calendar){
					that.calendar.on("selectionChange", function (ev) {
	
						  // Get the date from the list of selected
						  // dates returned with the event (since only
						  // single selection is enabled by default,
						  // we expect there to be only one date)
						  var newDate = ev.newSelection[0];
	
						  // Format the date and output it to a DOM
						  // element.
						  Y.one("#selecteddate").setContent(dtdate.format(newDate));
					});
					that.calendar.show() ;
				}	
			}) ;
			
		},
		cal: null,
		calendar: null
	}) ;
	Y.CalendarTestPanel = CalendarTestPanel ;
},'3.4.1',{ requires: [ 'calendar-multipane','calendar-panel','dd-plugin','feast-plugin' ]  } ) ;