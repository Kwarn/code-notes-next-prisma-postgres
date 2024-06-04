import React, { useRef, useState, useEffect, ReactElement } from "react";

type Position = {
  x: number;
  y: number;
};

type DraggableComponentProps = {
  isVisiable: Boolean;
  children: ReactElement;
  toggleIsVisiable: () => void;
};

const DraggableComponent = ({
  isVisiable,
  children,
  toggleIsVisiable,
}: DraggableComponentProps) => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 300, y: 100 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [rel, setRel] = useState<Position>({ x: 0, y: 0 });

  const minimize = () => { setPosition({ x: 300, y: 100 }); }; //TODO: wip


  useEffect(() => {
    setPosition({ x: 300, y: 100 });
  }, [isVisiable]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.button !== 0) return;

    const target = e.target as HTMLElement;
    if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName))
      return;

    const node = draggableRef.current;
    if (node) {
      const offsetX = e.pageX - node.offsetLeft;
      const offsetY = e.pageY - node.offsetTop;
      setRel({ x: offsetX, y: offsetY });
      setDragging(true);
    }

    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent): void => {
    if (!dragging) return;

    setPosition({
      x: e.pageX - rel.x,
      y: e.pageY - rel.y,
    });

    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = (e: MouseEvent): void => {
    setDragging(false);

    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  return (
    isVisiable && (
      <div
        ref={draggableRef}
        onMouseDown={onMouseDown}
        style={{
          left: position.x,
          top: position.y,
          minWidth: "200px",
          minHeight: "200px",
        }}
        className="absolute cursor-move flex flex-col align-center bg-green-100 rounded-md select-none"
      >
        <div className="bg-green-300 w-full flex flex-row top-0 justify-end rounded-md">
          <div className="mr-2">_</div>
          <div onClick={toggleIsVisiable} className="mr-2 cursor-pointer">X</div>
        </div>
        <div className="flex-1 content-center justify-center align-middle">
          {children}
        </div>
      </div>
    )
  );
};

export default DraggableComponent;
