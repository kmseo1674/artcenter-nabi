## 인터랙티브 랜딩 페이지 스크립트 (GSAP 및 Swiper 활용)

이 스크립트는 Vanilla JavaScript, **GSAP**, **Swiper**를 활용하여 사용자 인터페이스의 다양한 인터랙션과 애니메이션을 구현합니다.

<br/>

### 주요 기능

- 반응형 메뉴 (모바일/데스크탑 구분)
- 메인 슬라이더 (Swiper 적용)
- 상품 슬라이드 (브레이크포인트 설정)
- 스크롤 트리거 애니메이션 (GSAP)
- 커스텀 마우스 커서 및 호버 효과
- Top 버튼 기능
- 디바이스별 이미지 자동 교체

<br/>

### 사용 기술

| 태그 | ![HTML](https://img.shields.io/badge/HTML5-F05032?logo=html5&logoColor=white&style=flat-square) | ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=flat-square) | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat-square) | ![Swiper](https://img.shields.io/badge/Swiper-6332F6?logo=swiper&logoColor=white&style=flat-square) | ![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=white&style=flat-square) |
|---|---|---|---|---|---|
| 설명 | 마크업 구조 | 반응형 스타일 처리 | DOM 제어, Swiper & GSAP 연동 | 슬라이더 구현 | 고급 스크롤 애니메이션 |


<br/>

### 기능 상세 설명

### 1. 메인 슬라이더
- 기능: 메인 슬라이더를 생성합니다.
- 특징: 자동 재생 기능과 페이지네이션을 제공하여 사용자에게 콘텐츠를 쉽게 탐색할 수 있게 합니다.

``` JavaScript
    const mainSwiper = new Swiper(".mainSwiper", {
    loop: true,
    autoplay: { 
        delay: 5000
    },
    pagination: {
        el: ".mainSwiper .swiper-pagination",
        clickable: true
    }
});
```

---

### 2. 화면 크기에 따라 모바일/데스크탑 여부 구분

- 기능: 모바일과 데스크탑 환경을 감지하여 메뉴의 동작을 조정합니다.
- 특징: 탭 클릭 시 사이드 메뉴가 열리고 닫히며, 모바일에서는 클릭으로 메뉴를 토글할 수 있습니다.

```javascript
let tab = document.querySelector(".tab");
let gnb = document.querySelector("#gnb");
let dim = document.querySelector(".dimmed");
let body = document.querySelector("body");
let topbtn = document.querySelector(".top");

let menuList = gnb.querySelectorAll("#gnb > ul > li");
let isMobile = "";

function deviceCheck() {
    if (window.innerWidth > 950) {
        isMobile = "desktop";
    } else {
        isMobile = "mobile";
    }
}

deviceCheck();
window.addEventListener("resize", deviceCheck);

```

---
### 3. 메뉴 애니메이션

- 기능: 메뉴 항목에 마우스 오버 및 클릭 시 애니메이션을 추가하여 사용자 경험을 향상시킵니다.
- 특징: GSAP를 사용하여 부드러운 애니메이션 효과를 제공하며, 모바일 환경에서는 클릭으로 하위 메뉴를 표시합니다.

```javascript
  menuList.forEach(function(item) {
    let sub = item.lastElementChild;

    item.addEventListener("mouseenter", function() {
        if (isMobile == "desktop") {
            item.classList.add("active");
            gsap.fromTo(sub, { display: "block", height: 0 }, { height: "auto", duration: 0.3 });
        }
    });

    item.addEventListener("mouseleave", function() {
        if (isMobile == "desktop") {
            item.classList.remove("active");
            gsap.to(sub, { height: 0, duration: 0.3, onComplete: function() {
                sub.removeAttribute("style");
            }});
        }
    });

    item.addEventListener("click", function(e) {
        if (isMobile == "mobile") {
            e.preventDefault();
            item.classList.toggle("active");
            if (item.classList.contains("active")) {
                gsap.fromTo(sub, { display: "block", height: 0 }, { height: "auto", duration: 0.3 });
            } else {
                gsap.to(sub, { height: 0, duration: 0.3, onComplete: function() {
                    sub.removeAttribute("style");
                }});
            }
        }
    });
});
```

---
### 4.탑 버튼 

- 기능: 페이지 상단으로 스크롤할 수 있는 버튼을 구현합니다.
- 특징: GSAP를 사용하여 부드럽게 스크롤을 이동하도록 설정합니다.

```javascript
  topbtn.addEventListener("click", function(e) {
    e.preventDefault();
    gsap.to(window, { scrollTo: 0, duration: 0.5 });
});
```

---
### 5. 섹션 애니메이션1

- 기능: 각 섹션에서 스크롤 시 애니메이션 효과를 적용합니다.
- 특징: GSAP의 ScrollTrigger를 사용하여 특정 섹션이 뷰포트에 들어올 때 애니메이션이 발동됩니다.

```javascript
  const slText = gsap.timeline();
slText.from(".sl_text strong", { y: 60, opacity: 0, duration: .5 }, "a");
slText.from(".sl_text p", { y: 60, opacity: 0, duration: .5, stagger: 0.2 }, "a+=0.2");

// about 섹션
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".about",
        start: "top center",
        end: "bottom center"
    }
});
tl.fromTo(".textbox", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "a");
tl.fromTo(".right_textbox", { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "a+=0.2");
```

---
### 6. 섹션 애니메이션2

- 기능: 뉴스 항목이 스크롤에 따라 애니메이션으로 표시됩니다.
- 특징: 각 항목이 다르게 나타나도록 설정하여 시각적인 변화를 줍니다.
이렇게 스크립트를 구성된 각 파트별로 기능과 특징을 설명할 수 있습니다.

```javascript
  let newslist = document.querySelectorAll(".news > .inner > ul > li");
const nsTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".news",
        start: "top center",
        end: "bottom 100%"




    }
});

newslist.forEach(function(item, i) {
    if (i % 2 == 1) {
        nsTl.from(item, { y: 50, opacity: 0, duration: 1 }, "a+=0.2");
    } else {
        nsTl.from(item, { y: -50, opacity: 0, duration: 1 }, "a");
    }
});
```

---




