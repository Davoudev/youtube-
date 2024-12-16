import PageHeader from "./Layout/PageHeader";
import CategoryPils from "./components/CategoryPils";

const App = () => {
  return (
    <div className="max-h-screen h-max flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto , 1fr] flex-grow-1 overflow-auto">
        <div className="flex">sidebar</div>
        <div>
          {/* write here */}
          <div>
            <CategoryPils />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
