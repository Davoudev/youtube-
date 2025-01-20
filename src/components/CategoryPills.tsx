import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onselect: (category: string) => void;
};
const TRANSLATE_AMOUNT = 200;
export const CategoryPills = ({
  categories,
  selectedCategory,
  onselect,
}: CategoryPillProps) => {
  const [translate, setTranslate] = useState(0);
  const [leftIsVisible, setLeftIsVisible] = useState(false);
  const [rightIsVisible, setRightIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  //   all of this useEfect for enabing right and left buttons

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setLeftIsVisible(translate > 0);
      setRightIsVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [translate, categories]);

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 my-5 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onselect(category)}
            variant={selectedCategory === category ? "dark" : "lightDark"}
            className="px-4 py-1 whitespace-nowrap rounded-lg"
          >
            {category}
          </Button>
        ))}
      </div>
      {leftIsVisible && (
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-24 h-full bg-gradient-to-r from-transparent from-50% to-[#1a1a1a]  py-2 px-4 rounded">
          <Button
            variant={"dark"}
            size={"icon"}
            className="aspect-square w-auto h-full py-1 px-3"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) {
                  return 0;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {rightIsVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-full bg-gradient-to-r from-transparent from-50% to-[#1a1a1a]  py-2 px-4 rounded">
          <Button
            variant={"dark"}
            size={"icon"}
            className="aspect-square w-auto h-full py-1 px-3"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) {
                  return translate;
                }
                const newTranslate = TRANSLATE_AMOUNT + translate;

                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;

                console.log(translate);
                if (newTranslate + width >= edge) {
                  return edge - width;
                }

                console.log(translate);
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};
