const table = document.querySelector('.table');

function deleteGameFromPage(tr) {
  tr.parentNode.removeChild(tr);
}

async function deleteGameFromDB(id) {
  try {
    const response = await fetch(`/api/games/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    console.log('Game deleted:', JSON.stringify(result));
  } catch (error) {
    console.error('Error:', error);
  }
}

table.addEventListener('click', e => {
  if (e && e.target.classList.contains('del-btn')) {
    e.preventDefault();
    deleteGameFromPage(e.target.parentNode.parentNode);
    deleteGameFromDB(e.target.dataset.id);
  }
});
