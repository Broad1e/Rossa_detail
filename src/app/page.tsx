import ParallaxPhoto from './parallax-photo';
import WorkGallery from './work-gallery';
import { services, additionalDirections } from '../data/services';
import { galleryPhotos } from '../data/gallery';

function Brand({ className = '' }: { className?: string }) {
  return <span className={`brand ${className}`}>ROSSA.DETAIL</span>;
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Перейти к содержимому</a>
      <header className="header px-6 md:px-12">
        <a href="#" aria-label="ROSSA.DETAIL — в начало"><Brand /></a>
        <nav className="desktop-nav" aria-label="Основная навигация"><a href="#services">Направления</a><a href="#gallery">Галерея</a><a href="#approach">Подход</a><a href="#contact">Контакт <span aria-hidden="true">↗</span></a></nav>
        <details className="mobile-nav"><summary>Меню</summary><nav aria-label="Мобильная навигация"><a href="#services">Направления</a><a href="#gallery">Галерея</a><a href="#approach">Подход</a><a href="#contact">Контакт</a></nav></details>
      </header>
      <main id="main">
        <section className="hero px-6 md:px-12" aria-labelledby="hero-title">
          <ParallaxPhoto className="hero-photo" src="https://images.unsplash.com/photo-1716738703767-e277c57b2a90?auto=format&w=2600&q=85" alt="" position="50% 65%" fit="cover" mobileSrc="https://images.unsplash.com/photo-1716738703767-e277c57b2a90?auto=format&w=1400&q=85" eager speed={0.34} />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-meta"><span><i aria-hidden="true" /> САНКТ-ПЕТЕРБУРГ</span><span>EST. 2026</span></div>
          <div className="hero-center"><p className="eyebrow">THE ART OF AUTOMOTIVE CARE</p><h1 id="hero-title"><Brand /></h1><p className="hero-signature">DETAILING × WRAPPING<br />PAINTING × PROTECTION<br />RESTORATION</p></div>
          <div className="hero-bottom"><p>Характер — в деталях.<br /><span>Внимание — к вашему автомобилю.</span></p><a className="button" href="#services">Найти своё направление <span aria-hidden="true">↘</span></a></div>
          <span className="hero-line" aria-hidden="true" />
        </section>
        <section className="visual-story px-6 md:px-12" aria-labelledby="visual-title">
          <div className="section-top"><p className="eyebrow">ROSSA / В ДЕТАЛЯХ</p></div>
          <div className="visual-heading"><h2 id="visual-title">Форма притягивает.<br /><span className="muted">Детали остаются.</span></h2></div>
          <div className="visual-grid">
            <figure className="visual-figure visual-figure-wide"><ParallaxPhoto src="https://images.pexels.com/photos/5233259/pexels-photo-5233259.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Полировка чёрного кузова в мастерской — визуальный референс" position="50% 55%" speed={0.3} /><figcaption><span>01 / THE TOUCH</span></figcaption></figure>
            <figure className="visual-figure visual-figure-detail"><ParallaxPhoto src="https://images.unsplash.com/photo-1764935386319-83de8310b90d?auto=format&fit=crop&w=1600&q=85" alt="Фара и тёмный кузов Porsche крупным планом — визуальный референс" position="50% 50%" speed={0.34} /><figcaption><span>02 / THE CHARACTER</span></figcaption></figure>
          </div>
          <p className="reference-note">Визуальные референсы для первой версии, не работы студии. Фото: <a href="https://unsplash.com/photos/a-black-sports-car-parked-in-front-of-a-garage-JUiftQpriyo" target="_blank" rel="noopener noreferrer">Nejc Soklič</a> / <a href="https://unsplash.com/photos/a-black-car-parked-in-a-garage-s2unq_BAQjw" target="_blank" rel="noopener noreferrer">Jonathan Ikemura</a>, <a href="https://www.pexels.com/photo/a-person-polishing-the-black-car-5233259/" target="_blank" rel="noopener noreferrer">Khunkorn Laowisit</a>, <a href="https://unsplash.com/photos/close-up-of-a-modern-car-headlight-on-black-matte-surface-2uOS_cpo1vA" target="_blank" rel="noopener noreferrer">sumith ks</a>.</p>
        </section>
        <section id="services" className="services px-6 md:px-12" aria-labelledby="services-title">
          <div className="section-top"><p className="eyebrow">01 / НАПРАВЛЕНИЯ</p><span className="muted">Пять граней одного подхода</span></div>
          <h2 id="services-title">Ваш автомобиль.<br /><span className="muted">Ваше выражение.</span></h2>
          <div className="service-list">{services.map(service => <details className="service" key={service.id} id={service.id}><summary><span className="service-number">{service.number}</span><span className="service-title">{service.title}</span><span className="service-ru">{service.ru}</span><span className="plus" aria-hidden="true">+</span></summary><div className="service-body"><ul className="service-items">{service.items.map(item => <li key={item}>{item}</li>)}</ul><div className="service-action"><a href="#contact" className="text-link">Обсудить задачу ↗</a></div></div></details>)}</div>
        </section>
        <section className="additional-directions px-6 md:px-12" aria-labelledby="additional-title">
          <div className="additional-intro"><p className="eyebrow">ДОПОЛНИТЕЛЬНЫЕ НАПРАВЛЕНИЯ</p><h2 id="additional-title">За пределами<br /><span className="muted">автомобиля.</span></h2></div>
          <ul className="additional-list">{additionalDirections.map((direction, index) => <li key={direction}><span className="muted" aria-hidden="true">0{index + 1}</span><span>{direction}</span></li>)}</ul>
        </section>
        <section id="gallery" className="work-gallery px-6 md:px-12" aria-labelledby="gallery-title">
          <div className="section-top"><p className="eyebrow">02 / ГАЛЕРЕЯ РАБОТ</p>{!galleryPhotos.length && <span className="muted">Готовим фотографии студии</span>}</div>
          <h2 id="gallery-title">Работы.<br /><span className="muted">В деталях.</span></h2>
          <WorkGallery photos={galleryPhotos} />
        </section>
        <section id="approach" className="approach px-6 md:px-12" aria-labelledby="approach-title"><div><p className="eyebrow">03 / ПОДХОД</p><Brand className="approach-brand" /><p className="muted">FROM SPb. WITH ATTENTION.</p></div><div><h2 id="approach-title">Ничего лишнего.<br />Только то, что<br /><em>имеет значение.</em></h2><p className="approach-text">Мы начинаем с вашей идеи. Что хочется изменить, что сохранить, на чём сделать акцент. Из этого складывается решение для вашего автомобиля.</p><div className="approach-steps"><span>01 — Обсуждаем задачу</span><span>02 — Выбираем направление</span><span>03 — Согласовываем детали</span></div></div></section>
        <section id="contact" className="contact px-6 md:px-12" aria-labelledby="contact-title"><p className="eyebrow">04 / НАЧНЁМ С ВАШЕЙ ИДЕИ</p><h2 id="contact-title">LET’S TALK<span aria-hidden="true">↗</span></h2><div className="contact-bottom"><p>Расскажите об автомобиле<br />и о том, каким вы хотите его видеть.</p><a className="button button-light" href="https://www.instagram.com/rossa.detail/" target="_blank" rel="noopener noreferrer" aria-label="Открыть профиль rossa.detail в Instagram в новой вкладке">@rossa.detail <span aria-hidden="true">↗</span></a></div></section>
      </main>
      <footer className="footer px-6 md:px-12"><a href="#" aria-label="Вернуться в начало"><Brand /></a><span>САНКТ-ПЕТЕРБУРГ · EST. 2026</span><a href="#main">Наверх ↑</a></footer>
    </>
  );
}









