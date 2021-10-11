'use strict';
import showPosts from './posts.js';

showPosts(27);

const posts = document.querySelectorAll('.content');
let className = 'show';

const observerCallback = (entries, observer) => {
  entries.forEach(({ isIntersecting, intersectionRatio, target }) => {
    if (isIntersecting && intersectionRatio > 0) {
      target.classList.add(className);
      observer.unobserve(target);
    }
  });
  className = 'animate';
};

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const io = new IntersectionObserver(observerCallback, observerOptions);
posts.forEach((post) => io.observe(post));
