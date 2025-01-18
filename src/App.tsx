import React from "react";
import { PageHeader } from "./Layout/PageHeader";

const App = () => {
  return (
    <div className="flex flex-col max-h-screen">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
        sidebar
        <div>
          <div>category</div>
          <div>videos </div>
        </div>
      </div>
    </div>
  );
};

export default App;
