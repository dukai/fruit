define(function(require, exports, module){

	var tools = require('dtools');
	var Tmpl = require('template');
	var PopBox = require('./popbox');

	var div = tools.$c('div');

	var Toast = function(options){
		this._initToast(options);
	};

	Toast.prototype = {
		_initToast: function(options){
			this.options = tools.mix({
				txt: '正在加载...',
				interval: 2000,
				autoHide: true,
				template: Toast.TEMPLATE,
				showLoader: true
			}, options);

			PopBox.call(this, this.options);

			this.container = div.cloneNode();
			this.timer = null;
			this.initStatus = false;

			document.body.appendChild(this.container);
			this.show();
		},

		hide: function(){
			Toast.SHOW_COVER && this.hideCover();
			this.container.style.display = 'none';
			clearTimeout(self.timer);
		},

		show: function(txt){
			Toast.SHOW_COVER && this.showCover();
			var self = this;
			var displayTxt = txt ? txt : this.options.txt;
			this.container.innerHTML = this.options.template.render({
				text: displayTxt,
				showLoader: this.options.showLoader
			});
			if(this.initStatus){
				this.container.style.display = 'block';
			}else{
				this.initStatus = true;
			}
			if(this.options.autoHide){
				this.timer = setTimeout(function(){
					self.hide();
					self.timer = null;

					self.options.confirmCallback.call(this);
				}, this.options.interval);

			}
		},

		hideLoader: function(){
			this.options.showLoader = false;
			this.show();
		},

		showLoader: function(){
			this.options.showLoader = true;
			this.show();
		}

	};
	tools.extend(Toast, PopBox);
	Toast.TEMPLATE = new Tmpl(require('text!./view/pc/toast.tmpl'));
	Toast.SHOW_COVER = false;

	module.exports = Toast;
});