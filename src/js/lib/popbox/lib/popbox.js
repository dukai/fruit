define(function(require, exports, module){
	var $ = require('jquery');
	var _ = require('dtools');
	var Tmpl = require('template');

	var div = _.$c('div');

	document.body.appendChild(div);


	var cover = $('.cover');
	if(cover.length == 0){
		cover = div.cloneNode();
		cover.className = 'cover';
		document.body.appendChild(cover);
		cover = $(cover);
	}

	var PopBox = function(options){
		this._initPopBox(options);
	};

	PopBox.prototype = {
		_initPopBox: function(options){
			_.EventEmitter.call(this);
			this.options = _.mix({
				title: '提醒',
				content: '',
				cancelTxt: '取消',
				confirmTxt: '兑换',
				cancelCallback: null,
				confirmCallback: null,
				template: null,
				customProperties: {}//模板自定义属性
			}, options);


			this.container = div.cloneNode();
			this.panel = $(this.container);
			this.initStatus = false;
			this.lockScroll = false;

			this.panel.hide();
			if(this.options.template == null){
				this.options.template = PopBox.TEMPLATE;
			}
			this.container.innerHTML = this.options.template.render(_.mix({
				title: this.options.title,
				content: this.options.content,
				cancelTxt: this.options.cancelTxt,
				confirmTxt: this.options.confirmTxt
			}, this.options.customProperties));

			document.body.appendChild(this.container);
			// this.show();
			this._initEvents();
		},
		initOpitions: function(options){
			this.options = _.mix(this.options, options);
		},
		_initEvents: function(){
			var self = this;

			$(this.container).on('click', '.btn-close', function(){
				self.hide();
				self.options.closeCallback && self.options.closeCallback.call(self);
			});

		},

		show: function(options){
			if(arguments.length > 0){
				this.options = _.mix(this.options, options);
				this.container.innerHTML = this.options.template.render(_.mix({
					title: this.options.title,
					content: this.options.content,
					cancelTxt: this.options.cancelTxt,
					confirmTxt: this.options.confirmTxt
				}, this.options.customProperties));
			}
			this.panel.show();
			this.lockScroll = true;
			PopBox.SHOW_COVER && this.showCover();
		},

		hide: function(){
			this.container.style.display = 'none';
			this.lockScroll = false;
			PopBox.SHOW_COVER && this.hideCover();
		},

		showCover: function(){
			cover.show();
		},
		hideCover: function(){
			cover.hide();
		}
	};

	_.extend(PopBox, _.EventEmitter);


	PopBox.TEMPLATE = new Tmpl(require('text!./view/pc/popbox.tmpl'));
	PopBox.SHOW_COVER = true;

	module.exports = PopBox;

});
