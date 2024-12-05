import React, { useState } from "react";
import Button from "../components/Button";
import { Menu } from "lucide-react";

const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  return (
    <div className="flex justify-between mb-6 mx-4 gap-10 lg:gap-20">
      <div className={`${showFullWidthSearch ? "hidden" : "flex"} `}>
        <Button variant={"ghost"} size={"icon"}>
          <Menu />
        </Button>
        <a href="/">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCnQbLJZ3rJAv_wLXuHFJKxTO1GKMS0zhf8Q&s "
            }
            className="h-6"
            alt=""
          />
        </a>
      </div>
      <form></form>
      <div></div>
    </div>
  );
};

export default PageHeader;
