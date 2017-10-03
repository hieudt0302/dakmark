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
mix.copyDirectory('resources/assets/front/fonts', 'public/fonts');