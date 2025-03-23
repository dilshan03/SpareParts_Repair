import React from "react";

const Categories = () => {
  const categories = ["Cars", "Motorcycles", "Snow Mobiles", "ATVs", "Scooters"];

  return (
    <section className="categories container">
      {categories.map((cat, index) => (
        <div key={index} className="category">
          <p>{cat}</p>
        </div>
      ))}
    </section>
  );
};

export default Categories;
