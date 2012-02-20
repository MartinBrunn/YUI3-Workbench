// CalendarFeastPlugin
// mbr
YUI.add('feast-plugin',function(Y) {
	function HolidayCalculator(Y,feastPlugin)
	{
		var cult = feastPlugin.get('culture') ;
		var floor = Math.floor ;
		/*function Easter(x)
		{
			a = x % 19 ;
			k = floor(x / 100) ;
			T = floor(( 3*k + 3) /4) ;
			M = 15 + T - floor(( 8*k +13 ) /25) ;
			D = (19*a + M) % 30 ;
			S = 2 - T ;
			R = floor(D / 29) + (floor(D / 28) - floor(D/29))*floor(a/11) ;
			OG = 21 + D - R ;
			SZ = 7 - ( x + floor(x/4) + S)%7 ;
			OE = 7 - (OG - SZ) % 7 ;
			OS = (OG - OE) ;
			month = 3 ;
			day = OS ;
			if(day > 31)
			{
				day -= 31 ;
				month++ ;
			}
			return new Date(x,month-1,day,12,0,0) ;
		}*/
		
		var feastcache = null ;

		this.feastcache = { 
				EASTER: {
			/*	2011 : EasterGauss(2011) ,
				2012 : EasterGauss(2012) ,
				2013 : EasterGauss(2013) */
				} ,
				FASCHING: {
				},
				MUTTERTAG: {
				} ,
				BUSSUNDBET: {
				} 
			} ;
		feastcache = this.feastcache ;
		this.feastalgorithm = {
			fixed: function( date , feast , cache) {
				var day = date.getDate() ,
					month = date.getMonth() ;
				var dayFest = feast ;
				if(dayFest[0] == day && dayFest[1] == month + 1)
				{
					return true ;
				}
				return false ;
			} ,
			variable: function(date , feast , cache )
			{
				year = date.getFullYear() ;
				for( var algo in cache )
				{
					if(cache[algo][ year ] == undefined)
						cache[algo][ year ] = cult[algo](year) ;
				}
				for( var algo in cache )
				{
					if(algo != feast[0])
						continue ;
					var feastDate = cache[feast[0]][ year ] ;
					feastDate = MyDate.addDays(feastDate,feast[1]) ;
					//time = feastDate.getTime() + feast[1]*1000*60*60*24 ;
					if(MyDate.SameDay(date,feastDate))
						return true ;
				}
				return false ;	
			}
		} ;
		
		this.calcHolidays = function calcHolidays(workingDate,feastTable)
		{ 
			var ret = function(holi,text,special,specialText,specialInfo)
			{
				this.holiday = holi ;
				this.text = text ;
				this.special = special ;
				this.specialText = specialText ;
				this.specialInfo = specialInfo ;
				return this ;
			} ;
			var holiday = false , special = false ;
			//var s = workingDate.toISOString() ;
			dayofweek = workingDate.getDay() ;
			day = workingDate.getDate() ;
			month = workingDate.getMonth() ;
			year = workingDate.getFullYear() ;
			var text = '' ;
			var	strText = '' , 
				specialInfo = '',
				special = '' ;
				
			if(true)
			{
				for(var type in this.feastalgorithm)
				{
					for(var feastDayType in feastTable[type])
					{
						var dayFeastEntry = feastTable[type][feastDayType] ;
						if(this.feastalgorithm[type](workingDate,dayFeastEntry,this.feastcache))
						{
							strText = LangDep[feastDayType] ;
							if(strText == undefined || strText == null)
								strText = '' ;
							if(dayFeastEntry[2] == "BUND")
								holiday = true ;
							special = dayFeastEntry[2] ;
							var add = local_type[dayFeastEntry[2]] ;
		
							if(holiday)
								text = strText ;
							else 
								specialInfo = strText ;
							specialInfo += (( specialInfo.length && add && add.length)?'<br>':'') ;
							specialInfo += (add!=undefined?add:'') ;
							break ;
						}
					}
				}
			}
			var specialText = '' ;
			if(day == 2 )
			{
				specialText = 'Geburtstag Papa' ;
			}
			return ret(holiday,text,special,specialInfo,specialText) ; 
		} ;
		this.SameDay = MyDate.SameDay ;
	}
	
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
			this.set('calculator',new HolidayCalculator(Y,this)) ;
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
},"3.4.1",{ requires: [ 'plugin' ]  } ) ;
