# Fade in, Fade out 구현하기

![fadeinandout](https://user-images.githubusercontent.com/66554164/136690015-dfb985a4-ffd1-44ac-9cf6-07b8d0666c99.png)

---

## 근데 이제 UI/UX를 곁들인..

[ZUM Tech](https://zuminternet.github.io/) 블로그를 구경하다 사이트가 너무 이뻐서 클론해보았다. 정확히는 사이트의 fade in, fade out 동작 방식이 궁금해서 직접 만들었다.

---

## 사용 기술

- JavaScript
  - ES6
  - IntersectionObserver API
  - Math built-in object
- HTML
  - Semantic tag
- CSS
  - Animation
  - Media query
  - Pseudo-classes

---

## 궁금했던 동작 방식

줌 기술 블로그의 fade in, fade out은 첫화면에 노출되는 포스트는 그대로 보이고 스크롤을 내릴 때 다음 포스트들은 애니메이션이 작동된다. 자세히 살펴보니 첫화면에 노출된 포스트는 `shown`클래스가 생기며(화면의 크기에 따라 3개든 5개든 생김 = 동적이다) 스크롤을 일정크기만큼 내리면 포스트가 올라오며 `animate`클래스가 생성된다.

1. 모든 포스트는 초기값에 `opacity: 0`이 적용되어 있다.
2. 화면의 크기에 따라 첫화면에 노출된 포스트는 `shown`클래스 생성
3. 첫화면에 노출되지 않은 포스트들은 스크롤 다운 시 `animate`클래스 생성
4. `animate`클래스가 추가된 포스트는 `moveUp` 애니메이션 작동

---

## 문제 해결

```js
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
```

요즘은 IntersectionObserver API를 자주 사용한다. 활용할 곳도 많고 쓰다보니 조금은 익숙해져서 재밌게 프로그래밍하고 있다. 첫화면에 노출된 포스트는 `show`클래스를 생성하고, 그 다음 콜백의 포스트들은 `animate`를 생성한다.
와..진짜 이거 구현하는데 시간 엄청 썼다..그래도 그만큼 엄청 뿌듯했다. 🤣

구현 해놓고 보니 간단해 보이는데 그 전엔 정말 머리를 쥐어짜내야했다. 컴퓨터가 원하는 답을 얻기가 어찌나 힘든지 😅

이것저것 시도해보다가 결국 성공해서 기분이 좋다.

그리고 또 하나 재밌었던 부분은 각기 다른 `animation-duration` 시간이었다.
포스트가 올라올 때마다 올라오는 시간이 모두 달랐다. 그것도 매번..! 이걸 꼭 구현하고 싶었는데 예전에 유튜브에서 CSS로 커피의 수증기를 표현할 때 썼던 코드를 적용하면 되겠다 싶었다.

```js
const randomNum = Math.floor(Math.random() * 7 + 5);
const article = document.createElement('article');
article.setAttribute('class', 'content');
article.setAttribute('style', `--i:${randomNum}`);
```

```css
.content.animate {
  animation: moveUp 0.65s;
  animation-duration: calc(var(--i) * 0.07s);
  opacity: 1;
}
```

---

## 신경쓴 부분

- 모바일 반응(flex layout)
- 동적으로 생성되는 클래스
  - 동적으로 클래스가 생성되기 때문에 첫화면이 위에 있든 아래에 있든(아래에서 새로고침 시) 애니메이션이 구현된다.
- 각기 다른 `animation-duration` 시간
- 부드러운 애니메이션
- 최대한 간결한 태그 깊이
  - 부스트코스에서 웹 UI를 배울 때 지적을 많이 받은 부분이 '불필요한 태그를 생성하지 말라'는 것이었다. 깊이가 깊을수록 유지보수가 어렵고 성능상 좋지 않다는 이유였다.
  - 그래서 최대한 간결한 뎁스를 유지하도록 노력했다.
- [사이트 보기](https://byungyeonkim.github.io/Fade-in-and-out/) 🌱
