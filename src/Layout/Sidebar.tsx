import {
  Children,
  ElementType,
  ReactNode,
  useState,
  memo,
  useCallback,
} from "react";
import { useSidebarContext } from "../context/sidebarContext";
import { twMerge } from "tailwind-merge";
import { Button, buttonStyles } from "../components/Button";
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { FirstHeaderPageSection } from "./PageHeader";
import { playlists, subscriptions } from "../data/sidebar";
import { motion, AnimatePresence } from "framer-motion";

export const Sidebar = memo(() => {
  const { close, isLargeOpen, isSmallOpen } = useSidebarContext();

  return (
    <>
      {/* Small Sidebar */}
      <aside
        className={`${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        } sticky overflow-y-auto ml-1 pb-4 px-1 flex-col`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>

      {/* Overlay for Small Sidebar */}
      <AnimatePresence>
        {isSmallOpen && (
          <motion.div
            onClick={close}
            className="lg:hidden fixed inset-0 bg-black opacity-50 z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Large Sidebar */}
      <AnimatePresence>
        {(isLargeOpen || isSmallOpen) && (
          <motion.aside
            className={`min-w-56 max-w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
              isLargeOpen ? "lg:flex" : "lg:hidden"
            } ${
              isSmallOpen ? "flex z-[999] bg-dark-300 max-h-screen" : "hidden"
            }`}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ overflow: "hidden" }}
          >
            <div className="lg:hidden sticky top-0 pb-4 pt-2 px-2 bg-dark-300">
              <FirstHeaderPageSection />
            </div>
            <LargeSidebarSection>
              <LargeSidebarItem
                isActive
                IconOrImgUrl={Home}
                title="Home"
                url="/"
              />
              <LargeSidebarItem
                IconOrImgUrl={Clapperboard}
                title="Subscriptions"
                url="/subscriptions"
              />
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection visibleItemCount={5}>
              <LargeSidebarItem
                IconOrImgUrl={Library}
                title="Library"
                url="/library"
              />
              <LargeSidebarItem
                IconOrImgUrl={History}
                title="History"
                url="/history"
              />
              <LargeSidebarItem
                IconOrImgUrl={PlaySquare}
                title="Your Videos"
                url="/your-videos"
              />
              <LargeSidebarItem
                IconOrImgUrl={Clock}
                title="Watch Later"
                url="/playlist?list=WL"
              />
              {playlists.map((playlist) => (
                <LargeSidebarItem
                  key={playlist.id}
                  IconOrImgUrl={ListVideo}
                  title={playlist.name}
                  url={`/playlist?list=${playlist.id}`}
                />
              ))}
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection title="Subscriptions">
              {subscriptions.map((subscription) => (
                <LargeSidebarItem
                  key={subscription.id}
                  IconOrImgUrl={subscription.imgUrl}
                  title={subscription.channelName}
                  url={`/@${subscription.id}`}
                />
              ))}
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection title="Explore">
              <LargeSidebarItem
                IconOrImgUrl={Flame}
                title="Trending"
                url="/trending"
              />
              <LargeSidebarItem
                IconOrImgUrl={ShoppingBag}
                title="Shopping"
                url="/shopping"
              />
              <LargeSidebarItem
                IconOrImgUrl={Music2}
                title="Music"
                url="/music"
              />
              <LargeSidebarItem
                IconOrImgUrl={Film}
                title="Movies & TV"
                url="/movies-tv"
              />
              <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
              <LargeSidebarItem
                IconOrImgUrl={Gamepad2}
                title="Gaming"
                url="/gaming"
              />
              <LargeSidebarItem
                IconOrImgUrl={Newspaper}
                title="News"
                url="/news"
              />
              <LargeSidebarItem
                IconOrImgUrl={Trophy}
                title="Sports"
                url="/sports"
              />
              <LargeSidebarItem
                IconOrImgUrl={Lightbulb}
                title="Learning"
                url="/learning"
              />
              <LargeSidebarItem
                IconOrImgUrl={Shirt}
                title="Fashion & Beauty"
                url="/fashion-beauty"
              />
              <LargeSidebarItem
                IconOrImgUrl={Podcast}
                title="Podcasts"
                url="/podcasts"
              />
            </LargeSidebarSection>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
});

type SmallSidebarItemProp = {
  url: string;
  Icon: ElementType;
  title: string;
};

const SmallSidebarItem = memo(({ url, Icon, title }: SmallSidebarItemProp) => (
  <a
    href={url}
    className={twMerge(
      buttonStyles({ variant: "dark" }),
      "flex flex-col px-1 py-4 items-center w-20 overflow-x-hidden"
    )}
  >
    <Icon />
    <div>{title}</div>
  </a>
));

type LargeSidebarSectionProp = {
  children: ReactNode;
  visibleItemCount?: number;
  title?: string;
};

const LargeSidebarSection = memo(
  ({
    children,
    visibleItemCount = Number.POSITIVE_INFINITY,
    title,
  }: LargeSidebarSectionProp) => {
    const [isExpended, setIsExpended] = useState(false);

    const ChildrenArray = Children.toArray(children).flat();
    const visibleChildren = isExpended
      ? ChildrenArray
      : ChildrenArray.slice(0, visibleItemCount);
    const showExpendButton = ChildrenArray.length > visibleItemCount;
    const ButtonIcon = isExpended ? ChevronUp : ChevronDown;

    const toggleExpend = useCallback(() => setIsExpended((e) => !e), []);

    return (
      <div>
        {title && <div className="ml-4 mt-2 mb-1 text-lg">{title}</div>}
        {visibleChildren}
        {showExpendButton && (
          <Button
            onClick={toggleExpend}
            variant={"dark"}
            className="flex w-full p-3 rounded-lg items-center gap-4"
          >
            <ButtonIcon className="w-6 h-6" />
            <div>{isExpended ? "Show Less" : "Show More"}</div>
          </Button>
        )}
      </div>
    );
  }
);

type LargeSidebarItem = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

const LargeSidebarItem = memo(
  ({ IconOrImgUrl, title, url, isActive }: LargeSidebarItem) => (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "dark" }),
        `flex gap-3 p-3 w-full rounded-lg ${
          isActive ? "font-bold hover:bg-black bg-dark-300" : ""
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6" alt={title} />
      ) : (
        <IconOrImgUrl />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  )
);
