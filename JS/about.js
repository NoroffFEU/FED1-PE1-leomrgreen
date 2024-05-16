

function updateCardStyles() {
  const aboutCards = document.querySelectorAll('.about-card');
  const isLightMode = localStorage.getItem('lightMode') === 'true';
  aboutCards.forEach(card => {
    if (isLightMode) {
      card.style.cssText = 'background: var(--card-gradient-light);';
      console.log(aboutCards + card);
    } else {
      card.style.cssText = 'background: var(--card-gradient-alt)';
    }
  });
}

const drkModeBtn = document.getElementById('drkModeIcon');

drkModeBtn.addEventListener('click', () => {
  updateCardStyles(); 
});

updateCardStyles();