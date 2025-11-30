// client/src/components/SortableItem.jsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const SortableItem = ({ id, task, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="task-card">
      <div className="task-card-inner">
        <div className="drag-handle" {...attributes} {...listeners} aria-label="Drag handle">
          <DragIndicatorIcon fontSize="small" />
        </div>

        <div className="task-content">{task}</div>

        <div className="task-actions">
          <button className="icon-btn" onClick={onEdit} title="Edit task">
            <EditIcon fontSize="small" />
          </button>
          <button className="icon-btn danger" onClick={onDelete} title="Delete task">
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortableItem;
