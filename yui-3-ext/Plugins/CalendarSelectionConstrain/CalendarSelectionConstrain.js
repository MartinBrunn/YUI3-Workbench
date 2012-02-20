// CalendarSelectionConstraint
// mbr
YUI.add('selectconstraint-plugin',function(Y) {

	
	
	function CalendarSelectionConstraint(config) {
		CalendarSelectionConstraint.superclass.constructor.apply(this, arguments);
		if(config.selectionType  != undefined)
			this.set('selectionType',selectionType) ;
	}

	// Define Static properties NAME (to identify the class) and NS (to identify the namespace)
	CalendarSelectionConstraint.NAME = 'calendarSelectionConstrain';
	CalendarSelectionConstraint.NS = 'calcon';

	// Attribute definitions for the plugin
	CalendarSelectionConstraint.ATTRS = {
		    selectionType : {
				value: 2 
			}

			/*		any_name: {
			value: something
		}*/					
	};

	CalendarSelectionConstraint.SINGLE_SELECTION = 1 ;
	CalendarSelectionConstraint.DOUBLE_SELECTION = 2 ;
	CalendarSelectionConstraint.MULTIPLE_SELECTION = 'multiple' ;

	// Extend Plugin.Base

	Y.extend(CalendarSelectionConstraint, Y.Plugin.Base, { 
	    // Add any required prototype methods
	   initializer : function(config) {
			var that = this ;

			this.afterHostEvent('init',this._initPhase) ;
			this.onHostEvent('selectionChange',function(ev,y){
				var sel = ev.newSelection ;
				var saveSel = [] ;
				cnt = that.getSelectionCount() ;
				if(that.isMultipleSelection() || sel.length <= cnt )
				{
					that.currentSelection = sel ;
				}
				else
				{
					if(that.getSelectionCount() == 2)
					{
						saveSel.push(sel[0]) ; 
						saveSel.push(sel[2]) ;
					}
					else
						saveSel = that.currentSelection ;
					calendar = that.get('host') ;
					calendar.deselectDates() ;
					calendar.selectDates(saveSel) ;
					ev.preventDefault() ;
					ev.stopPropagation() ;
					return false ;
				}
			},Y) ;
			
		},
		_initPhase: function(){
			var that = this ;
			var calendar = this.get('host');
			if(this.get('selectionType') == 2)
				calendar.set('selectionMode','multiple-sticky') ;
		},
	    isMultipleSelection : function()
	    {
	    	if(CalendarSelectionConstraint.ATTRS.selectionType.value == CalendarSelectionConstraint.MULTIPLE_SELECTION)
	    		return true ;
	    	return false ;
	    } ,
	    getSelectionCount : function()
	    {
	    	if(CalendarSelectionConstraint.ATTRS.selectionType.value == CalendarSelectionConstraint.MULTIPLE_SELECTION)
	    		return null ;
	    	return Math.floor(CalendarSelectionConstraint.ATTRS.selectionType.value) ;
	    } ,
		currentSelection : null


	});

	Y.CalendarSelectionConstraint = CalendarSelectionConstraint ;
},"3.4.1",{ requires: [ 'plugin' ]  } ) ;

