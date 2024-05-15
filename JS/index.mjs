import { toggleGridLayout, updateCardStyles } from "./gridFilter.mjs";
import { loadingScreen, hideLoadingScreen } from "./loader.mjs";
const API_URL = 'https://v2.api.noroff.dev/blog/posts/leomrgreen';
const loadMoreBtn = document.getElementById('loadMoreBtn');
const drkModeBtn = document.getElementById('drkModeIcon');
const searchBar = document.getElementById('searchBar');
let blogArticles = [];

// search function that is searching for any related characters from the title / body of the objects
// .toLowerCase is ensuring that we should get what we search regardless if it's in capital letters or not
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  if (searchString === "") {
    // If the search bar is empty, reset to the initial state displaying only the first 12 articles
    displayPosts(blogArticles.slice(0, 12));
    loadMoreBtn.style.display = ''; 
  } else {
    const filteredArticles = blogArticles.filter((article) => {
      return (
        article.title.toLowerCase().includes(searchString) ||
        article.body.toLowerCase().includes(searchString) 
      );
    });
    displayPosts(filteredArticles);
    loadMoreBtn.style.display = 'none'; // Hide the Load More button since all results are shown
  }
});


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

drkModeBtn.addEventListener('click', () => {
  updateCardStyles(); 
});


function generateBlogHtml(article) {
  const gridCard = document.createElement('li');
  gridCard.className = 'gridCard drkMode';
  
  const articleImage = document.createElement('img');
  articleImage.src = article.media.url;
  articleImage.alt = article.media.alt;
  articleImage.addEventListener('click', () => {
    window.location.href = `./post/?id=${article.id}`; 
  });
  
  const editBtn = document.createElement('button');
  editBtn.className = 'fa-regular fa-pen-to-square'
  editBtn.addEventListener('click',  () => {
    window.location.href = `./post/edit.html?id=${article.id}`;
  })

  const articleHeading = document.createElement('h3');
  articleHeading.textContent = article.title;

  if (localStorage.getItem('isUserLoggedIn') === 'true') {  
      gridCard.append(articleImage, articleHeading, editBtn); // adds edit-tool icon if user is logged in
      } else {gridCard.append(articleImage, articleHeading)};

  return gridCard;
}


async function main() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    loadingScreen();
    blogArticles = json.data;
    blogArticles.sort((a, b) => new Date(b.created) - new Date(a.created));
    displayPosts(blogArticles.slice(0, 12));
    loadMoreBtn.addEventListener('click', () => {
      displayPosts(blogArticles);  // DOM-manipulation based on if we click on load more or not (slice method)
      loadMoreBtn.style.display = 'none';
    }) 
    toggleGridLayout();
    
  } catch (error) {
    console.error('ERROR:', error)
  } finally {
    hideLoadingScreen();
  }
}

main();

