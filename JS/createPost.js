document.addEventListener('DOMContentLoaded', function () {
  const createForm = document.getElementById('blogPostForm');

  createForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const mediaUrl = document.getElementById('mediaUrl').value;
    const mediaAlt = document.getElementById('mediaAlt').value;

    createBlogPost(title, body, mediaUrl, mediaAlt);
  });
});

function createBlogPost(title, body, mediaUrl, mediaAlt) {
  const url = 'https://v2.api.noroff.dev/blog/posts/leomrgreen';
  const accessToken = JSON.parse(sessionStorage.getItem("session")); 


  const postData = {
    title: title,
    body: body,
    media: {
      url: mediaUrl,
      alt: mediaAlt
    }
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken 
    },
    body: JSON.stringify(postData)
  })
  .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    alert('Blog post created successfully!');
    document.getElementById('blogPostForm').reset(); 
  })
  .catch(error => {
    alert('Error creating blog post: ' + error.message);
  });
}


document.getElementById('deleteButton').addEventListener('click', function() {
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (confirmDelete) {
      deleteBlogArticle(articleId);
  }
});
