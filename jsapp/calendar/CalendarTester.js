/*
	Author: mbr
*/

    /**
     * JSAPP 
     *
     * @module calendar
     */

    /**
     *
     * @module calendar
     * @submodule CalendarTester
     *
     */
    
    /*
     *
     * @uses LeftPanel
     * @uses CalendarTestPanel
	 * @uses YUI3 Library
     *
     */
    

var text =
	'<div id="content_root" style="padding-left:0px"> ' +
	'<div id="links"  class="panel_control_part" >' +
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
	

YUI({
	//base: "file://D:/Source/Web/yui-3.4",
	injected: true ,
	//filter: 'DEBUG' ,
	groups: {
		calendar: {
			modules: {
				'left-panel' : {
					requires: [ 'panel' /*, 'calendar'*/ ],
					fullpath : "../../yui-3-ext/LeftPanel/LeftPanel.js"
				},
				'calendartest-panel' : {
					requires:  [/*'calendar' ,*/ 'left-panel' /*, 'calendar-panel'*/],
					fullpath : "../../yui-3-app/CalendarTestPanel/CalendarTestPanel.js" 
				} //,
/*					'CultureEuropean' : {
						requires: [ ],
						fullpath : "../../yui-3-ext/Culture/CultureEuropean.js"
					},

					'holidaycalculator' : {
						requires: [ 'base' , 'mydate' ],
						fullpath : "../../yui-3-ext/Plugins/CalendarFeastPlugin/HolidayCalculator.js"
					},

					'feastplugin' : {
						requires: [ 'plugin' , 'holidaycalculator' , 'feastgerman'],
						fullpath : "../../yui-3-ext/Plugins/CalendarFeastPlugin/CalendarFeastPlugin.js"
					},
					'calendar-panel' : {
						requires: [ 'panel' , 'calendar' , 'feastplugin' , 'CultureEuropean' ],
						fullpath : "../../yui-3-ext/CalendarPanel/CalendarPanel.js"					
					},
					'mydate' : {
						requires: [ 'base' ],
						fullpath : "../../yui-3-ext/Date/MyDate.js"
					},
					'feastgerman' : {
					requires: [ 'languagepack'  ],
					fullpath : "../../yui-3-ext/Country/FeastGerman.js"
				},
				'languagepack' : {
					requires: [ 'base' ],
					fullpath : "../../yui-3-ext/Language/LanguagePack.js"
				},
				'calendar-multipane' : {
					requires: [ 'panel' , 'calendar' ],
				fullpath : "../../yui-3-ext/CalendarMultiPane/CalendarMultiPane.js"
				},
				'calendarselectconstraint' : {
					requires: [ 'panel' , 'calendar' ],
					fullpath : "../../yui-3-ext/Plugins/CalendarSelectionConstrain/CalendarSelectionConstrain.js"
				}*/
			}
		}
	}
}).use('calendartest-panel','left-panel','datatype-date' , 'node-base' , 'node-screen' , function(Y,response) {

	
	var block = Y.one('#document_root') ;
	if(block)
		block.setXY([1,1]) ;
	/*
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
*/
	// TODO 
	var calendar = null ;
	calendar = new Y.CalendarTestPanel() ;
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
