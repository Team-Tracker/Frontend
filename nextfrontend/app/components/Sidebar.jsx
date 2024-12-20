import Link from "next/link"

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 w-64 h-full pt-16 fixed left-0 top-0 z-5">
      <div className="space-y-4 p-4">
        <Link href="/chat" className="text-white text-lg font-semibold hover:text-gray-300 block">
          Chat
        </Link>
        <Link href="/teams" className="text-white text-lg font-semibold hover:text-gray-300 block">
          Teams
        </Link>
        <Link href="/calender" className="text-white text-lg font-semibold hover:text-gray-300 block">
          Calendar
        </Link>
      </div>
    </nav>
  );
}

export default Sidebar;
