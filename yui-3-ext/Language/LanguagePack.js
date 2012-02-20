function LanguagePack(Y,lang)
{
    this.month_names= {
    		'Deutsch' : [ 'Januar','Februar','M&auml;rz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember' ]  ,
        	'Francais' : [ 'Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre' ]  ,
    		'English' : [ 'January','February','March','April','May','June','July','August','September','October','November','December' ]  ,
    		'Espanol' : [ 'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Novembre','Diciembre']  ,
    		'Italiano' : [ 'Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre' ],
    		'Putonghua': [ '-Jan','-Feb','-Mar','-Apr','-Mai','-Jun','-Jul','-Aug','-Sep','-Oct','十一月-Nov', '十二月-Dec' ] ,
    		'Pinyin' : [ '', '','','','','','','','','',"shíyī yuè","shí'èr yuè" ] ,
    		'Esperanto' : [ '', '' ] } ;
    this.lang = lang ;
    this.getMonthName = function(index)
    {
    	lang = this.lang ;
    	if(this.month_names[ lang ] == undefined)
    		lang = 'English' ;
    	if(index >= 0 && index <= 11)
    		return this.month_names[ lang ][ index ] ;
    	return '' ;
    } ;
}

