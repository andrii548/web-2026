const form = document.querySelector('#tree-form');
const isEdit = form.dataset.mode === 'edit';
const editId = Number(new URLSearchParams(location.search).get('id'));

async function init() {
  try {
    const materials = await api('/materials');
    form.elements.material.insertAdjacentHTML(
      'beforeend',
      materials.map((material) => `<option>${material}</option>`).join('')
    );

    if (isEdit) {
      const tree = await api('/trees/' + editId);
      ['manufacturer', 'height', 'price', 'material', 'image'].forEach((name) => {
        form.elements[name].value = tree[name];
      });
    }
  } catch (error) {
    showApiError(error);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { manufacturer, height, price, material, image } = form.elements;
  manufacturer.value = manufacturer.value.trim();

  const errors = [...form.elements]
    .filter((field) => !field.checkValidity())
    .map((field) => `«${field.dataset.label}»: ${field.validationMessage}`);

  if (errors.length > 0) {
    showModal({
      type: 'error',
      title: 'Перевірте введені дані',
      message: 'Виправте такі помилки:',
      items: errors,
      buttonText: 'Виправити',
    });
    return;
  }

  const data = {
    manufacturer: manufacturer.value,
    height: height.value,
    price: price.value,
    material: material.value,
    image: image.value,
  };

  try {
    const tree = isEdit
      ? await api('/trees/' + editId, 'PUT', data)
      : await api('/trees', 'POST', data);

    showModal({
      type: 'success',
      title: isEdit ? 'Зміни збережено' : 'Ялинку додано',
      message: `«${tree.manufacturer}» ${isEdit ? 'оновлено.' : 'додано до списку.'}`,
      buttonText: 'До списку',
      onClose: () => (location.href = 'index.html'),
    });
  } catch (error) {
    showApiError(error);
  }
});

init();
