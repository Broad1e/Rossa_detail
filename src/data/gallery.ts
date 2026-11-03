export type GalleryPhoto = {
  id: string;
  /** Local path in public, for example /images/works/car-01.jpg. */
  src: string;
  alt: string;
  caption: string;
  /** Set true only for clearly labeled demonstration images. */
  demo?: boolean;
  credit?: { author: string; source: string; license: string };
};

// Replace these clearly marked examples with the studio's supplied photographs.
export const galleryPhotos: GalleryPhoto[] = [
  { id: 'demo-997', src: '/images/gallery/porsche-997.jpg', alt: 'Чёрный Porsche 911 Carrera, вид спереди сбоку', caption: 'Porsche / Carrera', demo: true, credit: { author: 'Mr.choppers', source: 'https://commons.wikimedia.org/wiki/File:2007_Porsche_911_(997)_Carrera_Coup%C3%A9_in_Black,_front_right.jpg', license: 'https://creativecommons.org/licenses/by-sa/3.0/' } },
  { id: 'demo-detail', src: '/images/gallery/porsche-detail.jpg', alt: 'Фара и переднее крыло красного Porsche 911 крупным планом', caption: 'Porsche / В деталях', demo: true, credit: { author: 'Dan Lindsay (Edgy01)', source: 'https://commons.wikimedia.org/wiki/File:Porsche_911_front_detail.jpg', license: 'https://creativecommons.org/licenses/by-sa/3.0/' } },
  { id: 'demo-993', src: '/images/gallery/porsche-993.jpg', alt: 'Чёрный Porsche 911 Turbo, вид спереди сбоку', caption: 'Porsche / Turbo', demo: true, credit: { author: 'Mr.choppers', source: 'https://commons.wikimedia.org/wiki/File:1997_Porsche_911_Turbo_in_Black,_front_right_(Greenwich).jpg', license: 'https://creativecommons.org/licenses/by-sa/3.0/' } },
];
