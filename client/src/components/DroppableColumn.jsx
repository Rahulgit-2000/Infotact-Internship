import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableColumn = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: isOver ? "#e3f2fd" : "#f5f5f5",
        transition: "0.2s",
        padding: "15px",
        borderRadius: "10px",
        width: "280px",
        minHeight: "300px",
      }}
    >
      {children}
    </div>
  );
};

export default DroppableColumn;

