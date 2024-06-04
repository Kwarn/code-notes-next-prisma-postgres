import React, { useRef, useState, useEffect, ReactElement } from "react";

type Position = {
  x: number;
  y: number;
};

type DraggableComponentProps = {
  isVisiable: Boolean;
  children: ReactElement;
};

const DraggableComponent = ({
  isVisiable,
  children,
}: DraggableComponentProps) => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [rel, setRel] = useState<Position>({ x: 0, y: 0 });

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
          position: "absolute",
          left: position.x,
          top: position.y,
          cursor: "move",
          backgroundColor: "#ccc",
          width: "200px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        <div>{children}</div>
      </div>
    )
  );
};

export default DraggableComponent;
