define(function(require, exports, module){
	var $ = require('jquery');
	var tools = require('dtools');
	var Tmpl = require('template');
	var PopBox = require('./popbox');

	var tmpl = new Tmpl(require('text!./view/pc/confirm.tmpl'));

	var div = document.createElement('div');

	document.body.appendChild(div);

	var ConfirmBox = function(options){
		this._initConfirmBox(options);
	};

	ConfirmBox.prototype = {
		_initConfirmBox: function(options){
			this.options = tools.mix({
				title: '确认',
				content: '',
				cancelTxt: '取消',
				confirmTxt: '确定',
				cancelCallback: null,
				confirmCallback: null,
				template: ConfirmBox.TEMPLATE
			}, options);
			
			PopBox.call(this, this.options);
		},

		_initEvents: function(){
			ConfirmBox.parent._initEvents.call(this);
			
			var self = this;
			$(this.container).on('click', '.btn-cancel', function(){
				self.hide();
				self.options.cancelCallback && self.options.cancelCallback.call(self);
			});
			$(this.container).on('click', '.btn-confirm', function(){
				self.hide();
				self.options.confirmCallback && self.options.confirmCallback.call(self);
			});

		}
	};
	
	tools.extend(ConfirmBox, PopBox);

	ConfirmBox.TEMPLATE = new Tmpl(require('text!./view/pc/confirm.tmpl'));

	module.exports = ConfirmBox;

});