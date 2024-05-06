const slidesContainer = document.getElementById('slides');
let currentIndex = 0;
const API_URL = 'https://v2.api.noroff.dev/blog/posts/leomrgreen';
const slideCards = document.querySelectorAll('.sliderItem');


async function getData() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    //sorting the three latest posts
    carouselArray = json.data.sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 3); 
    imageCarousel(carouselArray);
    skeletonCarouselLoader();
  } catch (error) {
    console.error(error)
  } finally {
    console.log("it's working")
  }
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

function imageCarousel(carouselArray) {
  slidesContainer.innerHTML = '';
  for (let i = 0; i < carouselArray.length; i++) {
      const carouselImage = document.createElement('div');
      carouselImage.className = 'sliderItem';
      if (i === 0) {
        carouselImage.style.display = 'flex';
      } else {carouselImage.style.display = 'none'}

      carouselImage.innerHTML = `
      <img src="${carouselArray[i].media.url}">
      <h2>${carouselArray[i].title}</h2>
      <button class="readMoreBtn" data-id="${carouselArray[i].id}">READ MORE</button>`;
      slidesContainer.appendChild(carouselImage);
  }

  // Add event listeners to each button after they have been added to the DOM
  document.querySelectorAll('.readMoreBtn').forEach(button => {
      button.addEventListener('click', function() {
          const articleId = this.getAttribute('data-id');
          window.location.href = `./post/?id=${articleId}`;  
      });
  });
}



function showCurrentImage() {  // this function is from my previous JS1 submission. Image is shown based on current index state
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