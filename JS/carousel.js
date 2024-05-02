const slidesContainer = document.getElementById('slides');
let currentIndex = 0;
const API_URL = 'https://v2.api.noroff.dev/blog/posts/leomrgreen';
const slideCards = document.querySelectorAll('.sliderItem');

function getData() {
  fetch(API_URL, { method: 'GET' })  
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          carouselArray = data.data.sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 3);
          imageCarousel(carouselArray);
          skeletonCarouselLoader();
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

function skeletonCarouselLoader() {
  const slideCards = document.querySelectorAll('.sliderItem'); 
  if (localStorage.getItem('lightMode') === 'false') {
    slideCards.forEach(card => { 
      card.classList.add('loadingDark'); 
      setTimeout(() => {
        card.classList.remove('loadingDark'); 
      }, 1500);
    });
  } else {
    slideCards.forEach(card => { 
      card.classList.add('loading'); 
      setTimeout(() => {
        card.classList.remove('loading'); 
      }, 1500);
    });
  }
}

function imageCarousel(carouselArray) {  // this function is from my previous JS1 submission. New thing with this is the new Date and slice method that I use to reach the latest 3 posts from my API array
    slidesContainer.innerHTML = '';
    for (let i = 0; i < carouselArray.length; i++) {
        const carouselImage = document.createElement('div');
        if (i === 0) {
            carouselImage.style.display = 'flex';
        } else {
            carouselImage.style.display = 'none';
        }
        
        carouselImage.innerHTML = 
        `<img src="${carouselArray[i].media.url}">
        <h2>${carouselArray[i].title}</h2>`;
        
        carouselImage.setAttribute('class', 'sliderItem');
        slidesContainer.appendChild(carouselImage);
    }
}

function showCurrentImage() {
  const images = slidesContainer.querySelectorAll('.sliderItem');
  images.forEach((div, index) => {
      if (index === currentIndex) {
        div.style.display = 'flex';
      } else {
        div.style.display = 'none';
      }
  });
}

document.getElementById('next').addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % carouselArray.length;
  showCurrentImage();
});

document.getElementById('prev').addEventListener('click', function() {
  currentIndex = (currentIndex - 1 + carouselArray.length) % carouselArray.length; 
  showCurrentImage();
});

getData();