const mix = require('laravel-mix');

mix
  .js('./src/main.js', './assets/main.bundle.js')
  .sass('src/main.scss', 'main.bundle.css')
  .sass('src/sections/home_slider.scss', 'section-home-slider.css')
  .setPublicPath('assets');