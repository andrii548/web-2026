export function formatPrice(price) {
  return price.toLocaleString('uk-UA') + ' грн';
}

export function treeImageSize(height) {
  return 60 + ((height - 80) / 170) * 40;
}
