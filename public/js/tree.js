const DEFAULT_TREE_IMAGE = 'img/default-tree.svg';

async function api(url, method = 'GET', body) {
  const response = await fetch('/api' + url, {
    method,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: body && JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}


function showApiError(error) {
  showModal({
    type: 'error',
    title: 'Помилка',
    message: 'Не вдалося виконати операцію:',
    items: error.errors || ["Немає зв'язку із сервером. Перевірте, що він запущений."],
  });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(text).replace(/[&<>"']/g, (char) => map[char]);
}

function formatPrice(price) {
  return price.toLocaleString('uk-UA') + ' грн';
}
