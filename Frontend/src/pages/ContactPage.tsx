
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <p className="text-gray-600">Coming soon - contact form and information.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
