// DialogEditor
// mbr
var text = 
 '<div class="panel_content_block" >'
+ '<br><br><br>'
+ '<div style="min-height:10em;padding-left:1em">'
+ '	Text'
+ '</div'
+ '<br><br><br>'
+'</div>' ;

function Prepare(Y,cfg)
{
	var calendar = null ;
	var pcon = Y.Node.create('<div id=panel_control"> </div>') ;
	var pcal = Y.Node.create('<div id="panel_calendar"> </div>') ;
	var root = Y.one('#panel_root') ;
	root.appendChild(pcon) ;
	root.appendChild(pcal) ;
	
	var cal = Y.Node.create('<div id="content_calendar"> </div>') ;
	var calNode = Y.Node.create('<div id="calendar_node"> </div>') ;
	cal.appendChild(calNode) ;
	Y.WidgetButtons.DEFAULT_BUTTONS.close.action = function(e)
	{
		e.preventDefault() ;
		this.destroy() ;
	} ;
	var K = new Y.Panel({ x: 260 , //cfg.leftMargin, 
		y: 0 , //cfg.topMargin , 
		headerContent : 'Calendar',
		contentBox : cal ,
		//footerContent: footer,
		modal: false , //cfg.modal ,
		buttons: [ 
		    { 
		    	type: 'close' 
		    },
		    {
		    	value: '<span class="mybutton">OK</span>', 
		    	action: function(e)
		    	{
		    		e.preventDefault();
		    		this.destroy() ;
		    	},
			    section: 'footer' 
		    },
		    { 
		    	section: 'footer' , 
		    	value: '<span class="mybutton">Cancel</span>',
		    	action: function(e)
		    	{
		    		e.preventDefault();
		    		this.destroy() ;
		    	}
		    }
	    ]
	}) ;
	K.after('destroy',function(ev)
	{
		calendar.destroy(true) ;
		calendar = null ;
	}) ;
	pcal.plug(Y.Plugin.Drag,{handles:['.yui3-widget-hd']}) ;
	pcal.dd.plug(Y.Plugin.DDConstrained,{ constrain :'view'} ) ;
	pcal.dd.con.set('constrain','view') ;
	
	K.render(pcal) ;
	K.set('hideOn',[]) ;
	
	K.move([ 260 , 100 ]) ; //cfg.pos.left , cfg.pos.right ]) ;
	var nl = Y.all('#panel_calendar .yui3-widget-hd') ;
	nl.setStyle('cursor','pointer') ;
	var dateIn = new Date() ;
	var width = 340 ;
	calendar = new Y.Calendar({
		  contentBox: '#calendar_node' ,
		  selectionMode: 'multiple',
		  width: width + 'px',
		  showPrevMonth: true,
		  showNextMonth: true,
		  date: dateIn 
		  }) ;
	calendar.plug(Y.CalendarFeastPlugin,{ culture: new CultureEuropean }) ;
	var x = calendar.feast ;
	calendar.render() ;
}
YUI().use('selectconstraint-plugin','calendar','calendar-base', 'panel', 'feast-plugin', 'dd-plugin' , 'dd-constrain', 'resize' , 'resize-plugin' ,function(Y,response) {
	function startCalendar(ev){
		ev.preventDefault();
		Prepare(Y) ;
		//calendar.plug()
	}
	var block = Y.one('#document_root') ;
	if(block)
		block.setXY([1,1]) ;
	var pcon = Y.Node.create('<div id=panel_control style="border:1px solid black"> </div>') ;
	var root = Y.one('#panel_root') ;
	root.appendChild(pcon) ;


	var content = Y.Node.create(text) ;
	var P = new Y.Panel({ width: 260 , //height:360 , 
		headerContent : 'Dialog Editor',
		contentBox : content ,
		footerContent: '',
		modal: false ,
		buttons: [ 
		    { section: 'footer' , value: 'OK' , action: startCalendar},
		    { section: 'footer' , value: 'Cancel' }    
	    ]
	}) ;
	P.plug(Y.Plugin.Drag) ;
	P.plug(Y.Plugin.Resize);
	P.resize.set('handles','r, br, b') ;
	P.render(pcon) ;

	P.move(1,1) ;
	P.set('hideOn',[]) ;
	var show = Y.one("#showCalendar") ; 
	if(show != null){ 
		show.on('click', function (ev) {
		ev.preventDefault();
		
		}) ;
	}
}) ;
