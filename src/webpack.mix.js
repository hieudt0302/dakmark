let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')



/* BEGIN: MIX ALL THEME JS */
mix.copy('resources/assets/front/js/all.js', 'public/js')
mix.copy('resources/assets/front/js/bootstrap.min.js', 'public/js')
mix.copy('resources/assets/front/js/contact-form.js', 'public/js')
mix.copy('resources/assets/front/js/contact-reservations-form.js', 'public/js')
mix.copy('resources/assets/front/js/gmap3.min.js', 'public/js')

mix.copy('resources/assets/front/js/imagesloaded.pkgd.min.js', 'public/js')
mix.copy('resources/assets/front/js/isotope.pkgd.min.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.ajaxchimp.min.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.appear.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.backgroundvideo.min.js', 'public/js')

mix.copy('resources/assets/front/js/jquery.countTo.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.downCount.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.easing.1.3.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.fitvids.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.localScroll.min.js', 'public/js')

mix.copy('resources/assets/front/js/jquery.magnific-popup.min.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.mb.YTPlayer.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.parallax-1.1.3.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.scrollTo.min.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.simple-text-rotator.min.js', 'public/js')

mix.copy('resources/assets/front/js/jquery.sticky.js', 'public/js')
mix.copy('resources/assets/front/js/jquery.viewport.mini.js', 'public/js')
mix.copy('resources/assets/front/js/jquery-1.11.2.min.js', 'public/js')
mix.copy('resources/assets/front/js/masonry.pkgd.min.js', 'public/js')
mix.copy('resources/assets/front/js/owl.carousel.min.js', 'public/js')

mix.copy('resources/assets/front/js/placeholder.js', 'public/js')
mix.copy('resources/assets/front/js/rev-slider.js', 'public/js')
mix.copy('resources/assets/front/js/SmoothScroll.js', 'public/js')
mix.copy('resources/assets/front/js/tiltfx.js', 'public/js')
mix.copy('resources/assets/front/js/wow.min.js', 'public/js')

//Rs-Plugin
mix.copyDirectory('resources/assets/front/rs-plugin/assets', 'public/rs-plugin/assets')
mix.copyDirectory('resources/assets/front/rs-plugin/css', 'public/rs-plugin/css')
mix.copyDirectory('resources/assets/front/rs-plugin/font', 'public/rs-plugin/font')
mix.copyDirectory('resources/assets/front/rs-plugin/images', 'public/rs-plugin/images')

mix.copy('resources/assets/front/rs-plugin/js/jquery.themepunch.plugins.min.js', 'public/rs-plugin/js')
mix.copy('resources/assets/front/rs-plugin/js/jquery.themepunch.revolution.js', 'public/rs-plugin/js')
mix.copy('resources/assets/front/rs-plugin/js/jquery.themepunch.revolution.min.js', 'public/rs-plugin/js')
mix.copy('resources/assets/front/rs-plugin/js/jquery.themepunch.tools.min.js', 'public/rs-plugin/js')

/* END: MIX ALL THEME JS */
mix.copyDirectory('resources/assets/front/images', 'public/images')
mix.copyDirectory('resources/assets/front/css', 'public/css')
mix.copyDirectory('resources/assets/front/fonts', 'public/fonts')

/* ADMINLTE*/
//DIST
mix.copyDirectory('resources/assets/adminlte/dist','public/adminlte/dist')
//PLUGINS
mix.copyDirectory('resources/assets/adminlte/plugins','public/adminlte/plugins')
//CSS
mix.copy('node_modules/bootstrap/dist/css/bootstrap.min.css','public/adminlte/css')
mix.copy('node_modules/ionicons/dist/css/ionicons.min.css','public/adminlte/css')
mix.copy('node_modules/morris.js/morris.css','public/adminlte/css')
mix.copy('node_modules/jvectormap/jquery-jvectormap.css','public/adminlte/css')
mix.copy('node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css','public/adminlte/css')
mix.copy('node_modules/bootstrap-daterangepicker/daterangepicker.css','public/adminlte/css')
//JS
mix.copy('node_modules/jquery/dist/jquery.min.js','public/adminlte/js')
mix.copy('node_modules/bootstrap/dist/js/bootstrap.min.js','public/adminlte/js')

mix.copy('node_modules/raphael/raphael.min.js','public/adminlte/js')
mix.copy('node_modules/morris.js/morris.min.js','public/adminlte/js')
mix.copy('node_modules/jquery-sparkline/jquery.sparkline.min.js','public/adminlte/js')
mix.copy('node_modules/jquery-sparkline/jquery.sparkline.min.js','public/adminlte/js')
mix.copy('node_modules/moment/min/moment.min.js','public/adminlte/js')
mix.copy('node_modules/bootstrap-daterangepicker/daterangepicker.js','public/adminlte/js')
mix.copy('node_modules/fastclick/lib/fastclick.js','public/adminlte/js')
mix.copy('node_modules/jquery-knob/dist/jquery.knob.min.js','public/adminlte/js')
mix.copy('node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js','public/adminlte/js')
mix.copy('node_modules/slimscroll/lib/slimscroll.js','public/adminlte/js')
//FONTS
mix.copyDirectory('node_modules/ionicons/dist/fonts','public/adminlte/fonts');
