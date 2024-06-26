import { loadingScreen, hideLoadingScreen } from "./loader.mjs";

const params = new URLSearchParams(window.location.search);
const articleId = params.get('id');
const accessToken = JSON.parse(localStorage.getItem("session")); 

async function fetchEditBlogArticle(articleId) {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/leomrgreen/${articleId}`);
    const json = await response.json();
    const data = json.data;
    loadingScreen();
    getDataToForm(data)
    displayArticleBgImage(data)
  } catch (error) {
    console.error('error')
  } finally {
    hideLoadingScreen();
  }
}

function getDataToForm(data) {
  document.getElementById('title').value = data.title;
  document.getElementById('body').value = data.body;
  document.getElementById('mediaUrl').value = data.media.url;
  document.getElementById('mediaAlt').value = data.media.alt;
} 


fetchEditBlogArticle(articleId);

document.getElementById('editForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const updatedData = {
      title: document.getElementById('title').value,
      body: document.getElementById('body').value,
      media: {
          url: document.getElementById('mediaUrl').value,
          alt: document.getElementById('mediaAlt').value
      }
  };

  fetch(`https://v2.api.noroff.dev/blog/posts/leomrgreen/${articleId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken 
      },
      body: JSON.stringify(updatedData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to update blog post');
      }
      return response.json();
  })
  .then(() => {
      alert('Post updated successfully!');
      window.location.href = '../'; 
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Failed to edit post: ' + error)
  });
});


document.getElementById('deleteBtn').addEventListener('click', async (event) => {
  event.preventDefault();  
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (confirmDelete) {
    try {
      const response = await fetch(`https://v2.api.noroff.dev/blog/posts/leomrgreen/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken 
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting the post:');
      alert('Failed to edit post')
    }
    finally {
      window.location.href = '../';  
    }
  }
});


const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
if (!isUserLoggedIn) {
  window.location.href = '../'
}

function displayArticleBgImage(blogPost) {
  const formSections = document.querySelectorAll('.imagePreview');
  formSections.forEach(formSection => {
    formSection.style.backgroundImage = `url('${blogPost.media.url}')`;
  });
}