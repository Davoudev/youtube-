import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import { Button } from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../context/sidebarContext";

export const PageHeader = () => {
  const [fullwidthSearch, setFullwidthSearch] = useState(false);
  return (
    <div className="flex justify-between w-full pt-2.5 gap-10 px-4">
      {/* reuseabe component */}
      <FirstHeaderPageSection hidden={fullwidthSearch} />
      <form
        className={`flex-grow  ${
          fullwidthSearch ? "flex" : "hidden md:flex"
        }    justify-center`}
      >
        {fullwidthSearch && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => setFullwidthSearch(false)}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            placeholder="search"
            className="rounded-l-full w-full text-lg px-4 outline-none focus:border-blue-500 py-1 shadow-inner  shadow-dark-300"
          />
          <Button
            variant={"lightDark"}
            size={"default"}
            className="rounded-r-full px-4 py-2"
          >
            <Search />
          </Button>
          <Button
            variant={"lightDark"}
            size={"icon"}
            className="flex-shrink-0 ml-6"
          >
            <Mic />
          </Button>
        </div>
      </form>
      {/* check for showing additinal icons */}
      <div className={`${fullwidthSearch ? "hidden" : "flex"} flex-shrink-0`}>
        <Button
          className="md:hidden"
          variant={"dark"}
          size={"icon"}
          onClick={() => setFullwidthSearch(true)}
        >
          <Search />
        </Button>
        <Button className="md:hidden" variant={"dark"} size={"icon"}>
          <Mic />
        </Button>

        <Button size="icon" variant="dark">
          <Upload />
        </Button>
        <Button size="icon" variant="dark">
          <Bell />
        </Button>
        <Button size="icon" variant="dark">
          <User />
        </Button>
      </div>
    </div>
  );
};

type firstHeaderPageSectionProps = {
  hidden?: boolean;
};
export const FirstHeaderPageSection = ({
  hidden = false,
}: firstHeaderPageSectionProps) => {
  const { toggle } = useSidebarContext();

  return (
    <div className={`${hidden ? "hidden" : "flex"}`}>
      <Button variant={"dark"} size={"icon"} onClick={toggle}>
        <Menu />
      </Button>
      <a href="/">
        <img src="/images/logo.png" className="h-10 w-10" />
      </a>
    </div>
  );
};
