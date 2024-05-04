const params = new URLSearchParams(window.location.search);
const articleId = params.get('id');

async function fetchBlogArticle(articleId) {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/leomrgreen/${articleId}`);
    const json = await response.json();
    const blogArticle = json.data;
    displayArticle(blogArticle);
  } catch (error) {
    console.error('nåt gick snett')
  } finally {
    console.log('såja!')
  }
}


function displayArticle(article) {
  document.getElementById('blogImage').src = article.media.url;
  document.getElementById('blogTitle').textContent = article.title;
  document.getElementById('blogBody').textContent = article.body;
  document.getElementById('blogCreate').textContent = 'Created: ' + article.created;
  document.getElementById('blogUpdate').textContent = 'Updated: ' + article.updated;
  document.getElementById('blogAuthor').textContent = 'Published by: ' + article.author.name;
}

fetchBlogArticle(articleId);


const imageContainer = document.getElementById('imageContainer');


function skeletonLoader() {
  if (localStorage.getItem('lightMode') === 'false') {
    imageContainer.classList.toggle('loadingDark')
    setTimeout(() => {
      imageContainer.classList.remove('loadingDark')
    }, 1500);
  } else {
    imageContainer.classList.toggle('loading');
    // Remove the loading class after 3 seconds
    setTimeout(() => {
      imageContainer.classList.remove('loading');
    }, 1500);
  }
}

skeletonLoader();