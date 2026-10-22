// Each project controls its own screenshots. No automatic advancement.
document.querySelectorAll('[data-slideshow]').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('[data-slide]')];
  const pages = [...gallery.querySelectorAll('[data-page]')];
  const counter = gallery.querySelector('[data-counter]');
  let current = 0;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    pages.forEach((page, i) => {
      if (i === current) page.setAttribute('aria-current', 'true');
      else page.removeAttribute('aria-current');
    });
    counter.textContent = `${current + 1} / ${slides.length}`;
  }

  gallery.querySelector('[data-previous]').addEventListener('click', () => show(current - 1));
  gallery.querySelector('[data-next]').addEventListener('click', () => show(current + 1));
  pages.forEach((page, i) => page.addEventListener('click', () => show(i)));
  gallery.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    show(current + (event.key === 'ArrowRight' ? 1 : -1));
    // Keep focus visible if the previously focused image link was hidden.
    if (event.target.closest('[data-slide]')) slides[current].querySelector('a').focus();
  });
  gallery.querySelector('.slideshow-controls').hidden = false;
  gallery.querySelector('.slide-pages').hidden = false;
});

// Keep enlarged screenshots on the page, with native modal focus and Escape support.
if (document.querySelector('.project-media')) {
  const viewer = document.createElement('dialog');
  viewer.className = 'image-viewer';
  viewer.setAttribute('aria-label', 'Screenshot viewer');
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'image-viewer-close';
  closeButton.setAttribute('aria-label', 'Close screenshot');
  closeButton.textContent = '×';
  const image = document.createElement('img');
  const caption = document.createElement('p');
  caption.id = 'image-viewer-caption';
  viewer.setAttribute('aria-describedby', caption.id);
  const controls = document.createElement('div');
  controls.className = 'image-viewer-controls';
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.textContent = '← Previous';
  previous.setAttribute('aria-label', 'Previous screenshot');
  const next = document.createElement('button');
  next.type = 'button';
  next.textContent = 'Next →';
  next.setAttribute('aria-label', 'Next screenshot');
  const counter = document.createElement('span');
  counter.setAttribute('role', 'status');
  counter.setAttribute('aria-live', 'polite');
  counter.setAttribute('aria-atomic', 'true');
  controls.append(previous, counter, next);
  viewer.append(closeButton, image, caption, controls);
  document.body.append(viewer);
  let opener;
  let sources = [];
  let current = 0;

  function showImage(index) {
    current = (index + sources.length) % sources.length;
    const source = sources[current];
    image.src = source.src;
    image.alt = source.alt;
    caption.textContent = source.alt;
    counter.textContent = `${current + 1} / ${sources.length}`;
  }
  previous.addEventListener('click', () => showImage(current - 1));
  next.addEventListener('click', () => showImage(current + 1));

  document.querySelectorAll('.project-media a').forEach((link) => {
    link.addEventListener('click', (event) => {
      // Preserve normal open-in-new-tab behavior when explicitly requested.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      const source = link.closest('.project-media').querySelector('img');
      sources = [...link.closest('[data-slideshow]').querySelectorAll('[data-slide] img')];
      showImage(sources.indexOf(source));
      viewer.showModal();
      document.documentElement.classList.add('image-viewer-open');
      closeButton.focus();
    });
  });
  closeButton.addEventListener('click', () => viewer.close());
  viewer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
    if (event.key === 'Tab') {
      const buttons = [closeButton, previous, next];
      const focused = buttons.indexOf(document.activeElement);
      event.preventDefault();
      buttons[(focused + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
    }
  });
  viewer.addEventListener('click', (event) => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    document.documentElement.classList.remove('image-viewer-open');
    opener?.focus({ preventScroll: true });
    image.removeAttribute('src');
  });
}
