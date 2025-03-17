import { useEffect, useState, useRef } from "react";
import Board from "./components/Board";
import testData from "./test-data";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

interface BoardType {
  id: string;
  name: string;
  tasks: {
    id?: string;
    title: string;
    description: string;
    editMode?: boolean;
  }[];
}

function App() {
  const [state, setState] = useState<BoardType[]>([]);

  const dragSourceBoardId = useRef<string | null>(null);
  const activeTask = useRef<string | null>(null);
  const overTask = useRef<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
        delay: 100,
      },
    })
  );

  const handleNewTask = (
    boardId: string,
    title: string,
    description: string
  ) => {
    setState(
      state.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: [
                ...board.tasks,
                {
                  id: Date.now().toString(),
                  title,
                  description,
                  editMode: false,
                },
              ],
            }
          : board
      )
    );
  };

  const handleEdit = (taskId: string) => {
    setState(
      state.map((board) => {
        const taskIndex = board.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          const newTasks = [...board.tasks];
          newTasks[taskIndex] = { ...newTasks[taskIndex], editMode: true };
          return { ...board, tasks: newTasks };
        }
        return board;
      })
    );
  };

  const handleSave = (taskId: string, title: string, description: string) => {
    setState(
      state.map((board) => {
        const taskIndex = board.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          const newTasks = [...board.tasks];
          newTasks[taskIndex] = {
            ...newTasks[taskIndex],
            title,
            description,
            editMode: false,
          };
          return { ...board, tasks: newTasks };
        }
        return board;
      })
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;
    activeTask.current = taskId;

    for (const board of state) {
      if (board.tasks.some((task) => task.id === taskId)) {
        dragSourceBoardId.current = board.id;
        break;
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over) {
      overTask.current = over.id as string;
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !dragSourceBoardId.current) {
      dragSourceBoardId.current = null;
      activeTask.current = null;
      overTask.current = null;
      return;
    }

    const taskId = active.id as string;

    let targetBoardId = over.id as string;

    let isTargetTask = false;
    for (const board of state) {
      if (board.tasks.some((task) => task.id === targetBoardId)) {
        isTargetTask = true;
        targetBoardId = board.id;
        break;
      }
    }

    const sourceBoardId = dragSourceBoardId.current;

    if (sourceBoardId === targetBoardId) {
      if (isTargetTask && activeTask.current !== overTask.current) {
        setState(
          state.map((board) => {
            if (board.id === sourceBoardId) {
              const oldTaskIndex = board.tasks.findIndex(
                (task) => task.id === activeTask.current
              );
              const newTaskIndex = board.tasks.findIndex(
                (task) => task.id === overTask.current
              );

              if (oldTaskIndex !== -1 && newTaskIndex !== -1) {
                const newTasks = [...board.tasks];
                const [movedTask] = newTasks.splice(oldTaskIndex, 1);
                newTasks.splice(newTaskIndex, 0, movedTask);
                return { ...board, tasks: newTasks };
              }
            }
            return board;
          })
        );
      }
    } else {
      const task = state
        .find((board) => board.id === sourceBoardId)
        ?.tasks.find((task) => task.id === taskId);

      if (!task) {
        dragSourceBoardId.current = null;
        activeTask.current = null;
        overTask.current = null;
        return;
      }

      const newState = state.map((board) => {
        if (board.id === sourceBoardId) {
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== taskId),
          };
        }
        if (board.id === targetBoardId) {
          if (isTargetTask && overTask.current) {
            const overTaskIndex = board.tasks.findIndex(
              (t) => t.id === overTask.current
            );
            if (overTaskIndex !== -1) {
              const newTasks = [...board.tasks];
              newTasks.splice(overTaskIndex, 0, task);
              return {
                ...board,
                tasks: newTasks,
              };
            }
          }

          return {
            ...board,
            tasks: [...board.tasks, task],
          };
        }
        return board;
      });

      setState(newState);
    }

    dragSourceBoardId.current = null;
    activeTask.current = null;
    overTask.current = null;
  };

  function handleDelete(taskId: string): void {
    setState(
      state.map((board) => {
        const taskIndex = board.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== taskId),
          };
        }
        return board;
      })
    );
  }

  useEffect(() => {
    setState(testData.boards);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{ bgcolor: "#f5f5f5" }}>
        <Typography level="h1" sx={{ pt: 2, pl: 2 }}>
          My Trello
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflow: "auto",
            p: 2,
            minHeight: "100vh",
            width: "auto",
            bgcolor: "#f5f5f5",
          }}
        >
          {state.map((board) => (
            <Board
              key={board.id}
              id={board.id}
              name={board.name}
              tasks={board.tasks}
              onAdd={handleNewTask}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          ))}
        </Box>
      </Box>
    </DndContext>
  );
}

export default App;
