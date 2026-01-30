
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Waste Categories</h1>
          <p className="text-gray-600">Coming soon - detailed information on different types of waste materials.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
