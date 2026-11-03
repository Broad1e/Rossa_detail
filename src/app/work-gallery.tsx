'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { GalleryPhoto } from '../data/gallery';

export default function WorkGallery({ photos }: { photos: GalleryPhoto[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const current = photos[active];

  const move = (direction: number) => setActive(index => (index + direction + photos.length) % photos.length);

  useEffect(() => {
    const element = stage.current;
    if (!element || photos.length < 2) return;
    let accumulated = 0;
    let lastMove = 0;
    const wheel = (event: WheelEvent) => {
      // Preserve vertical page scrolling; horizontal trackpad gestures browse photos.
      const delta = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
      if (!delta || (!event.shiftKey && Math.abs(delta) <= Math.abs(event.deltaY))) return;
      event.preventDefault();
      if (Date.now() - lastMove < 450) return;
      accumulated += delta;
      if (Math.abs(accumulated) < 35) return;
      const direction = Math.sign(accumulated);
      setActive(index => (index + direction + photos.length) % photos.length);
      accumulated = 0;
      lastMove = Date.now();
    };
    element.addEventListener('wheel', wheel, { passive: false });
    return () => element.removeEventListener('wheel', wheel);
  }, [photos.length]);

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [selected]);

  function open(photo: GalleryPhoto) {
    setSelected(photo);
    dialog.current?.showModal();
  }

  return <>
    {photos.length ? <div className="work-carousel" role="region" aria-roledescription="карусель" aria-label="Фотографии галереи" onKeyDown={event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home') setActive(0);
      else if (event.key === 'End') setActive(photos.length - 1);
      else move(event.key === 'ArrowRight' ? 1 : -1);
    }}>
      <div className="work-stage" ref={stage} onPointerDown={event => { pointerStart.current = event.clientX; swiped.current = false; }} onPointerCancel={() => { pointerStart.current = null; }} onPointerUp={event => {
        if (pointerStart.current !== null && Math.abs(event.clientX - pointerStart.current) > 40) {
          swiped.current = true;
          move(event.clientX < pointerStart.current ? 1 : -1);
        }
        pointerStart.current = null;
      }}>
        {photos.map((photo, index) => {
          let offset = (index - active + photos.length) % photos.length;
          if (offset > photos.length / 2) offset -= photos.length;
          const hidden = Math.abs(offset) > 1;
          return <figure className={`work-card work-slide${index === active ? ' is-active' : ''}`} key={photo.id} style={{ '--slide-offset': offset, '--slide-depth': Math.abs(offset), zIndex: photos.length - Math.abs(offset) } as CSSProperties} aria-hidden={hidden || undefined}>
            <button className="work-photo" type="button" tabIndex={hidden ? -1 : 0} onDragStart={event => event.preventDefault()} onClick={() => {
              if (swiped.current) { swiped.current = false; return; }
              if (index === active) open(photo); else setActive(index);
            }} aria-label={`${index === active ? 'Увеличить' : 'Выбрать'} фото: ${photo.alt}`} aria-current={index === active ? 'true' : undefined}>
              <Image src={photo.src} alt={photo.alt} fill unoptimized draggable={false} sizes="(max-width: 760px) 70vw, 52vw" />
              <span className="work-expand" aria-hidden="true">↗</span>
            </button>
          </figure>;
        })}
      </div>
      <div className="work-controls">
        <button className="work-arrow" type="button" onClick={() => move(-1)} disabled={photos.length < 2} aria-label="Предыдущая фотография">←</button>
        <span className="work-counter" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
        <button className="work-arrow" type="button" onClick={() => move(1)} disabled={photos.length < 2} aria-label="Следующая фотография">→</button>
      </div>
      {current?.demo && <p className="work-credit">Демонстрационные фотографии, не работы ROSSA.DETAIL. {current.credit && <><a href={current.credit.source} target="_blank" rel="noopener noreferrer">Фото: {current.credit.author}</a> · <a href={current.credit.license} target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a>.</>}</p>}
    </div> : <div className="work-grid">{[1, 2, 3].map(number => <div className="work-placeholder" key={number}>
        <span className="eyebrow" aria-hidden="true">0{number} / ROSSA</span>
        <span className="work-placeholder-mark" aria-hidden="true">↗</span>
        <p>Фотографии работ<br /><span className="muted">скоро появятся здесь</span></p>
      </div>)}</div>}
    <dialog className="work-dialog" ref={dialog} aria-labelledby="work-dialog-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="work-dialog-content">
        <button type="button" className="work-close" onClick={() => dialog.current?.close()} autoFocus aria-label="Закрыть фотографию">Закрыть <span aria-hidden="true">×</span></button>
        {selected && <div className="work-full-photo"><Image src={selected.src} alt={selected.alt} fill unoptimized sizes="100vw" /></div>}
        <p id="work-dialog-title" className="sr-only">{selected?.demo ? 'Демонстрационное фото — не работа студии' : selected?.alt}</p>
      </div>
    </dialog>
  </>;
}
