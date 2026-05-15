import { Search, Bell, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-transparent">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold font-serif italic">NextPay</h2>
      </div>

      {/* Barra de búsqueda central */}
      <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 w-96 shadow-sm">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search anything"
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
        <div className="p-2 bg-gray-100 rounded-lg cursor-pointer">
          <Settings className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex items-center gap-2 border-l pl-4">
          <div className="text-right">
            <p className="text-xs font-bold">Alex Turner</p>
            <p className="text-[10px] text-gray-400">alexturner@gmail.com</p>
          </div>
          <img
            src="https://i.pravatar.cc/150?u=alex"
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
