/* 
 * CalendarFeastPlugin
 * Author: mbr
 */

/*
 * @module plugins
 * @submodule feast-plugin
 * 
 */

YUI.add('feast-plugin',function(Y) {

	function CalendarFeastPlugin(config) {
	    CalendarFeastPlugin.superclass.constructor.apply(this, arguments);
	}

// Define Static properties NAME (to identify the class) and NS (to identify the namespace)
CalendarFeastPlugin.NAME = 'calendarFeastPlugin';
CalendarFeastPlugin.NS = 'feast';

// Attribute definitions for the plugin
CalendarFeastPlugin.ATTRS = {
	feasts: {
		value: feast_german
	}					
};

	
	
	function feastFilter(Y,feastplugin,date,node,rules,cfg)
	{
		
		var holiday = false ;
		var feastTable = feastplugin.get('feasts') ;
		var calc = feastplugin.get('calculator') ;
		if(calc == undefined)
			return ;
		var dayinfo = calc.calcHolidays(date,feastTable) ;
		holiday = dayinfo.holiday ;

		var today = new Date() ;
		if(date.getFullYear() == today.getFullYear())
		{
			if(MyDate.SameDay(today,date))
				node.addClass("yui3-calendar-today") ;
		}
		if(date.getDay() == 6)
		{
			node.addClass("yui3-calendar-saturday") ;
		}
		else if(date.getDay() == 0)
		{
			if(holiday)
				node.addClass("yui3-calendar-holisunday") ;
			else
				node.addClass("yui3-calendar-sunday") ;
		}
		else if(holiday)
			node.addClass("yui3-calendar-holiday") ;
		if(dayinfo.special && dayinfo.special.length)
		{
			node.addClass(dayinfo.special) ;
		}
		var str = '' ;
		if(dayinfo.text && dayinfo.text.length)
		{
			str = '<div class="hintholiday">' + dayinfo.text + '</div>' ;
		}
		if(dayinfo.specialInfo && dayinfo.specialInfo.length)
		{
			if(str.length)
				str += '<br>'  ;
			
			str += '<div class="hintinfo' + (dayinfo.special != undefined && dayinfo.special.length ?
			(' , ' + dayinfo.special) : '') + '">' + dayinfo.specialInfo + '</div>' ;
		}
		if(dayinfo.specialText && dayinfo.specialText.length)
		{
			if(str.length)
				str += '<br>'  ;
			str += '<div class="hintspecial">' + dayinfo.specialText + '</div>' ;
		}
		if(str.length)
		{
			var div = Y.Node.create('<div class="hint">' + str + '</div>') ;
			x = node.getX() ;
			y = node.getY()  ;
			
			y = y != NaN ? y : 0 ;
			x = x != NaN ? x : 0 ;
			if(cfg == undefined || cfg == null)
				cfg = { x: 30 , y: 10 } ;
			x += cfg.x  ; 
			y += cfg.y ;
			var itemHint = node.appendChild(div) ;
			itemHint.setXY( [ x.toString() + 'px' , y.toString() + 'px' ] ) ;
		}
		
	}
	



// Extend Plugin.Base

Y.extend(CalendarFeastPlugin, Y.Plugin.Base, { 
    // Add any required prototype methods
   initializer : function(config) {
		this.afterHostEvent('init',this._initPhase) ;
		if(config == undefined || config.culture == undefined)
		{
			this.set('culture',new CultureEuropean()) ;
		}
		else
			this.set('culture',config.culture) ;
		if(config == undefined || config.calculator == undefined)
		{
			this.set('calculator',new Y.HolidayCalculator(Y,this)) ;
		}
		else
			this.set('calculator',config.calculator) ;
		
	},
	_initPhase: function(){
		var that = this ;
		function feastFilterY(date,node,rules)
		{
			return feastFilter(Y,that,date,node,rules) ;
		}
		var all = {
		  "all": {
			"0-11": {
			  "all": {
				"0-6": "all-day"
			  }
			}
		  }
		} ;
		var calendar = this.get("host");
		calendar.set("customRenderer",  { rules: all, filterFunction: feastFilterY}  ) ;
	}

});

Y.CalendarFeastPlugin = CalendarFeastPlugin ;
},"3.4.1",{ requires: [ 'plugin' , 'holiday-calculator' ]  } ) ;
