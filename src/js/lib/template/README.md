# template

A simple javascript template engine that support native JavaScript grammar.

简单的JavaScript模板工具，支持JavaScript原生语法。

模板文件内容演示：

```` html
<?if(this.list && this.list.length > 0){?>
<ul>
  <?for(var i = 0, len = this.list.length; i < len; i++){?>
    <li><strong><?=this.list[i].name?></strong><span><?=this.list[i].age?></span></li>
  <?}?>
</ul>
<?}?>
````
基本用法

```` javascript
var Tmpl = require('path/tmplate');

var customTmpl = new Tmpl(templateContent);
var html = customTmpl.render({
  list: [
    {name: 'xiaoming', age: 12}, {name: 'xiaohong', age: 12}
  ]
};
````

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2016 dukai  
Licensed under the MIT license.
