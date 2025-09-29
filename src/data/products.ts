// // Import all product images
// import mix100arabica from "../../public/images/mix100arabica.avif";
// import mix70arabica from "../../public/images/mix70arabica.avif";
// import mix60arabica from "../../public/images/mix60arabica.avif";
// import mix100robusta from "../../public/images/mix100robusta.avif";
// import mix80robusta from "../../public/images/mix80robusta.avif";
// import mix70robusta from "../../public/images/mix70robusta.avif";
// import mix60robusta from "../../public/images/mix60robusta.avif";
// import mix50 from "../../public/images/mix50.avif";
// import brazilArabica from "../../public/images/brazilArabica.avif";
// import colombiaArabica from "../../public/images/colombiaArabica.avif";
// import hotChocolate from "../../public/images/hotChocolate.avif";
// import masalaChai from "../../public/images/masalaChai.avif";
// import gold from "../../public/images/gold.avif";
// import turkishCoffee from "../../public/images/turkishCoffee.avif";
// import coffeeMate from "../../public/images/coffeeMate.avif";
// import espressoPowder from "../../public/images/espressoPowder.avif";
//
// export interface Product {
//   id: string;
//   name: string;
//   nameEn: string;
//   description: string;
//   price: number;
//   image: any; // Changed from string to any to accept imported images
//   category: 'coffee' | 'beverage' | 'instant';
//   inStock: boolean;
//   weight?: string;
//   origin?: string;
//   roastLevel?: string;
//   bitterness?: string;
//   body?: string;
//   acidity?: string;
//   sweetness?: string;
// }
//
//
// export const products: Product[] = [
//   {
//     id: 'arabika-100',
//     name: 'قهوه میکس (۱۰۰ عربیکا)',
//     nameEn: 'Mixed Coffee (100% Arabica)',
//     description: 'این نوع قهوه می‌تواند گزینه‌ای مناسب برای کسانی باشد که می‌خواهند از مزه و کیفیت قهوه عربیکا در ترکیب گونه‌های مختلف آمریکای مرکزی و جنوبی با یک دیگر لذت ببرند.',
//     price: 505000,
//     image: mix100arabica,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'آمریکای مرکزی',
//     roastLevel: 'مدیوم',
//     bitterness: 'کم',
//     body: 'کم',
//     acidity: 'متوسط رو به زیاد',
//     sweetness: 'متوسط',
//   },
//   {
//     id: 'arabica-70',
//     name: 'قهوه میکس (۷۰ عربیکا)',
//     nameEn: 'Mixed Coffee (70% Arabica)',
//     description: 'دانه‌های قهوه عربیکا به طور کلی دارای طعم ملایم‌تر، شیرین‌تر و معمولاً با اسیدیته بالاتری هستند. از طرف دیگر، دانه‌های قهوه ربوستا دارای طعم تلخ‌تر و غلظت بیشتری هستند. با ترکیب این دو نوع قهوه در قهوه میکس ۷۰ عربیکا ۳۰ ربوستا، می‌توان به تعادلی بین مزه‌ها و خصوصیات آنها دست یافت.',
//     price: 470000,
//     image: mix70arabica,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'آفریقا، آمریکای مرکزی',
//     roastLevel: 'مدیوم',
//     bitterness: 'کم',
//     body: 'متوسط',
//     acidity: ' متوسط',
//     sweetness: 'متوسط',
//   },
//   {
//     id: 'arabica-60',
//     name: 'قهوه میکس (۶۰ عربیکا)',
//     nameEn: 'Mixed Coffee (60% Arabica)',
//     description: 'قهوه میکس 60 عربیکا و 40 ربوستا یک نوع قهوه است که ترکیبی از 60٪ دانه‌های قهوه عربیکا و 40٪ دانه‌های قهوه ربوستا را در خود دارد. این ترکیب به منظور ایجاد تعادلی بین طعم و خصوصیات قهوه عربیکا و ربوستا استفاده می‌شود.',
//     price: 456000,
//     image: mix60arabica,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'آفریقا، آسیای شرقی و آمریکای مرکزی',
//     roastLevel: 'مدیوم',
//     bitterness: 'متوسط',
//     body: 'متوسط',
//     acidity: ' کم رو به متوسط',
//     sweetness: 'کم',
//   },
//   {
//     id: 'robusta-100',
//     name: 'قهوه میکس (۱۰۰ روبوستا)',
//     nameEn: 'Mixed Coffee (100% Robusta)',
//     description: 'اگر علاقه‌مند به قهوه‌هایی هستید که دارای طعم تلخ و غلظت(بادی) بیشتری هستند از قهوه ربوستا استفاده کنید، قهوه میکس ۱۰۰ ربوستا می‌تواند گزینه‌ی مناسبی برای شما باشد.',
//     price: 385000,
//     image: mix100robusta,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'آفریقا٫آسیای شرقی',
//     roastLevel: 'مدیوم',
//     bitterness: 'زیاد',
//     body: 'زیاد',
//     acidity: 'کم',
//     sweetness: 'کم',
//   },
//   {
//     id: 'robusta-80',
//     name: 'قهوه میکس (۸۰ روبوستا)',
//     nameEn: 'Mixed Coffee (80% Robusta)',
//     description: 'دانه‌های قهوه عربیکا به طور کلی دارای طعم ملایم‌تر، شیرین‌تر و معمولاً با اسیدیته بالاتری هستند. از طرف دیگر، دانه‌های قهوه ربوستا دارای طعم تلخ‌تر و غلظت بیشتری هستند. با ترکیب این دو نوع قهوه در قهوه میکس 20 عربیکا 80 ربوستا، تلاش شده است تا مقدار تلخی کمی کاهش یابد.',
//     price: 395000,
//     image: mix80robusta,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: ' آفریقا٫آسیای شرقی و آمریکای مرکزی',
//     roastLevel: 'مدیوم',
//     bitterness: ' کم رو به زیاد',
//     body: 'زیاد',
//     acidity: ' کم',
//     sweetness: 'کم',
//   },
//   {
//     id: 'robusta-70',
//     name: 'قهوه میکس (۷۰ روبوستا)',
//     nameEn: 'Mixed Coffee (70% Robusta)',
//     description: 'دانه‌های قهوه عربیکا به طور کلی دارای طعم ملایم‌تر، شیرین‌تر و معمولاً با اسیدیته بالاتری هستند. از طرف دیگر، دانه‌های قهوه ربوستا دارای طعم تلخ‌تر و غلظت بیشتری هستند. با ترکیب این دو نوع قهوه در قهوه میکس 30 عربیکا 70 ربوستا، تلاش شده است تا مقدار تلخی کمی کاهش یابد.',
//     price: 390000,
//     image: mix70robusta,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'آفریقا، آسیای شرقی و آمریکای مرکزی',
//     roastLevel: 'مدیوم',
//     bitterness: 'متوسط رو به زیاد',
//     body: 'زیاد',
//     acidity: ' کم',
//     sweetness: 'کم',
//   },
//   {
//     id: 'robusta-60',
//     name: 'قهوه میکس (۶۰ روبوستا)',
//     nameEn: 'Mixed Coffee (60% Robusta)',
//     description: 'دانه‌های قهوه عربیکا به طور کلی دارای طعم ملایم‌تر، شیرین‌تر و معمولاً با اسیدیته بالاتری هستند. از طرف دیگر، دانه‌های قهوه ربوستا دارای طعم تلخ‌تر و غلظت بیشتری هستند. با ترکیب این دو نوع قهوه در قهوه میکس 40 عربیکا 60 ربوستا، تلاش شده است تا مقدار تلخی کمی کاهش یابد.',
//     price: 385000,
//     image: mix60robusta,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'آفریقا، آسیای شرقی و آمریکای مرکزی',
//     roastLevel: 'مدیوم',
//     bitterness: 'متوسط',
//     body: 'متوسط',
//     acidity: ' کم',
//     sweetness: 'کم',
//   },
//   {
//     id: 'mix-50',
//     name: 'قهوه میکس (۵۰ عربیکا)',
//     nameEn: 'Mixed Coffee (50% Arabica)',
//     description: 'قهوه میکس 50 عربیکا و 50 ربوستا یک نوع قهوه است که ترکیبی از 50٪ دانه‌های قهوه عربیکا و 50٪ دانه‌های قهوه ربوستا را در خود دارد. این ترکیب به منظور ایجاد تعادلی بین طعم و خصوصیات قهوه عربیکا و ربوستا استفاده می‌شود.',
//     price: 375000,
//     image: mix50,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'آفریقا، آسیای شرقی و آمریکای مرکزی',
//     roastLevel: 'مدیوم',
//     bitterness: 'متوسط',
//     body: 'متوسط',
//     acidity: ' کم',
//     sweetness: 'کم',
//   },
//   {
//     id: 'brazil-arabica',
//     name: 'قهوه عربیکا برزیل',
//     nameEn: 'Brazil Arabica Coffee',
//     description: 'قهوه عربیکا برزیل یکی از بهترین قهوه‌های جهان است که در ارتفاعات برزیل کشت می‌شود. این قهوه دارای طعم ملایم، شیرین و با اسیدیته متعادل است.',
//     price: 520000,
//     image: brazilArabica,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'برزیل',
//     roastLevel: 'مدیوم',
//     bitterness: 'کم',
//     body: 'کم',
//     acidity: 'متوسط',
//     sweetness: 'زیاد',
//   },
//   {
//     id: 'colombia-arabica',
//     name: 'قهوه عربیکا کلمبیا',
//     nameEn: 'Colombia Arabica Coffee',
//     description: 'قهوه عربیکا کلمبیا یکی از معروف‌ترین قهوه‌های جهان است که در ارتفاعات کلمبیا کشت می‌شود. این قهوه دارای طعم متعادل، با اسیدیته متوسط و شیرینی ملایم است.',
//     price: 510000,
//     image: colombiaArabica,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'کلمبیا',
//     roastLevel: 'مدیوم',
//     bitterness: 'کم',
//     body: 'متوسط',
//     acidity: 'متوسط',
//     sweetness: 'متوسط',
//   },
//   {
//     id: 'hot-chocolate',
//     name: 'هات چاکلت',
//     nameEn: 'Hot Chocolate',
//     description: 'هات چاکلت گرم و خوشمزه که با بهترین کاکائو تهیه شده است. این نوشیدنی برای روزهای سرد و اوقات استراحت عالی است.',
//     price: 85000,
//     image: hotChocolate,
//     category: 'beverage',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'ایران',
//     roastLevel: 'بدون رست',
//     bitterness: 'کم',
//     body: 'متوسط',
//     acidity: 'کم',
//     sweetness: 'زیاد',
//   },
//   {
//     id: 'masala-chai',
//     name: 'ماسالا چای',
//     nameEn: 'Masala Chai',
//     description: 'ماسالا چای یک نوع چای هندی است که با ادویه‌های مختلف مانند دارچین، هل، زنجبیل و فلفل سیاه تهیه می‌شود.',
//     price: 75000,
//     image: masalaChai,
//     category: 'beverage',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'هند',
//     roastLevel: 'بدون رست',
//     bitterness: 'کم',
//     body: 'کم',
//     acidity: 'کم',
//     sweetness: 'متوسط',
//   },
//   {
//     id: 'gold',
//     name: 'قهوه طلا',
//     nameEn: 'Gold Coffee',
//     description: 'قهوه طلا یک نوع قهوه خاص است که با ترکیب بهترین دانه‌های قهوه و طعم‌های منحصر به فرد تهیه شده است.',
//     price: 650000,
//     image: gold,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'ترکیب',
//     roastLevel: 'مدیوم',
//     bitterness: 'متوسط',
//     body: 'متوسط',
//     acidity: 'متوسط',
//     sweetness: 'متوسط',
//   },
//   {
//     id: 'turkish-coffee',
//     name: 'قهوه ترک',
//     nameEn: 'Turkish Coffee',
//     description: 'قهوه ترک یک نوع قهوه سنتی است که به روش خاصی تهیه می‌شود. این قهوه دارای طعم قوی و غلیظ است.',
//     price: 450000,
//     image: turkishCoffee,
//     category: 'coffee',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'ترکیه',
//     roastLevel: 'مدیوم',
//     bitterness: 'زیاد',
//     body: 'زیاد',
//     acidity: 'کم',
//     sweetness: 'کم',
//   },
//   {
//     id: 'coffee-mate',
//     name: 'کافی میت',
//     nameEn: 'Coffee Mate',
//     description: 'کافی میت یک نوع قهوه فوری است که برای تهیه سریع قهوه استفاده می‌شود.',
//     price: 120000,
//     image: coffeeMate,
//     category: 'instant',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'ایران',
//     roastLevel: 'بدون رست',
//     bitterness: 'متوسط',
//     body: 'کم',
//     acidity: 'کم',
//     sweetness: 'متوسط',
//   },
//   {
//     id: 'espresso-powder',
//     name: 'پودر اسپرسو',
//     nameEn: 'Espresso Powder',
//     description: 'پودر اسپرسو یک نوع قهوه فوری است که برای تهیه اسپرسو استفاده می‌شود.',
//     price: 150000,
//     image: espressoPowder,
//     category: 'instant',
//     inStock: true,
//     weight: '۲۵۰ گرم',
//     origin: 'ایران',
//     roastLevel: 'بدون رست',
//     bitterness: 'زیاد',
//     body: 'متوسط',
//     acidity: 'متوسط',
//     sweetness: 'کم',
//   },
// ];
//
//
// export const getProductById = (id: string): Product | undefined => {
//   return products.find(product => product.id === id);
// };
//
// export const getProductsByCategory = (category: Product['category']): Product[] => {
//   return products.filter(product => product.category === category);
// };
