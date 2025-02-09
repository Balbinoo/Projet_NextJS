"use client";

interface CategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[] | ((prev: string[]) => string[])) => void;
}

const categories = [
  "MMORPG", "Shooter", "Action RPG", "Battle Royale", "ARPG", "MMOARPG",
  "MOBA", "Strategy", "Card Game", "Sports", "Fighting", "MMO", "Fantasy", "Social"
];

export default function CategoryFilter({ selectedCategories, setSelectedCategories }: CategoryFilterProps) {
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 my-6">
      {/* Clear Selection Button */}
      <button
        onClick={() => setSelectedCategories([])}
        className={`px-5 py-2 text-sm font-medium rounded-full transition-all shadow-md 
          ${selectedCategories.length === 0 ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => toggleCategory(category)}
          className={`px-5 py-2 text-sm font-medium rounded-full transition-all shadow-md 
            ${selectedCategories.includes(category) ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}