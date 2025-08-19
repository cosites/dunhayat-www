export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  image: string;
  category: 'coffee' | 'beverage' | 'instant';
  inStock: boolean;
  weight?: string;
  origin?: string;
}

export const products: Product[] = [
  {
    id: 'arabika-100',
    name: 'قهوه میکس (۱۰۰ عربیکا)',
    nameEn: 'Mixed Coffee (100% Arabica)',
    description: 'قهوه میکس با ۱۰۰٪ دانه‌های عربیکا، طعم ملایم و عطر دلپذیر',
    price: 85000,
    image: '/src/assets/images/100 arabika.jpeg',
    category: 'coffee',
    inStock: true,
    weight: '250g',
    origin: 'Brazil'
  },
  {
    id: 'robusta-100',
    name: 'قهوه میکس (۱۰۰ روبوستا)',
    nameEn: 'Mixed Coffee (100% Robusta)',
    description: 'قهوه میکس با ۱۰۰٪ دانه‌های روبوستا، طعم قوی و کافئین بالا',
    price: 75000,
    image: '/src/assets/images/100 robosta.jpeg',
    category: 'coffee',
    inStock: true,
    weight: '250g',
    origin: 'Vietnam'
  },
  {
    id: 'arabika-brazil',
    name: 'قهوه عربیکا (برزیل)',
    nameEn: 'Arabica Coffee (Brazil)',
    description: 'قهوه عربیکا از برزیل، طعم شیرین و ملایم',
    price: 95000,
    image: '/src/assets/images/arabika brazil.jpeg',
    category: 'coffee',
    inStock: true,
    weight: '250g',
    origin: 'Brazil'
  },
  {
    id: 'arabika-colombia',
    name: 'قهوه عربیکا (کلومبیا)',
    nameEn: 'Arabica Coffee (Colombia)',
    description: 'قهوه عربیکا از کلومبیا، طعم متعادل و عطر قوی',
    price: 98000,
    image: '/src/assets/images/arabika colombia.jpeg',
    category: 'coffee',
    inStock: true,
    weight: '250g',
    origin: 'Colombia'
  },
  {
    id: 'coffee-meet',
    name: 'کافی میت',
    nameEn: 'Coffee Meet',
    description: 'محصول ویژه کافی میت، ترکیبی منحصر به فرد',
    price: 65000,
    image: '/src/assets/images/coffee meet.jpeg',
    category: 'beverage',
    inStock: true,
    weight: '200g'
  },
  {
    id: 'hot-chocolate',
    name: 'هات چاکلت',
    nameEn: 'Hot Chocolate',
    description: 'هات چاکلت گرم و دلپذیر، مناسب برای روزهای سرد',
    price: 45000,
    image: '/src/assets/images/hot chocolate.jpeg',
    category: 'beverage',
    inStock: true,
    weight: '150g'
  },
  {
    id: 'instant-coffee',
    name: 'قهوه فوری',
    nameEn: 'Instant Coffee',
    description: 'قهوه فوری با کیفیت بالا، آماده در کمترین زمان',
    price: 35000,
    image: '/src/assets/images/instant coffee.jpeg',
    category: 'instant',
    inStock: true,
    weight: '100g'
  },
  {
    id: 'mix-coffee',
    name: 'قهوه میکس',
    nameEn: 'Mixed Coffee',
    description: 'ترکیب متعادل از انواع قهوه، طعمی بی‌نظیر',
    price: 70000,
    image: '/src/assets/images/mix coffee.jpeg',
    category: 'coffee',
    inStock: true,
    weight: '250g'
  },
  {
    id: 'turkish-coffee',
    name: 'قهوه ترک',
    nameEn: 'Turkish Coffee',
    description: 'قهوه ترک سنتی، طعم اصیل و روش دم آوری خاص',
    price: 55000,
    image: '/src/assets/images/turkish coffee.jpeg',
    category: 'coffee',
    inStock: true,
    weight: '200g'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(product => product.category === category);
};
