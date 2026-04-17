"use client"

import { useState, useMemo } from "react"
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react"
import { deleteUserAction } from "@/app/actions"

interface User {
  id: number;
  name: string;
  email: string;
  registeredAt: Date | null;
}

export default function AdminClient({ users }: { users: User[] }) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const sortedUsers = useMemo(() => {
    if (users.length === 0) return [];

    const sorted = [...users];
    sorted.sort((a, b) => {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    });
    return sorted;
  }, [users, sortOrder]);

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getSortIcon = () => {
    if (sortOrder === "asc") return <ArrowUp className="h-4 w-4 text-purple-500"/>
    return <ArrowDown className="h-4 w-4 text-purple-500"/>
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    const formData = new FormData();
    formData.append("id", id.toString());
    await deleteUserAction(formData);
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4 sm:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Админ-панель</h1>
        <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-150">
              <thead className="border-b border-gray-800 bg-gray-900/50">
                <tr>
                  <th className="text-left p-3 sm:p-4 cursor-pointer hover:bg-gray-800/50 transition text-sm sm:text-base" onClick={toggleSort}>
                    <div className="flex items-center gap-1 sm:gap-2">ID{getSortIcon()}</div>
                  </th>
                  <th className="text-left p-3 sm:p-4 text-sm sm:text-base">Имя</th>
                  <th className="text-left p-3 sm:p-4 text-sm sm:text-base">Email</th>
                  <th className="text-left p-3 sm:p-4 text-sm sm:text-base">Дата регистрации</th>
                  <th className="text-left p-3 sm:p-4 text-sm sm:text-base">Удаление</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-3 sm:p-4 text-sm sm:text-base">{user.id}</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">{user.name}</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">{user.email}</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">{user.registeredAt ? user.registeredAt.toLocaleDateString("ru-RU") : "—"}</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      <button onClick={() => handleDelete(user.id)} disabled={deletingId === user.id}
                        className="text-red-400 hover:text-red-300 transition p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Удалить пользователя">
                        {deletingId === user.id ? <span className="text-xs">...</span> : <Trash2 className="h-4 w-4"/>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!users || sortedUsers.length === 0) && (
              <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
                <p>Нет зарегистрированных пользователей</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}