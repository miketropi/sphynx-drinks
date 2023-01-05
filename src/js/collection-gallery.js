import Masonry from 'masonry-layout';

export default function CollectionGallery () {
  const Grid = document.querySelectorAll('.collection-gallery__box-grid');
  const CacheList = [];
  if(!Grid) return;

  [...Grid].forEach(elem => {
    const msnry = new Masonry(elem, {
      // options...
      columnWidth: '.grid-sizer',
      itemSelector: '.grid-item',
      gutter: 30
    });

    CacheList.push(msnry);
  })

  // trigger while browser load complated
  window.addEventListener('load', () => {
    console.log(CacheList);
    [...CacheList].forEach(m => {
      m.layout();
    })
  })
}

CollectionGallery();