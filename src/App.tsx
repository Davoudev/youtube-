import { useState } from "react";
import PageHeader from "./Layout/PageHeader";
import CategoryPils from "./components/CategoryPils";
import { categories } from "./data/home";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <div className="max-h-screen h-max flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto , 1fr] flex-grow-1 overflow-auto">
        <div className="flex">sidebar</div>
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0  z-10 pb-4">
            <CategoryPils
              categories={categories}
              selectedCategory={selectedCategory}
              onselect={setSelectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
