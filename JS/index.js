const API_URL = 'https://v2.api.noroff.dev/blog/posts/leomrgreen';
let blogArticles = [];

function displayPosts(blogArticles) {
  const blogContainer = document.getElementById('articleGrid');
  blogContainer.innerHTML = '';
  blogArticles.forEach((article) => {
    const blogHtml = generateBlogHtml(article);
    blogContainer.appendChild(blogHtml);
  });
}

function generateBlogHtml(article) {
  const gridCard = document.createElement('div');
  gridCard.className = 'gridCard';
  
  const articleImage = document.createElement('img');
  articleImage.src = article.media.url;

  const articleHeading = document.createElement('h3');
  articleHeading.textContent = article.title;

  gridCard.append(articleImage, articleHeading);

  return gridCard;
}

async function main() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    blogArticles = json.data;
    console.log(blogArticles);
    displayPosts(blogArticles);
  } catch (error) {
    console.error('ERROR:', error)
  } finally {
    console.log('test');
  }
}

main();

