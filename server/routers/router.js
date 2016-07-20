var express = require('express');
var router = express.Router();
var path = require('path');

var dt = {
    code: 0, 
    msg: '',
    total: 0,
    data: null
};


router.get('/youcoinom/data/rule/queryFactorRule.do', function(req, res){
	dt.data = {
    value: 1
  };
  res.send(dt);
});

var model = {
  rsrv: {
    get: function(value){
      return value;
    }
  },
  appctx: ''
}

router.get('/youcoinom/page/m6/om0004.do', function(req, res){
  // res.send('aaa');
  res.render('index.html', Object.assign(model, {name: 'fruit'}));
});

module.exports = router;