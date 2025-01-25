import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type SidebarContexType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

type SidebarProviderProps = {
  children: ReactNode;
};

const SidebarContext = createContext<null | SidebarContexType>(null);

export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value == null) throw Error("Cannot use outside of SidebarProvider");

  return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    function handler() {
      if (!isSmallScreen) return setIsSmallOpen(false);
    }

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  function isSmallScreen() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isSmallScreen()) {
      setIsSmallOpen((s) => !s);
    } else {
      setIsLargeOpen((l) => !l);
    }
  }

  function close() {
    if (isSmallScreen()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <SidebarContext.Provider
      value={{ isLargeOpen, isSmallOpen, toggle, close }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
