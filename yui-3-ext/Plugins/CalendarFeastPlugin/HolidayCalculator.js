YUI.add('holiday-calculator',function(Y) {

	function HolidayCalculator(Y,feastPlugin){
		var cult = feastPlugin.get('culture') ;
		var floor = Math.floor ;
		
		var feastcache = null ;

		this.feastcache = { 
				EASTER: {
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
					feastDate = Y.MyDate.addDays(feastDate,feast[1]) ;
					//time = feastDate.getTime() + feast[1]*1000*60*60*24 ;
					if(Y.MyDate.SameDay(date,feastDate))
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
		this.SameDay = Y.MyDate.SameDay ;
	}
	
	Y.HolidayCalculator = HolidayCalculator ;
},"3.4.1",{ requires: [ 'base' , 'mydate' ]  } ) ;
