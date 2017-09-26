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

// mix.js('resources/assets/js/app.js', 'public/js')
//     .sass('resources/assets/sass/app.scss', 'public/css')

mix.js('resources/assets/rhythm/js/all.js', 'public/js')
    // mix.copyDirectory('resources/assets/rhythm/js', 'public/js');
mix.copyDirectory('resources/assets/rhythm/css', 'public/css')
mix.copyDirectory('resources/assets/rhythm/fonts', 'public/fonts');