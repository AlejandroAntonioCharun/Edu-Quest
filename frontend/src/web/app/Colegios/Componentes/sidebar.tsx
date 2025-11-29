import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: "dashboard", path: "/" },
  { label: "Colegios", icon: "school", path: "/colegios" },
  { label: "Docentes", icon: "group", path: "/docentes" },
  { label: "Estudiantes", icon: "person", path: "/estudiantes" },
  { label: "Quizzes", icon: "quiz", path: "/quizzes" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white fixed left-0 top-0 h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
        <div className="size-8 text-[#135bec]">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col p-4 gap-2 flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
              location.pathname === item.path
                ? "bg-[#135bec]/10 text-[#135bec]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <p className="text-sm font-medium">{item.label}</p>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 flex items-center gap-3">
        <div
          className="bg-center bg-cover rounded-full size-10"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/a/AAcHTtfH-ADMIN')",
          }}
        ></div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-900">Admin</p>
          <p className="text-xs text-gray-500">admin@panel.com</p>
        </div>
      </div>
    </aside>
  );
}
