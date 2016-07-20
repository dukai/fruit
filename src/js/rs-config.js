requirejs.config({
    baseUrl: '../js',
    paths: {
        // jquery: 'lib/jquery-2.1.4.min',
        // text: 'lib/text',
        // moment: 'lib/moment.min',
        'app/static-config': 'rs-config'
    },
    shim: {
    	// 'comp/datetimepicker/jquery.datetimepicker': {
    	// 	deps: ['jquery']
    	// },
     //    'lib/swiper/swiper.jquery.min': {
     //        deps: ['jquery'],
     //        exports: 'Swiper'
     //    }
    },
    packages: [
    ]
});

window.staticConfig = {
    // STATIC_HOST: '../',
    // CORNER_HOST: '../',
    // WEB_ALIAS: '/mall',
    // getURL: function(piece){
    //     return "/mall" + piece;
    // }
};

define('app/static-config', staticConfig);

// require(['comp/widget-loader', 'app/widget-header']);

