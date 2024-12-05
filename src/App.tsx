import React from "react";
import PageHeader from "./Layout/PageHeader";

const App = () => {
  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto , 1fr] flex-grow-1 overflow-auto">
        <div className="flex">sidebar</div>
        <div></div>
      </div>
    </div>
  );
};

export default App;
