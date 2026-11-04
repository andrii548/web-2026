const form = document.querySelector('#tree-form');
const isEdit = form.dataset.mode === 'edit';
const editId = Number(new URLSearchParams(location.search).get('id'));

form.elements.material.insertAdjacentHTML(
  'beforeend',
  MATERIALS.map((material) => `<option>${material}</option>`).join('')
);

if (isEdit) {
  const tree = getTrees().find((item) => item.id === editId);

  if (tree) {
    ['manufacturer', 'height', 'price', 'material', 'image'].forEach((name) => {
      form.elements[name].value = tree[name];
    });
  }
}

form.addEventListener('submit', (event) => {
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

  const id = isEdit ? editId : Date.now();
  const tree = new ArtificialTree(id, manufacturer.value, height.value, price.value, material.value, image.value);

  const trees = getTrees();
  saveTrees(isEdit ? trees.map((item) => (item.id === id ? tree : item)) : [...trees, tree]);

  showModal({
    type: 'success',
    title: isEdit ? 'Зміни збережено' : 'Ялинку додано',
    message: `«${tree.manufacturer}» ${isEdit ? 'оновлено.' : 'додано до списку.'}`,
    buttonText: 'До списку',
    onClose: () => (location.href = 'index.html'),
  });
});
