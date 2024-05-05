const gridLayout = document.getElementById('articleGrid');
const gridBtn = document.getElementById('gridBtn').addEventListener('click', ()=> {
    gridLayout.classList.toggle('active');
  })
  const columnBtn = document.getElementById('columnBtn').addEventListener('click', ()=> {
    gridLayout.classList.remove('active');
  })



  
