"use client";

import { ITAsk } from "@/types/tasks";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITAsk;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleEditSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setEditModalOpen(false);
    setTaskToEdit("");
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setDeleteModalOpen(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setEditModalOpen(true)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
          <form onSubmit={handleEditSubmit}>
            <main>
              <h3 className="font bold text-lg">Edit Task</h3>
              <div className="modal-action">
                <input
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn">
                  save
                </button>
              </div>
            </main>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setDeleteModalOpen(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
          <main>
            <h3 className="text-lg">Delete Task?</h3>
            <div className="modal-action">
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="btn text-red-500"
              >
                Delete
              </button>
            </div>
          </main>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
