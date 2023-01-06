const mix = require('laravel-mix');

mix.autoload({
  jquery: ['$', 'window.jQuery']
});

mix
  .js('./src/main.js', './assets/main.bundle.js')
  .sass('src/main.scss', 'main.bundle.css')
  .sass('src/sections/home_slider.scss', 'section-home-slider.css')
  .sass('src/sections/card_w_icon.scss', 'section-card-w-icon.css')
  .sass('src/sections/cta_image_text.scss', 'section-cta-image-text.css')
  .setPublicPath('assets');