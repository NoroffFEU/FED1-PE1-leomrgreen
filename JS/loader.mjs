export function loadingScreen() {
  const loadingAnimation = document.getElementById('loaderAnimation');
  loadingAnimation.style.display = 'flex'
  setTimeout(() => {
    loadingAnimation.style.display = 'none';
  }, 3000);
}