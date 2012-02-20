

function Toggle(Y,calendar)
{
	if(calendar.bHidden )
		Show(Y,calendar) ;
	else
		Hide(Y,calendar) ;
}
function Hide(Y,calendar)
{
/*	var popup = Y.one('#calendar-popup') ;
	if(popup  )
		popup.getDOMNode().style.display = 'none' ;*/
	if(calendar)
		calendar.hide() ;
	calendar.bHidden = true ;
}
function Show(Y,calendar)
{
/*	var popup = Y.one('#calendar-popup') ;
	if(popup  )
		popup.getDOMNode().style.display = 'block' ;*/
	if(calendar)
		calendar.show() ;	
	calendar.bHidden = false ;
}


var text =
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
	
YUI().add('left-panel',function(Y)
{
	function LeftPanel(cfg)
	{
		LeftPanel.superclass.constructor.apply(this,arguments) ;
	}
	Y.extend(LeftPanel,Y.Base,{
		initializer: function(config) {
			this._pcon = config.root ;
			this._initPanel(config) ;
			this.after('init',this._postinit) ;
			this.on('render',this._renderer) ;
		},
		_initPanel: function(config){
			this.panel = new Y.Panel({ 
				width: (config.width != undefined) ? config.title : 260 , //height:360 , 
				headerContent : (config.title != undefined) ? config.title : 'Control Panel',
				contentBox : config.content ,
				footerContent: '',
				modal: (config.modal != undefined) ? config.modal : false ,
				buttons: [ 
				    { section: 'footer' , value: 'OK' },
				    { section: 'footer' , value: 'Cancel' }    
			    ]
			})  ;
		},
		_postinit: function(ev){
			this.panel.set('hideOn',[]) ;			
		},
		_renderer: function(ev) {
			this.panel.render(this._pcon) ;
			this.panel.move(1,1) ;
		},
/*		_initAttrs: function(C,B,D){
			
		},*/
		getPanel: function(){
			return this.panel ;
		},
		panel: null,
		_pcon: null
	}) ;
	Y.LeftPanel = LeftPanel ;
	
} , '3.4.1',{ requires: [ 'panel','node-base' ] }) ;

YUI().use('calendartest-panel','calendar-panel','left-panel','datatype-date' , 'node-base' , 'node-screen' /*,  'dd-plugin' , 'dd-constrain'*/, function(Y,response) {

	function CalendarConfig(lang,count,columns,width,dlgConfig)
	{
		this.width = width ;
		this.lang = lang ;
		this.count = count  ;
		this.columns = columns  ;
		this.dlgConfig = dlgConfig   ;
		this.bAdjustMonth = true ;
	 
	    this.pos = { left: 0 , right : 0 } ;
	    this.leftMargin = 0 ;
	    this.topMargin = 0 ;
	    this.selectionType = CalendarConfig.SINGLE_SELECTION ;
	    this.bUsePanel = true ;
	    var that = this ;
	}

	CalendarConfig.SINGLE_SELECTION = 1 ;
	CalendarConfig.MULTIPLE_SELECTION = 'multiple' ;
	
	var block = Y.one('#document_root') ;
	if(block)
		block.setXY([1,1]) ;
	var pcon = Y.Node.create('<div id=panel_control"> </div>') ;
	var pcal = Y.Node.create('<div id="panel_calendar"> </div>') ;
	var root = Y.one('#panel_root') ;
	root.appendChild(pcon) ;
	root.appendChild(pcal) ;
	
	
	var config = new CalendarConfig('Deutsch',1,1,340) ;
	config.panel = pcal ;
	config.modal = false ;
	config.pos.left = 268 ;
	config.selectionType = CalendarConfig.SINGLE_SELECTION ;
	
	var content = Y.Node.create(Y.CalendarTestPanel.DLG_TEMPLATE) ;
	
	title = 'Test Calendar Control' ;
	var P = new Y.LeftPanel({ root: pcon , content: content}) ;
	panel = P.getPanel() ;
	panel.render(pcon) ;
	panel.move(1,1) ;

	// TODO 
	var calendar = null ;
	calendar = new Y.CalendarTestPanel(config) ;
//	calendar.render() ;
	 
    /* TODO ????
	var box = Y.one(".yui3-u-1-box") ;
	if(box != null)
		box.on('click', function (ev) {
		ev.preventDefault();
//		Hide(Y,calendar) ;
		calendar.destroy() ;
	});*/



});
