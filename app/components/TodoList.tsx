import { ITAsk } from "@/types/tasks";
import React from "react";
import Task from "./Task";

interface TodoListProps {
  tasks: ITAsk[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full bg-slate-900">
        {/* head */}
        <thead>
          <tr>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
