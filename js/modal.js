function showModal({ title, message = '', items = [], type = 'info', buttonText = 'Зрозуміло', cancelText = '', onClose }) {
  const list = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  const cancelButton = cancelText
    ? `<button type="button" class="btn btn-secondary" id="modal-cancel">${cancelText}</button>`
    : '';

  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal modal-${type}">
        <div class="modal-header">
          <h2>${escapeHtml(title)}</h2>
          <button type="button" class="modal-close" id="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <p>${escapeHtml(message)}</p>
          <ul class="modal-list">${list}</ul>
        </div>
        <div class="modal-footer">
          ${cancelButton}
          <button type="button" class="btn ${type === 'error' ? 'btn-danger' : 'btn-primary'}" id="modal-ok">${buttonText}</button>
        </div>
      </div>
    </div>`);

  const overlay = document.querySelector('#modal-overlay');

  function close(confirmed) {
    overlay.remove();
    if (onClose) onClose(confirmed);
  }

  document.querySelector('#modal-ok').addEventListener('click', () => close(true));
  document.querySelector('#modal-close').addEventListener('click', () => close(false));
  document.querySelector('#modal-cancel')?.addEventListener('click', () => close(false));
}
