'use strict';

const main = document.querySelector('.main');
const arr = Array.from({ length: 27 });
const articles = arr.map(() => {
  const randomNum = Math.floor(Math.random() * 7 + 5);
  const article = document.createElement('article');
  article.setAttribute('class', 'content');
  article.setAttribute('style', `--i:${randomNum}`);
  article.insertAdjacentHTML(
    'beforeend',
    `
      <img
        src="https://via.placeholder.com/400x300"
        alt="썸네일"
        class="thumbnail"
      />
      <div class="content-info">
        <h2 class="content-title">Lorem, ipsum dolor sit</h2>
        <p class="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Molestiae nemo debitis numquam pariatur alias labore.
        </p>
        <span class="author">개발 전용차선</span>
      </div>    
    `
  );
  return article;
});
main.append(...articles);

const article = document.querySelectorAll('.content');
let className = 'show';

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio > 0) {
      entry.target.classList.add(className);
      observer.unobserve(entry.target);
    }
  });
  className = 'animate';
};

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const io = new IntersectionObserver(observerCallback, observerOptions);
articles.forEach((article) => io.observe(article));
