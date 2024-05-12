export function toggleGridLayout() {
  const gridLayout = document.getElementById('articleGrid');
  const gridBtn = document.getElementById('gridBtn');
  gridBtn.addEventListener('click', () => {
    gridLayout.classList.toggle('active');
    if (gridLayout.classList.contains("active")) {
      gridBtn.style.cssText = "color: var(--sky-blue-300)";
    } else {
      gridBtn.style.cssText = ""; 
    }
  });
}

export function updateCardStyles() {
  const cards = document.querySelectorAll('.gridCard');
  const isLightMode = localStorage.getItem('lightMode') === 'true';
  cards.forEach(card => {
    if (isLightMode) {
      card.style.cssText = 'background-color: #eee; color; #0f172a; box-shadow: 0px 8px 10px var(--card-shadow);';
    } else {
      card.style.cssText = 'background-color: #1e293b; color: #eee; box-shadow: 0px 8px 10px var(--black);';
    }
  });
}