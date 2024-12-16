import React, { useState } from "react";
import Button from "../components/Button";
import { Bell, Menu, Mic, Search, Upload, User } from "lucide-react";

const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  return (
    <div className="flex justify-between mb-6 pt-2 mx-4 gap-10 lg:gap-20">
      <div className={`${showFullWidthSearch ? "hidden" : "flex"} `}>
        <Button variant={"dark"} size={"icon"}>
          <Menu />
        </Button>
        <a href="/">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhWAprrVuzmsF3RQvVjoldrEKjOdYqVcdSiA&s"
            }
            className="h-6"
            alt=""
          />
        </a>
      </div>
      <form
        className={`${
          showFullWidthSearch ? "flex" : "md:flex hidden"
        } justify-center flex-grow`}
      >
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none "
          />
          <Button className="py-2 px-4 rounded-l-none rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>

        <Button size={"icon"} className="flex-shrink-0 ml-3" type="button">
          <Mic />
        </Button>
      </form>
      <div className={`${showFullWidthSearch ? "hidden" : "flex"} md: gap-2`}>
        <Button
          className="md:hidden"
          size={"icon"}
          variant={"dark"}
          onClick={() => setShowFullWidthSearch(true)}
        >
          <Search />
        </Button>
        <Button className="md:hidden" size={"icon"} variant={"dark"}>
          <Mic />
        </Button>
        <Button size={"icon"} variant={"dark"}>
          <Upload />
        </Button>
        <Button size={"icon"} variant={"dark"}>
          <Bell />
        </Button>
        <Button size={"icon"} variant={"dark"}>
          <User />
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
