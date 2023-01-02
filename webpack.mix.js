const mix = require('laravel-mix');

mix
  .js('./src/main.js', './assets/main.bundle.js')
  .sass('src/main.scss', 'main.bundle.css')
  .setPublicPath('assets');