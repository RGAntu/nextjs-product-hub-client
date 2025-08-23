import Link from "next/link";

const products = [
  { id: 1, name: "Wireless Headphones", description: "High-quality Bluetooth headphones.", price: 399 },
  { id: 2, name: "Smart Watch", description: "Track your health and notifications.", price: 399 },
  { id: 3, name: "Organic Honey", description: "Pure and natural honey.", price: 399 },
  { id: 4, name: "Dark Chocolate", description: "Premium 70% cocoa chocolate.", price: 399 },
];

export default function ProductHighlights() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Product Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-md p-4">
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="font-bold mt-2">${product.price}</p>
            <Link href={`/products/${product.id}`} className="btn btn-sm btn-primary mt-2">
              Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
