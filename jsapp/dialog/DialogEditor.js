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


YUI().use( 'panel','dd-plugin' , 'dd-constrain', 'resize' , 'resize-plugin' ,function(Y,response) {

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
		    { section: 'footer' , value: 'OK' },
		    { section: 'footer' , value: 'Cancel' }    
	    ]
	}) ;
	P.plug(Y.Plugin.Resize,{ handles: 'r, br, b' });
// case 1
	//P.resize.set('handles','r, br, b') ;
	P.render(pcon) ;
// end case 1
	
	// case 2
	// P.resize.set('handles','r, br, b') ;
	// P.render(pcon) ;
	// end case 2
	P.move(1,1) ;
	P.set('hideOn',[]) ;

}) ;
