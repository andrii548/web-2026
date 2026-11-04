// Товари магазину: сутність «Штучна ялинка» з попередніх робіт
// (виробник, висота в см, ціна, матеріал) + опис і параметри для малюнка.
// Якщо додати поле imageUrl, на картці з'явиться фото замість намальованої ялинки.

export const MATERIALS = [
  'ПВХ',
  'Поліетилен (PE)',
  'Комбінований (ПВХ + PE)',
  'Флокований ПВХ',
  'Лита хвоя (PE)',
];

// Кольори трьох ярусів хвої для кожного матеріалу
const GREEN = ['#1f7a45', '#2a9158', '#36a96a'];
const DEEP = ['#14532d', '#1b6b3a', '#228547'];
const MIXED = ['#1d6b4a', '#27855d', '#32a073'];
const FROSTED = ['#2f7d6d', '#3b9684', '#4aae9b'];

const publicUrl = process.env.PUBLIC_URL || '';

const trees = [
  {
    id: 1,
    manufacturer: 'Triumph Tree',
    height: 180,
    price: 3450,
    material: 'Комбінований (ПВХ + PE)',
    description: "Класична ялинка з об'ємною хвоєю, що поєднує ПВХ та поліетилен.",
    colors: MIXED,
    snow: false,
    tint: '#e9f1ec',
    imageUrl: `${publicUrl}/images/trees/tree-1.jpg`,
  },
  {
    id: 2,
    manufacturer: 'Black Box Trees',
    height: 210,
    price: 8900,
    material: 'Лита хвоя (PE)',
    description: 'Висока ялинка з литої хвої, схожа на живе дерево навіть зблизька.',
    colors: DEEP,
    snow: false,
    tint: '#e8eef5',
    imageUrl: `${publicUrl}/images/trees/tree-2.jpg`,
  },
  {
    id: 3,
    manufacturer: 'Royal Christmas',
    height: 150,
    price: 5200,
    material: 'Поліетилен (PE)',
    description: 'Щільна хвоя з поліетилену та міцна металева підставка.',
    colors: GREEN,
    snow: false,
    tint: '#f3ece4',
    imageUrl: `${publicUrl}/images/trees/tree-3.jpg`,
  },
  {
    id: 4,
    manufacturer: 'Kaemingk',
    height: 120,
    price: 1890,
    material: 'ПВХ',
    description: 'Компактна ялинка для кімнати чи офісу, яка швидко збирається.',
    colors: GREEN,
    snow: false,
    tint: '#eeeaf4',
    imageUrl: `${publicUrl}/images/trees/tree-4.jpg`,
  },
  {
    id: 5,
    manufacturer: 'Edelman',
    height: 240,
    price: 12750,
    material: 'Лита хвоя (PE)',
    description: 'Преміальна ялинка для просторих залів, холів і вітрин.',
    colors: DEEP,
    snow: false,
    tint: '#e6f0ef',
    imageUrl: `${publicUrl}/images/trees/tree-5.jpg`,
  },
  {
    id: 6,
    manufacturer: "Santa's Forest",
    height: 90,
    price: 950,
    material: 'ПВХ',
    description: 'Невелика настільна ялинка, яка стане гарним подарунком.',
    colors: GREEN,
    snow: false,
    tint: '#f4efe3',
    imageUrl: `${publicUrl}/images/trees/tree-6.jpg`,
  },
  {
    id: 7,
    manufacturer: 'Crystal Pine',
    height: 165,
    price: 4100,
    material: 'Флокований ПВХ',
    description: 'Хвоя з ефектом снігу створює справжню зимову атмосферу.',
    colors: FROSTED,
    snow: true,
    tint: '#e9f0f3',
    imageUrl: `${publicUrl}/images/trees/tree-7.jpg`,
  },
  {
    id: 8,
    manufacturer: 'National Tree',
    height: 195,
    price: 6780,
    material: 'Комбінований (ПВХ + PE)',
    description: 'Пишна ялинка з рівномірною хвоєю та стійкою підставкою.',
    colors: MIXED,
    snow: false,
    tint: '#f1e9ec',
    imageUrl: `${publicUrl}/images/trees/tree-8.jpg`,
  },
  {
    id: 9,
    manufacturer: 'Winter Frost',
    height: 150,
    price: 5600,
    material: 'Флокований ПВХ',
    description: "Світла засніжена ялинка, що пасує до сучасних інтер'єрів.",
    colors: FROSTED,
    snow: true,
    tint: '#edf0f2',
    imageUrl: `${publicUrl}/images/trees/tree-9.jpg`,
  },
];

export default trees;
