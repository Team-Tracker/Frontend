import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-semibold hover:text-gray-300">
          Home
        </Link>
        <Link href="/search" className="text-white text-lg font-semibold hover:text-gray-300">
          Search
        </Link>
        <Link href="/profile" className="text-white text-lg font-semibold hover:text-gray-300">
          Profile
        </Link>
      </div>
    </nav>
  )
}
