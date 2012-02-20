// CultureEuropean
// Algorithms

function CultureEuropean()
{
}

CultureEuropean.prototype = {
	EasterGauss : function EasterGauss(x)
	{
		var floor = Math.floor ;
		a = x % 19 ;
		b = x % 4 ;
		c = x % 7 ;
		k = floor(x / 100) ;
		p = floor( ( 8*k + 13 ) /25) ;
		q = floor( k / 4) ;
		Mg = (15 + k - p - q) % 30 ;
		N = (4 + k - q) % 7 ;
		d = (19 * a + Mg) % 30 ;
		e = (2*b + 4*c + 6*d + N) % 7 ;
		OSg = 22 + d + e ;
		month = 3 ;
		day = OSg ;
		if(day > 31)
		{
			day -= 31 ;
			month++ ;
		}
		return new Date(x,month-1,day,12,0,0) ;
	},
	EASTER: function(year)
	{
		return this.EasterGauss(year) ;
	},
	FASCHING : function (year)
	{
		var easter = this.EasterGauss(year) ;
		
		var fasching = MyDate.addDays(easter,-49) ;
		weekday = fasching.getDay() ;
		if(weekday)
			fasching = MyDate.addDays(fasching,7 - weekday) ;
		return fasching ;
	} ,
	MUTTERTAG: function (year)
	{
		return new Date(year,4,6) ;
	} ,
	BUSSUNDBET: function (year)
	{
		return new Date(year,4,6) ;
	}
	
} ;
