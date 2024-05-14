export function toggleGridLayout() {
  const gridLayout = document.getElementById('articleGrid');
  const gridBtn = document.getElementById('gridBtn');
  const columnBtn = document.getElementById('columnBtn');
  const rowBtn = document.getElementById('rowBtn');
  if (gridLayout.classList.contains("active")) {
   gridBtn.style.cssText = "color: var(--sky-blue-300)"; 
  }
  gridBtn.addEventListener('click', () => {
    gridLayout.className = "";
    gridLayout.classList.toggle('active');
    if (gridLayout.classList.contains("active")) {
      gridBtn.style.cssText = "color: var(--sky-blue-300)";
      columnBtn.style.cssText = "";
      rowBtn.style.cssText = "";
    } else {
      gridBtn.style.cssText = ""; 
    }
  });

  columnBtn.addEventListener('click', () => {
    gridLayout.className = "";
    gridLayout.classList.toggle('column');
    if (gridLayout.classList.contains("column")) {
      columnBtn.style.cssText = "color: var(--sky-blue-300)";
      gridBtn.style.cssText = "";
      rowBtn.style.cssText = "";
    } else {
      columnBtn.style.cssText = "";
    }
  });

  rowBtn.addEventListener('click', () => {
    gridLayout.className = "";
    gridLayout.classList.toggle('row');
    if (gridLayout.classList.contains("row")) {
      rowBtn.style.cssText = "color: var(--sky-blue-300)";
      gridBtn.style.cssText = "";
      columnBtn.style.cssText = "";
    } else {
      rowBtn.style.cssText = "";
    }
  })
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

