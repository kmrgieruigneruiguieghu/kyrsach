import { getAllUsers } from "@/db/queries"
import AdminClient from "./clientpage"

interface PageProps {
  searchParams: Promise<{ password?: string }>;
}

export default async function AdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const adminPassword = process.env.ADMIN_PASSWORD || "aboba2026";
  const userPassword = params.password;

  if (!userPassword || userPassword !== adminPassword) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center p-4">
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Вход в админ-панель</h1>
          <form action="/admin" method="GET">
            <input
              type="password"
              name="password"
              placeholder="Введите пароль"
              className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white mb-4 
              focus:outline-none focus:ring-2 focus:ring-purple-600" />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition">
              Войти
            </button>
          </form>
          {userPassword && (
            <p className="text-red-500 text-sm text-center mt-4">Неверный пароль</p>
          )}
        </div>
      </div>
    );
  }

  const users = await getAllUsers();

  if (!users || !Array.isArray(users)) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <p>Ошибка загрузки данных</p>
      </div>
    );
  }

  return <AdminClient users={users} />;
}