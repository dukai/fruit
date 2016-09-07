if (typeof exports === 'object' && typeof exports.nodeName !== 'string' && typeof define !== 'function') {
    var define = function (factory) {
        factory(require, exports, module);
    };
}
define(function(require, exports, module){

	var tools = require('dtools');

	var cache = {};
	var debug = true;

	OPEN_TAG = '<?';
	CLOSE_TAG = '?>';

	var Template = function(tmplContent){

		this.vars = {};
		this.fns = {};
		this.helpers = {};
		
		var fnBody = "var ___tpContent = '',\
		print = function(){\
			___tpContent += [].join.call(arguments, '');\
		};\
		___tpContent += '" + this.compile(tmplContent) + "';\
		return ___tpContent;";


		this.fn = new Function(fnBody);
		Template.debug && console.log(fnBody);
	};

	Template.prototype = {
		render: function(data, isDom){
			data = tools.mix(this.helpers, data);
			this.checkVarsAndFns(data);
			
			var html = this.fn.call(data);
			if(isDom && typeof document == undefined){
				var div = document.createElement('div');
				div.innerHTML = html;
				var fragment = document.createDocumentFragment();
				var nodeList = div.children;
				while(nodeList.length > 0){
					fragment.appendChild(nodeList[0]);
				}

				return fragment;

			}else{
				return html;
			}
		},

		checkVarsAndFns: function(data){
			for(var key in this.vars){
				if(data[key] === undefined){
					Template.debug && console.warn("Variable \"" + key + "\" does not exists");
					data[key] = '';
				}
			}

			for(var key in this.fns){
				if(data[key] === undefined){
					Template.debug && console.warn("Function \"" + key + "\" does not exists");
					data[key] = this.emptyFn;
				}
			}
		},

		emptyFn: function(){
			return '';
		},

		parseVars: function(source){
			var result = null;
			var regexp = /this\.([\w\$]+)\(*/g;
			while ((result = regexp.exec(arguments[0])) != null)  {
				// console.log(result);

				if(result[0].substr(-1, 1) == "("){
					//方法
					this.fns[result[1]] = 1;
				}else{
					//变量
					this.vars[result[1]] = 1;
				}
			}
		},

		compile: function(source){
			var self = this;
			//预处理模板内容
			source = source.replace(/('|"|\\)/g, "\\$1")
				.replace(/\r/g, "")
				.replace(/\t/g, "\\t")
				.replace(/\n/g, "\\n");

			var closeTagEqualRegExp = new RegExp('\t=(.*?)' + CLOSE_TAG.replace(/\?/g, '\\?'), 'g');
			var closeTagCommonRegExp = new RegExp('\t(.*?)' + CLOSE_TAG.replace(/\?/g, '\\?'), 'g');

			//分析模板语法
			source = source.split(OPEN_TAG).join('\t')
				.replace(closeTagEqualRegExp, function(){
					self.parseVars(arguments[0]);
					var target =  arguments[1].replace(/\\t/g, ' ').replace(/\\n/g, '\n').replace(/\\r/, '\r').replace(/\\('|"|\\)/g, "$1");
					return "' + (" + target + ");\r\n___tpContent += '";
				})
				.replace(closeTagCommonRegExp, function(){
					self.parseVars(arguments[0]);
					var target = arguments[1].replace(/\\t/g, ' ').replace(/\\n/g, '\n').replace(/\\r/, '\r').replace(/\\('|"|\\)/g, "$1");
					return "';\r\n" + target + "\r\n___tpContent += '";
				});

			return source;
		},

		setHelpers: function(helpers){
			this.helpers = tools.mix(this.helpers, helpers);
		},
		setHelper: function(key, value){
			this.helpers[key] = value;
		}
	};


	Template.debug = false;

	module.exports = Template;
});

