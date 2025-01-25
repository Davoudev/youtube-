import { useState } from "react";
import { PageHeader } from "./Layout/PageHeader";
import { CategoryPills } from "./components/CategoryPills";
import { categories, videos } from "./data/home";
import { VideoGridItem } from "./components/VideoGridItem";
import { SidebarProvider } from "./context/sidebarContext";
import { Sidebar } from "./Layout/Sidebar";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <SidebarProvider>
      <div className="flex flex-col max-h-screen">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
          <Sidebar />
          <div className="overflow-x-hidden px-8">
            <div className="sticky top-0 z-10">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onselect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;
