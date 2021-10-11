const showPosts = (num) => {
  const main = document.querySelector('.main');
  const arr = Array.from({ length: num });
  const posts = arr.map(() => createPost());
  main.append(...posts);
};

const createPost = () => {
  const randomNum = Math.floor(Math.random() * 7 + 5);
  const post = document.createElement('article');
  post.setAttribute('class', 'content');
  post.setAttribute('style', `--i:${randomNum}`);
  post.insertAdjacentHTML(
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
  return post;
};

export default showPosts;
