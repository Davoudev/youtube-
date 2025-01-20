import { useState } from "react";
import { PageHeader } from "./Layout/PageHeader";
import { CategoryPills } from "./components/CategoryPills";
import { categories } from "./data/home";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <div className="flex flex-col max-h-screen">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
        sidebar
        <div className="overflow-x-hidden">
          <div className="sticky top-0 z-10 ">
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onselect={setSelectedCategory}
            />
          </div>
          <div>videos </div>
        </div>
      </div>
    </div>
  );
};

export default App;
