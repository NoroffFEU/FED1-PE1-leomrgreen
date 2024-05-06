const API_URL = 'https://v2.api.noroff.dev/blog/posts/leomrgreen';
const loadMoreBtn = document.getElementById('loadMoreBtn');
const drkModeBtn = document.getElementById('drkModeIcon');

function displayPosts(blogArticles) {
  const blogContainer = document.getElementById('articleGrid');
  blogContainer.innerHTML = '';  
  blogArticles.forEach((article) => {
    const blogHtml = generateBlogHtml(article);
    blogContainer.appendChild(blogHtml);

    if (localStorage.getItem('lightMode') === 'false') {
      blogHtml.classList.toggle('loadingDark')
      setTimeout(() => {
        blogHtml.classList.remove('loadingDark')
      }, 1500);
    } else {
      blogHtml.classList.toggle('loading');
      // Remove the loading class after 3 seconds
      setTimeout(() => {
        blogHtml.classList.remove('loading');
      }, 1500);
    }
  });
  updateCardStyles();
}

function updateCardStyles() {
  const cards = document.querySelectorAll('.gridCard');
  const isLightMode = localStorage.getItem('lightMode') === 'true';
  cards.forEach(card => {
    if (isLightMode) {
      card.style.backgroundColor = '#eee';
    } else {card.style.backgroundColor = '#3a3a3a'}
  });
}

drkModeBtn.addEventListener('click', () => {
  updateCardStyles(); 
});


function generateBlogHtml(article) {
  const gridCard = document.createElement('div');
  gridCard.className = 'gridCard';
  
  const articleImage = document.createElement('img');
  articleImage.src = article.media.url;
  articleImage.alt = article.media.alt;
  articleImage.addEventListener('click', () => {
    window.location.href = `./post/?id=${article.id}`; 
  });
  
  const editBtn = document.createElement('button');
  editBtn.className = 'fa-solid fa-wrench'
  editBtn.addEventListener('click',  () => {
    window.location.href = `./post/edit.html?id=${article.id}`;
  })

  const articleHeading = document.createElement('h3');
  articleHeading.textContent = article.title;

  if (localStorage.getItem('isUserLoggedIn') === 'true') 
    { 
      gridCard.append(articleImage, articleHeading, editBtn); 
      } else {gridCard.append(articleImage, articleHeading)};

  return gridCard;
}

async function main() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    let blogArticles = json.data;
    blogArticles.sort((a, b) => new Date(b.created) - new Date(a.created));
    displayPosts(blogArticles.slice(0, 12));
    loadMoreBtn.addEventListener('click', () => {
      displayPosts(blogArticles);  // DOM-manipulation based on if we click on load more or not (slice method)
      loadMoreBtn.style.display = 'none';
    }) 
    
  } catch (error) {
    console.error('ERROR:', error)
  } finally {
    console.log('test');
  }
}

main();

