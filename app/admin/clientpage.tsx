"use client"

import { useState, useMemo } from "react"
import { ArrowUpDown, ArrowUp, ArrowDown, Trash2 } from "lucide-react"
import { deleteUserAction } from "@/app/actions"

interface User {
  id: number;
  name: string;
  email: string;
  registeredAt: Date | null;
}

type SortField = "id" | "name" | "email" | "registeredAt";
type SortOrder = "asc" | "desc";

export default function AdminClient({ users }: { users: User[] }) {
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const sortedUsers = useMemo(() => {
    if (!users || users.length === 0) return [];

    const sorted = [...users];
    sorted.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "registeredAt") {
        aVal = aVal ? (aVal as Date).getTime() : 0;
        bVal = bVal ? (bVal as Date).getTime() : 0;
      }

      if (aVal === null) return 1;
      if (bVal === null) return -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [users, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-500" />;
    }
    return sortOrder === "asc" 
      ? <ArrowUp className="h-4 w-4 text-purple-500" />
      : <ArrowDown className="h-4 w-4 text-purple-500" />;
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
                  <th 
                    className="text-left p-3 sm:p-4 cursor-pointer hover:bg-gray-800/50 transition text-sm sm:text-base"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      ID
                      {getSortIcon("id")}
                    </div>
                  </th>
                  <th 
                    className="text-left p-3 sm:p-4 cursor-pointer hover:bg-gray-800/50 transition text-sm sm:text-base"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      Имя
                      {getSortIcon("name")}
                    </div>
                  </th>
                  <th 
                    className="text-left p-3 sm:p-4 cursor-pointer hover:bg-gray-800/50 transition text-sm sm:text-base"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      Email
                      {getSortIcon("email")}
                    </div>
                  </th>
                  <th 
                    className="text-left p-3 sm:p-4 cursor-pointer hover:bg-gray-800/50 transition text-sm sm:text-base"
                    onClick={() => handleSort("registeredAt")}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      Дата регистрации
                      {getSortIcon("registeredAt")}
                    </div>
                  </th>
                  <th className="text-left p-3 sm:p-4 text-sm sm:text-base">
                    Удаление
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-3 sm:p-4 text-sm sm:text-base">{user.id}</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">{user.name}</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">{user.email}</td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      {user.registeredAt 
                        ? user.registeredAt.toLocaleString("ru-RU")
                        : "—"}
                    </td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={deletingId === user.id}
                        className="text-red-400 hover:text-red-300 transition p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Удалить пользователя"
                      >
                        {deletingId === user.id ? (
                          <span className="text-xs">...</span>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sortedUsers.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Нет зарегистрированных пользователей
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}