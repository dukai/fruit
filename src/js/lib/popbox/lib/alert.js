define(function(require, exports, module){
	var $ = require('jquery');
	var tools = require('dtools');
	var Tmpl = require('template');
	var PopBox = require('./popbox');

	var tmpl = new Tmpl(require('text!./view/pc/alert.tmpl'));

	var div = document.createElement('div');

	var AlertBox = function(options){
		this._initAlertBox(options);
	};

	AlertBox.prototype = {
		_initAlertBox: function(options){
			this.options = tools.mix({
				title: '兑换失败，请稍后再试。',
				confirmTxt: '我知道了',
				confirmCallback: null,
				template: AlertBox.TEMPLATE,
                autoshow: true
			}, options);

			PopBox.call(this, this.options);
			
			this.options.autoshow && this.show();
		},

		_initEvents: function(){
			AlertBox.parent._initEvents.call(this);
			var self = this;
			$(this.container).on('click', '.btn-confirm', function(){
				self.hide();
				self.emit('confirm');
				self.options.confirmCallback && self.options.confirmCallback.call(self);
			});
		},

		show: function(options){
			if(typeof options === 'string'){
				options = {
					content: options
				};
			}
			AlertBox.parent.show.call(this, options);
		},

		setConfirm: function(fn){
			this.on('confirm', fn);
		}
	};
	
	tools.extend(AlertBox, PopBox);

	AlertBox.TEMPLATE = new Tmpl(require('text!./view/pc/alert.tmpl'));

	module.exports = AlertBox;
});
