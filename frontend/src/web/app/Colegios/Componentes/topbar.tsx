export default function Topbar() {
  return (
    <header className="flex h-[69px] items-center justify-between border-b border-gray-200 bg-white px-8 ml-64 sticky top-0 z-20">
      <div className="flex items-center gap-8">
        <label className="relative flex min-w-40 max-w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            search
          </span>
          <input
            className="form-input w-full rounded-lg border-gray-300 bg-[#f8f9fc] h-10 pl-10 text-sm"
            placeholder="Buscar..."
          />
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined text-gray-600">
            notifications
          </span>
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined text-gray-600">
            settings
          </span>
        </button>
      </div>
    </header>
  );
}
