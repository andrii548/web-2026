const MATERIALS = [
  'ПВХ',
  'Поліетилен (PE)',
  'Комбінований (ПВХ + PE)',
  'Флокований ПВХ',
  'Лита хвоя (PE)',
];

class ArtificialTree {
  constructor({ id, manufacturer, height, price, material, image = '' }) {
    this.id = id;
    this.manufacturer = String(manufacturer).trim(); 
    this.height = Number(height);                    
    this.price = Number(price);                      
    this.material = material;                        
    this.image = String(image || '').trim();         
  }


  static validate({ manufacturer, height, price, material, image }) {
    const errors = [];
    const name = String(manufacturer ?? '').trim();

    if (name.length < 2 || name.length > 50) {
      errors.push('«Назва виробника»: від 2 до 50 символів.');
    } else if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґ0-9 .,'&-]+$/.test(name)) {
      errors.push("«Назва виробника»: дозволені літери, цифри, пробіл та символи . , ' & -");
    }

    if (!Number.isInteger(Number(height)) || height === '' || height < 20 || height > 500) {
      errors.push('«Висота»: ціле число від 20 до 500 см.');
    }

    if (price === '' || !(Number(price) >= 1 && Number(price) <= 1000000)) {
      errors.push('«Ціна»: число від 1 до 1 000 000 грн.');
    }

    if (!MATERIALS.includes(material)) {
      errors.push('«Матеріал виробництва»: оберіть матеріал зі списку.');
    }

    if (image && !/^https?:\/\/\S+$/i.test(String(image).trim())) {
      errors.push('«Зображення»: посилання має починатися з http:// або https://');
    }

    return errors;
  }
}

module.exports = { ArtificialTree, MATERIALS };
