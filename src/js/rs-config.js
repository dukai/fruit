requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: 'lib/jquery-1.11.3.min',
        text: 'lib/text',
        moment: 'lib/moment.min',
        'app/static-config': 'rs-config'
    },
    shim: {
    	'lib/jquery-scrollspy': {
    		deps: ['jquery']
    	},
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

