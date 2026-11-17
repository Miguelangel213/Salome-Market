export type Category = 'Todos' | 'Tecnología' | 'Audio' | 'Perfumería' | 'Accesorios';
export interface Product {
  id: string;
  name: string;
  category: Exclude<Category, 'Todos'>;
  price: number;
  image: string;
  detail: string;
  featured?: boolean;
}
export const products: Product[] = [
  { id: 'charger-5a', name: 'Cargador Aibimy 5A AM-322', category: 'Tecnología', price: 18000, image: 'cargador-18k.webp', detail: 'Carga rápida · Incluye cable' },
  { id: 'charger-38w', name: 'Cargador Aibimy 38W AM-328', category: 'Tecnología', price: 28000, image: 'cargador-28k.webp', detail: '38W · Cable USB-A a Tipo C' },
  { id: 'charger-67w', name: 'Cargador Aibimy 67W AM-321', category: 'Tecnología', price: 45000, image: 'cargador-45k.webp', detail: 'Carga rápida · Entrada Tipo C' },
  { id: 'power-bank', name: 'Power bank MagSafe 20.000 mAh', category: 'Accesorios', price: 115000, image: 'powerbank.webp', detail: 'Carga rápida PD · 20.000 mAh' },
  { id: 'speaker-my212', name: 'Parlante Aibimy MY212BTS', category: 'Audio', price: 70000, image: 'parlante-70k.webp', detail: 'Bluetooth · IPX6 · Luces RGB' },
  { id: 'earphones-am104', name: 'Audífonos Bluetooth AM-104', category: 'Audio', price: 85000, image: 'audifonos-am104.webp', detail: 'Audífonos inalámbricos' },
  { id: 'airpods-pro3', name: 'AirPods Pro 3', category: 'Audio', price: 85000, image: 'airpods-pro3.webp', detail: 'Estuche USB-C · Controles táctiles' },
  { id: 'speaker-my264', name: 'Parlante Aibimy MY264BT', category: 'Audio', price: 145000, image: 'parlante-145k.webp', detail: '20W · IPX6 · Hasta 6 horas' },
  { id: 'speaker-my272', name: 'Parlante Aibimy MY272BTS', category: 'Audio', price: 165000, image: 'parlante-165k.webp', detail: '30W · Bluetooth 5.3 · IPX6', featured: true },
  { id: 'speaker-my292', name: 'Parlante Aibimy MY292BTS', category: 'Audio', price: 430000, image: 'parlante-430k.webp', detail: 'Parlante inalámbrico · IPX6' },
  { id: 'curren-8488', name: 'Reloj Curren 8488', category: 'Accesorios', price: 145000, image: 'reloj-curren.webp', detail: 'Cronógrafos · Correa de silicona' },
  { id: 'paris-hilton', name: 'Paris Hilton Fem 100 ml', category: 'Perfumería', price: 80000, image: 'paris-hilton.webp', detail: 'Eau de Parfum' },
  { id: 'valentino', name: 'Valentino Born in Roma Intense 100 ml', category: 'Perfumería', price: 105000, image: 'valentino.webp', detail: 'Eau de Parfum Intense' },
  { id: 'bharara-rose', name: 'Bharara Rose B3 100 ml + travel size', category: 'Perfumería', price: 105000, image: 'bharara-rose.webp', detail: 'Incluye presentación de viaje' },
  { id: 'curren-azul', name: 'Reloj Curren azul con correa café', category: 'Accesorios', price: 120000, image: 'reloj-curren-azul.webp', detail: 'Caja azul · Correa café' },
  { id: 'speaker-my266', name: 'Parlante Aibimy MY266BTS', category: 'Audio', price: 120000, image: 'parlante-my266bts.webp', detail: 'Luces RGB · IPX6 · Conexión TWS' },
  { id: 'aibimy-watch-002', name: 'Smartwatch Aibimy Watch 002', category: 'Tecnología', price: 135000, image: 'aibimy-watch-002.webp', detail: 'Pantalla AMOLED · Notificaciones inteligentes · Modos deportivos' },
];
