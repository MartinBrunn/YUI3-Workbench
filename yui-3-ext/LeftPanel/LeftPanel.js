/*
	Author : mbr
	20100220
 */




YUI().add('left-panel',function(Y)
{
    /**
     * JSAPP 
     *
     * @module left-panel
     */

    /**
     *
     * @module left-panel
     * @submodule 
     *
     */
    
    /*
     *
	 * @class LeftPanel
     * @extends Base
	 * @uses YUI3 Library
     * @uses Panel
     * @uses Node
	 * @param config {Object} Configuration object (see Configuration 
	 * attributes)
	 * @constructor
     */

    /**
     * <p>
     * A conveniency class with a Panel object at the left side of the viewport.
     * It has an OK and a Cancel button at the bottom, is neither draggable nor sizeable.
     * </p>
	 */
	function LeftPanel(cfg)
	{
		LeftPanel.superclass.constructor.apply(this,arguments) ;
	}
	Y.extend(LeftPanel,Y.Base,{
		initializer: function(config) {
			this._pcon = config.root ;
			this._initPanel(config) ;
			this.after('init',this._postinit) ;
			this.on('render',this._renderer) ;
		},
		_initPanel: function(config){
			this.panel = new Y.Panel({ 
				width: (config.width != undefined) ? config.width : 260 ,  
				headerContent : (config.title != undefined) ? config.title : 'Control Panel',
				contentBox : config.content ,
				footerContent: '',
				modal: (config.modal != undefined) ? config.modal : false ,
				buttons: [ 
				    { section: 'footer' , value: 'OK' },
				    { section: 'footer' , value: 'Cancel' }    
			    ]
			})  ;
		},
		_postinit: function(ev){
			this.panel.set('hideOn',[]) ;			
		},
		_renderer: function(ev) {
			this.panel.render(this._pcon) ;
			this.panel.move(1,1) ;
		},
/*		_initAttrs: function(C,B,D){
			
		},*/
		getPanel: function(){
			return this.panel ;
		},
		panel: null,
		_pcon: null
	}) ;
	Y.LeftPanel = LeftPanel ;
	
} , '3.4.1',{ requires: [ 'panel','node-base' ] }) ;
