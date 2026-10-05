(() => {
  const video = document.querySelector('#journey');
  const story = document.querySelector('#story');
  const film = document.querySelector('.film-frame');
  const poster = document.querySelector('.film-poster');
  const copy = document.querySelector('.chapter-copy');
  const count = document.querySelector('#chapter-count');
  const kicker = document.querySelector('#chapter-kicker');
  const title = document.querySelector('#chapter-title');
  const body = document.querySelector('#chapter-body');
  const note = document.querySelector('#film-note');
  const progress = document.querySelector('#progress-fill');
  const timeReadout = document.querySelector('#readout-time');
  const durationReadout = document.querySelector('#duration-time');
  const dots = [...document.querySelectorAll('.chapter-dot')];
  const playButton = document.querySelector('#motion-play');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // The three clip joins in the final Magnific export define the narrative beats.
  // Scene 2 and 3 split the long middle connector into fruit and bark moments.
  const chapters = [
    {
      at: 0,
      image: './public/media/grove-wide.jpg',
      kicker: 'The grove',
      title: 'A green world,<br><em>held in light.</em>',
      body: 'Follow the path beneath the fig trees. The air is warm, the leaves still bright.',
      note: 'LEAF · FRUIT · WOOD',
    },
    {
      at: 0.265,
      image: './public/media/fig-close.jpg',
      kicker: 'The fruit',
      title: 'A fig, still<br><em>warm from the sun.</em>',
      body: 'The fruit gives the grove its milky softness: green at the edge, honeyed at its heart.',
      note: 'MILKY FIG · GREEN SAP',
    },
    {
      at: 0.46,
      image: './public/media/fig-detail.jpg',
      kicker: 'The tree',
      title: 'Stay close<br><em>to the bark.</em>',
      body: 'Leaves give way to wood. The camera follows the old trunk down into its roots.',
      note: 'FIG LEAF · WHITE CEDAR',
    },
    {
      at: 0.83,
      image: './public/media/fig-path.jpg',
      kicker: 'The scent',
      title: 'The whole tree,<br /><em>held in a scent.</em>',
      body: 'Philosykos Eau de Parfum: a memory of the fig tree, from leaf to wood.',
      note: 'PHILOSYKOS · EAU DE PARFUM',
    },
  ];

  let framePending = false;
  let lastChapter = -1;
  let scrollProgress = 0;
  let userPlayingReducedFilm = false;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '—:—';
    const safe = Math.max(0, Math.floor(seconds));
    return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
  };

  function chapterFor(progressValue) {
    let index = 0;
    for (let i = 1; i < chapters.length; i += 1) {
      if (progressValue >= chapters[i].at) index = i;
    }
    return index;
  }

  function updateChapter(index) {
    if (index === lastChapter) return;
    lastChapter = index;
    const chapter = chapters[index];
    copy.classList.add('is-changing');
    window.setTimeout(() => {
      count.innerHTML = `${String(index + 1).padStart(2, '0')} <span>/ 04</span>`;
      kicker.textContent = chapter.kicker;
      title.innerHTML = chapter.title;
      body.textContent = chapter.body;
      note.textContent = chapter.note;
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === index);
        if (dotIndex === index) dot.setAttribute('aria-current', 'step');
        else dot.removeAttribute('aria-current');
      });
      if (reduceMotion.matches && !userPlayingReducedFilm) poster.src = chapter.image;
      requestAnimationFrame(() => copy.classList.remove('is-changing'));
    }, 120);
  }

  function getScrollProgress() {
    const rect = story.getBoundingClientRect();
    const scrollable = Math.max(1, story.offsetHeight - window.innerHeight);
    return clamp(-rect.top / scrollable, 0, 1);
  }

  function renderScrollState() {
    framePending = false;
    scrollProgress = getScrollProgress();
    const activeChapter = chapterFor(scrollProgress);
    updateChapter(activeChapter);
    progress.style.width = `${scrollProgress * 100}%`;
    if (video.duration) timeReadout.textContent = formatTime(video.duration * scrollProgress);

    // In reduced-motion mode the painting stays still while the reader moves among chapters.
    if (!reduceMotion.matches && Number.isFinite(video.duration) && video.readyState >= 2 && !userPlayingReducedFilm) {
      const nextTime = Math.min(video.duration - 0.04, Math.max(0, video.duration * scrollProgress));
      if (Math.abs(video.currentTime - nextTime) > 0.055) {
        try { video.currentTime = nextTime; } catch (_) { /* metadata may still be settling */ }
      }
    }
  }

  function queueRender() {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(renderScrollState);
  }

  function syncMotionPreference() {
    document.body.classList.toggle('reduce-motion', reduceMotion.matches);
    if (reduceMotion.matches) {
      video.pause();
      video.classList.remove('is-ready');
      playButton.hidden = false;
      userPlayingReducedFilm = false;
      poster.src = chapters[chapterFor(getScrollProgress())].image;
    } else {
      playButton.hidden = true;
      userPlayingReducedFilm = false;
      if (video.readyState >= 2) video.classList.add('is-ready');
      queueRender();
    }
  }

  video.addEventListener('loadedmetadata', () => {
    durationReadout.textContent = formatTime(video.duration);
    queueRender();
  });
  video.addEventListener('loadeddata', () => {
    if (!reduceMotion.matches || userPlayingReducedFilm) video.classList.add('is-ready');
  });
  video.addEventListener('error', () => {
    film.classList.add('media-unavailable');
    video.classList.remove('is-ready');
  });
  video.addEventListener('timeupdate', () => {
    if (userPlayingReducedFilm && video.duration) {
      const ratio = video.currentTime / video.duration;
      progress.style.width = `${ratio * 100}%`;
      timeReadout.textContent = formatTime(video.currentTime);
    }
  });
  video.addEventListener('ended', () => {
    if (userPlayingReducedFilm) {
      userPlayingReducedFilm = false;
      video.pause();
      video.classList.remove('is-ready');
      poster.src = chapters[chapterFor(getScrollProgress())].image;
    }
  });

  window.addEventListener('scroll', queueRender, { passive: true });
  window.addEventListener('resize', queueRender, { passive: true });
  reduceMotion.addEventListener?.('change', syncMotionPreference);

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const chapter = chapters[Number(dot.dataset.chapter)];
      const top = story.getBoundingClientRect().top + window.scrollY;
      const scrollable = Math.max(1, story.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: top + scrollable * chapter.at,
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
      });
    });
  });

  playButton.addEventListener('click', async () => {
    userPlayingReducedFilm = true;
    video.classList.add('is-ready');
    video.currentTime = 0;
    poster.src = chapters[0].image;
    try {
      await video.play();
      playButton.textContent = 'Playing the journey';
    } catch (_) {
      userPlayingReducedFilm = false;
      video.classList.remove('is-ready');
      film.classList.add('media-unavailable');
    }
  });

  syncMotionPreference();
  queueRender();
})();
