export default function Hero() {
  return (
    <section className="hero min-h-[60vh] bg-amin">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Welcome to Product Hub</h1>
          <p className="py-6">Browse amazing products or add your own after login!</p>
          <a href="/products" className="btn btn-primary">Explore Products</a>
        </div>
      </div>
    </section>
  );
}