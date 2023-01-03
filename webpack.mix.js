const mix = require('laravel-mix');

mix
  .js('./src/main.js', './assets/main.bundle.js')
  .sass('src/main.scss', 'main.bundle.css')
  .sass('src/sections/home_slider.scss', 'section-home-slider.css')
  .sass('src/sections/card_w_icon.scss', 'section-card-w-icon.css')
  .setPublicPath('assets');