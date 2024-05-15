export function loadingScreen() {
  const loadingAnimation = document.getElementById('loaderAnimation');
  loadingAnimation.style.display = 'flex'
}

export function hideLoadingScreen() {
  const loadingAnimation = document.getElementById('loaderAnimation');
  loadingAnimation.style.display = 'none'
}