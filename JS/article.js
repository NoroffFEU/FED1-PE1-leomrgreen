const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

async function fetchBlogArticle(blogPost) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/leomrgreen/${blogPost}`
    );
    const json = await response.json();
    const blogArticle = json.data;
    displayArticle(blogArticle);
    initializeSkeletonLoader();
  } catch (error) {
    console.error("Article Not Found");
    document.getElementById("blogTitle").textContent =
      "ARTICLE NO LONGER EXISTS";
  } finally {
    hideSkeletonLoader();
  }
}

function displayArticle(article) {
  const createDate = new Date(article.created).toLocaleDateString();
  const updateDate = new Date(article.updated).toLocaleDateString();

  document.getElementById("blogImage").src = article.media.url;
  document.getElementById("blogImage").alt = article.media.alt;
  document.getElementById("blogTitle").textContent = article.title;
  document.getElementById("blogBody").textContent = article.body;
  document.getElementById("blogCreate").textContent = "Created: " + createDate;
  document.getElementById("blogUpdate").textContent = "Updated: " + updateDate;
  document.getElementById("blogAuthor").textContent =
    "Author: " + article.author.name;
  const pageTitle = document.querySelector("title");
  pageTitle.textContent = `StarLog | ${article.title}`; // this changes the title of the HTML page based on articleId
}

fetchBlogArticle(articleId);

const imageContainer = document.getElementById("imageContainer");

function initializeSkeletonLoader() {
  if (localStorage.getItem("lightMode") === "false") {
    imageContainer.classList.toggle("loadingDark");
  } else {
    imageContainer.classList.toggle("loading");
  }
}

function hideSkeletonLoader() {
  if (localStorage.getItem("lightMode") === "false") {
    imageContainer.classList.remove("loadingDark");
  } else {
    imageContainer.classList.remove("loading");
  }
}
