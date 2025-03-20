import { Search, ShoppingCart, User, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold flex items-center space-x-2">
          <span>SP</span>
          <span className="text-gray-700">•</span>
          <span>RE</span>
        </div>
        <ul className="hidden md:flex space-x-6 font-medium">
          <li className="hover:text-gray-500 cursor-pointer">Home</li>
          <li className="hover:text-gray-500 cursor-pointer">Catalog</li>
          <li className="hover:text-gray-500 cursor-pointer">Elements</li>
          <li className="hover:text-gray-500 cursor-pointer">Blog</li>
          <li className="hover:text-gray-500 cursor-pointer">Portfolio</li>
        </ul>
        <div className="flex space-x-4">
          <Search className="w-5 h-5 cursor-pointer" />
          <User className="w-5 h-5 cursor-pointer" />
          <Heart className="w-5 h-5 cursor-pointer" />
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row items-center p-10">
        <div className="text-left space-y-4">
          <h1 className="text-6xl font-bold leading-tight">
            MAKE <br /> SELL <br /> EARN
          </h1>
          <p className="text-gray-500 uppercase tracking-wider">
            STORE PARTS MONEY
          </p>
        </div>
        <img
          src="/car-image.png" // Replace with actual image
          alt="Car"
          className="w-full md:w-2/3"
        />
      </div>

      {/* Category Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6">
        {[
          { name: "Cars", icon: "🚗" },
          { name: "Motorcycles", icon: "🏍" },
          { name: "Snow Mobiles", icon: "❄️" },
          { name: "ATVs", icon: "🚜" },
          { name: "Scooters", icon: "🛵" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-lg transition"
          >
            <span className="text-4xl">{item.icon}</span>
            <p className="mt-2 font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
