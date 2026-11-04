let trees = [];
let query = '';
let sortByPrice = false;

const list = document.querySelector('#tree-list');
const totalEl = document.querySelector('#total');

function createCard(tree) {
  const imageClass = tree.image ? '' : 'card-image--default';
  return `
    <article class="card">
      <div class="card-image ${imageClass}">
        <img src="${escapeHtml(tree.image || DEFAULT_TREE_IMAGE)}" alt="Ялинка ${escapeHtml(tree.manufacturer)}">
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(tree.manufacturer)}</h3>
        <ul class="card-specs">
          <li><span>Висота:</span> ${tree.height} см</li>
          <li><span>Матеріал:</span> ${escapeHtml(tree.material)}</li>
        </ul>
        <p class="card-price">${formatPrice(tree.price)}</p>
        <div class="card-actions">
          <a class="btn btn-info" href="edit.html?id=${tree.id}">Редагувати</a>
          <button type="button" class="btn btn-danger" data-delete-id="${tree.id}">Видалити</button>
        </div>
      </div>
    </article>`;
}

async function loadTrees() {
  try {
    const params = new URLSearchParams({ search: query, sort: sortByPrice ? 'price_desc' : '' });
    trees = await api('/trees?' + params);

    const html = trees.map(createCard).join('');
    list.innerHTML = '';
    list.insertAdjacentHTML('beforeend', html || '<p class="empty">Нічого не знайдено.</p>');
    totalEl.textContent = '—';
  } catch (error) {
    showApiError(error);
  }
}

document.querySelector('#count-btn').addEventListener('click', async () => {
  try {
    const { total } = await api('/trees/total?' + new URLSearchParams({ search: query }));
    totalEl.textContent = formatPrice(total);
  } catch (error) {
    showApiError(error);
  }
});

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  query = document.querySelector('#search-input').value.trim();
  loadTrees();
});

document.querySelector('#clear-btn').addEventListener('click', () => {
  document.querySelector('#search-input').value = '';
  query = '';
  loadTrees();
});

document.querySelector('#sort-toggle').addEventListener('change', (event) => {
  sortByPrice = event.target.checked;
  loadTrees();
});

list.addEventListener('click', (event) => {
  const button = event.target.closest('[data-delete-id]');
  if (!button) return;

  const id = Number(button.dataset.deleteId);
  const tree = trees.find((item) => item.id === id);

  showModal({
    type: 'error',
    title: 'Видалити ялинку?',
    message: `Ялинку «${tree.manufacturer}» буде видалено.`,
    buttonText: 'Видалити',
    cancelText: 'Скасувати',
    onClose: async (confirmed) => {
      if (!confirmed) return;
      try {
        await api('/trees/' + id, 'DELETE');
        loadTrees();
      } catch (error) {
        showApiError(error);
      }
    },
  });
});

loadTrees();
