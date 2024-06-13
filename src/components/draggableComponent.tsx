import React, { useRef, useState, useEffect, ReactElement } from "react";

type Position = {
  x: number;
  y: number;
};

type DraggableComponentProps = {
  isVisiable: boolean;
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
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [lastPosition, setLastPosition] = useState<Position>({
    x: 300,
    y: 100,
  });

  const toggleMinimize = () => {
    if (isMinimized) {
      setPosition(lastPosition);
      setIsMinimized(false);
      return;
    }
    setIsMinimized(true);
    setLastPosition(position);

    const y = window.innerHeight - 25;
    setPosition({ x: 0, y });
  };

  useEffect(() => {
    setPosition({ x: 300, y: 100 });
  }, [isVisiable]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isMinimized) return toggleMinimize();
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
          minHeight: isMinimized ? "0 " : "200px",
          position: isMinimized ? "fixed" : "absolute",
          transition: !dragging ? "top 0.5s" : "none",
        }}
        className="cursor-move flex flex-col align-center bg-white select-none border-2"
      >
        <div className="bg-gray-200 w-full flex flex-row top-0 justify-end">
          <div className="mr-2" onClick={toggleMinimize}>
            _
          </div>
          <div onClick={toggleIsVisiable} className="mr-2 cursor-pointer">
            X
          </div>
        </div>
        <div
          style={{
            maxHeight: isMinimized ? "0px" : "auto",
            overflow: isMinimized ? "hidden" : "visible",
          }}
          className="flex-1 content-center justify-center align-middle"
        >
          {children}
        </div>
      </div>
    )
  );
};

export default DraggableComponent;
