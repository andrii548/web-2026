const MATERIALS = [
  'ПВХ',
  'Поліетилен (PE)',
  'Комбінований (ПВХ + PE)',
  'Флокований ПВХ',
  'Лита хвоя (PE)',
];

class ArtificialTree {
  constructor({
    id,
    manufacturer,
    height,
    price,
    material,
    description = '',
    colors = ['#1f7a45', '#2a9158', '#36a96a'],
    snow = false,
    tint = '#e9f1ec',
    imageUrl = '',
    availableHeights = [],
    stands = [],
    features = [],
    inStock = true,
  }) {
    this.id = Number(id);
    this.manufacturer = String(manufacturer ?? '').trim();
    this.height = Number(height);
    this.price = Number(price);
    this.material = String(material ?? '').trim();
    this.description = String(description ?? '').trim();
    this.colors = Array.isArray(colors) ? colors : ['#1f7a45', '#2a9158', '#36a96a'];
    this.snow = Boolean(snow);
    this.tint = String(tint || '#e9f1ec');
    this.imageUrl = String(imageUrl || '').trim();
    this.availableHeights = Array.isArray(availableHeights) && availableHeights.length > 0
      ? availableHeights
      : [Math.max(60, Number(height) - 30), Number(height), Number(height) + 30];
    this.stands = Array.isArray(stands) && stands.length > 0
      ? stands
      : [
          { id: 'standard', name: 'Металева хрестовина (у комплекті)', price: 0 },
          { id: 'wood', name: "Дерев'яний пеньок-підставка", price: 350 },
          { id: 'rotating', name: 'Обертова електропідставка 360°', price: 750 },
          { id: 'vintage', name: "Кована вінтажна підставка", price: 490 },
        ];
    this.features = Array.isArray(features) && features.length > 0
      ? features
      : ['Безпечний негорючий матеріал', 'Гіпоалергенна хвоя', 'Швидке збирання'];
    this.inStock = inStock !== false;
  }

  static validate({ manufacturer, height, price, material }) {
    const errors = [];
    const name = String(manufacturer ?? '').trim();

    if (name.length < 2 || name.length > 50) {
      errors.push('«Назва виробника»: від 2 до 50 символів.');
    }

    const h = Number(height);
    if (!Number.isInteger(h) || height === '' || h < 20 || h > 500) {
      errors.push('«Висота»: ціле число від 20 до 500 см.');
    }

    const p = Number(price);
    if (price === '' || isNaN(p) || p < 1 || p > 1000000) {
      errors.push('«Ціна»: число від 1 до 1 000 000 грн.');
    }

    if (!MATERIALS.includes(material)) {
      errors.push('«Матеріал виробництва»: оберіть матеріал зі списку.');
    }

    return errors;
  }
}

module.exports = { ArtificialTree, MATERIALS };

