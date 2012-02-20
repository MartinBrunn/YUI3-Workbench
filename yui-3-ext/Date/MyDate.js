	function MyDate()
	{
	}


	MyDate.addDays = function(date,add)
	{
		newdate = new Date() ;
		newdate.setTime(date.getTime() + add*1000*60*60*24) ;
		return newdate ;
	} ;
	MyDate.SameDay = function(d1,d2)
	{
		if(d1.getFullYear() != d2.getFullYear())
			return false ;
		return d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() ;
	} ;
