export type Product = {
  id: number; name: string; brand: string; cat: number; spec: string;
  price: number; oldPrice: number; rating: number; reviews: number; img: string; hot: boolean;
};

// cat: 1 Hörlurar · 2 Laptops · 3 Mobiler · 4 Kameror · 5 Tillbehör · 6 Gaming
export const products: Product[] = [
  { id: 1, name: "Sony WH-1000XM5", brand: "Sony", cat: 1, spec: "30h batteri · LDAC", price: 4890, oldPrice: 6490, rating: 4.9, reviews: 341, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=640&q=80&fit=crop&crop=center", hot: true },
  { id: 2, name: "MacBook Air M3", brand: "Apple", cat: 2, spec: '13.6" · 16GB · 512GB', price: 14990, oldPrice: 17490, rating: 4.8, reviews: 218, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=640&q=80&fit=crop&crop=center", hot: false },
  { id: 3, name: "Samsung Galaxy S25", brand: "Samsung", cat: 3, spec: "256GB · 12GB RAM · 5G", price: 9490, oldPrice: 11490, rating: 4.7, reviews: 189, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=640&q=80&fit=crop&crop=center", hot: true },
  { id: 4, name: "Sony A7 IV", brand: "Sony", cat: 4, spec: "33MP · 4K60 · IBIS", price: 27490, oldPrice: 31990, rating: 4.9, reviews: 97, img: "https://images.unsplash.com/photo-1606986628248-a8a2bc4a9a43?w=640&q=80&fit=crop&crop=center", hot: false },
  { id: 5, name: 'iPad Pro 13"', brand: "Apple", cat: 5, spec: "M4 · 256GB · WiFi", price: 13490, oldPrice: 15490, rating: 4.8, reviews: 154, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=640&q=80&fit=crop&crop=center", hot: false },
  { id: 6, name: "Anker Soundcore P40i", brand: "Anker", cat: 1, spec: "60h · ANC · IP54", price: 890, oldPrice: 1290, rating: 4.6, reviews: 502, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=640&q=80&fit=crop&crop=center", hot: true },
];

export const FREE_SHIPPING = 599;
export const SHIPPING_FEE = 49;
export const fmt = (n: number) => n.toLocaleString("sv-SE").replace(/ /g, " ") + " kr";
