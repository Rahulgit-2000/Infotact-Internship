// client/src/components/Taskboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { v4 as uuid } from "uuid";

import SortableItem from "./SortableItem";
import DroppableColumn from "./DroppableColumn";
import EditTaskModal from "./EditTaskModal";
import "./taskboard.css";

import { taskService } from "../services/task.service";

const COLUMNS = ["todo", "inprogress", "done"];

const Taskboard = () => {
  const { projectId } = useParams();
  const [newTask, setNewTask] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // { id, text }

  const [tasks, setTasks] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

  const sensors = useSensors(useSensor(PointerSensor));

  // Map flat task list to columns using status
  const mapTasksToColumns = useCallback((flatTasks) => {
    const grouped = { todo: [], inprogress: [], done: [] };
    for (const t of flatTasks) {
      const status = t.status || "todo";
      if (!grouped[status]) grouped[status] = [];
      grouped[status].push({
        id: t._id,
        text: t.title,
        description: t.description,
        order: (typeof t.order === "number" ? t.order : 0),
        raw: t,
      });
    }
    // sort each column by order (ascending)
    for (const col of COLUMNS) {
      grouped[col].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    return grouped;
  }, []);

  // Load tasks from API
  const loadTasks = useCallback(async () => {
    if (!projectId) return;
    try {
      const res = await taskService.getTasksByProject(projectId);
      // API returns { success: true, tasks: [...] }
      const flat = res.tasks || [];
      setTasks(mapTasksToColumns(flat));
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  }, [projectId, mapTasksToColumns]);

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  // Helper: find column which contains task id
  const findColumnByTaskId = (id) => {
    for (const column in tasks) {
      if (tasks[column].some((t) => t.id === id)) return column;
    }
    return null;
  };

  // When drag ends, update local state and inform backend
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    let fromColumn = findColumnByTaskId(activeId);
    let toColumn = null;

    // dropped onto a task?
    for (const column in tasks) {
      if (tasks[column].some((t) => t.id === overId)) {
        toColumn = column;
        break;
      }
    }

    // If dropped on column empty area (droppable id is column id)
    if (!toColumn && COLUMNS.includes(overId)) {
      toColumn = overId;
    }

    if (!fromColumn || !toColumn) {
      return;
    }

    // clone lists
    const fromList = [...tasks[fromColumn]];
    const toList = [...tasks[toColumn]];

    const fromIndex = fromList.findIndex((t) => t.id === activeId);
    const toIndex = toList.findIndex((t) => t.id === overId);

    // item being moved
    const moved = fromList.splice(fromIndex, 1)[0];

    if (toIndex === -1) {
      toList.push(moved);
    } else {
      toList.splice(toIndex, 0, moved);
    }

    // Update local UI immediately for snappy UX
    const updated = {
      ...tasks,
      [fromColumn]: fromList,
      [toColumn]: toList,
    };
    setTasks(updated);

    // Persist move to backend:
    // We update the moved task's status and recompute order for that column.
    try {
      // Recalculate order values for target column
      const newOrderForTarget = toList.map((item, idx) => ({
        id: item.id,
        order: idx,
      }));

      // Update moved task status and order
      await taskService.moveTask(moved.id, {
        status: toColumn,
        order: newOrderForTarget.find((x) => x.id === moved.id).order,
      });

      // Optionally update order for other tasks in the target column (best-effort)
      // and for tasks in the from column to preserve ordering:
      // We'll send order updates for every changed task.
      const promises = [];

      // update other tasks in target column
      for (const { id, order } of newOrderForTarget) {
        // skip moved because already updated
        if (id === moved.id) continue;
        promises.push(taskService.updateTask(id, { order }));
      }

      // update order for fromColumn tasks
      const newOrderForFrom = fromList.map((item, idx) => ({ id: item.id, order: idx }));
      for (const { id, order } of newOrderForFrom) {
        promises.push(taskService.updateTask(id, { order }));
      }

      if (promises.length) await Promise.all(promises);
    } catch (err) {
      console.error("Failed to persist task move:", err);
      // On failure, reload tasks to restore accurate state
      loadTasks();
    }
  };

  // Create task and persist
  const addTask = async () => {
    if (!newTask.trim() || !projectId) return;
    try {
      const payload = { title: newTask.trim(), description: "", projectId };
      const res = await taskService.createTask(projectId, payload);
      // res.task expected
      const created = res.task || res.data || null;
      setNewTask("");
      // reload to ensure ordering and server-generated fields
      await loadTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      // remove locally
      setTasks((prev) => {
        const copy = { ...prev };
        for (const col of COLUMNS) {
          copy[col] = copy[col].filter((t) => t.id !== taskId);
        }
        return copy;
      });
    } catch (err) {
      console.error("Failed to delete task:", err);
      loadTasks();
    }
  };

  const openEdit = (taskId) => {
    const col = findColumnByTaskId(taskId);
    if (!col) return;
    const task = tasks[col].find((t) => t.id === taskId);
    setTaskToEdit({ id: task.id, text: task.text, column: col });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (id, newText) => {
    try {
      await taskService.updateTask(id, { title: newText });
      // update locally
      setTasks((prev) => {
        const copy = { ...prev };
        for (const col in copy) {
          copy[col] = copy[col].map((t) => (t.id === id ? { ...t, text: newText } : t));
        }
        return copy;
      });
    } catch (err) {
      console.error("Failed to update task:", err);
      loadTasks();
    } finally {
      setEditModalOpen(false);
      setTaskToEdit(null);
    }
  };

  return (
    <div className="board-container">
      {/* ADD TASK UI */}
      <div className="add-task-bar">
        <input
          aria-label="Add new task"
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="board">
          {COLUMNS.map((col) => (
            <DroppableColumn key={col} id={col}>
              <h3 className="column-title">
                {col === "todo" ? "To Do" : col === "inprogress" ? "In Progress" : "Done"}
              </h3>

              <SortableContext items={tasks[col].map((task) => task.id)} strategy={verticalListSortingStrategy}>
                {tasks[col].map((task) => (
                  <SortableItem
                    key={task.id}
                    id={task.id}
                    task={task.text}
                    onDelete={() => handleDeleteTask(task.id)}
                    onEdit={() => openEdit(task.id)}
                  />
                ))}
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>
      </DndContext>

      <EditTaskModal
        open={editModalOpen}
        initialText={taskToEdit?.text || ""}
        onClose={() => setEditModalOpen(false)}
        onSave={(text) => handleSaveEdit(taskToEdit.id, text)}
      />
    </div>
  );
};

export default Taskboard;
