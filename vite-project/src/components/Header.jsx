import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const storedName = localStorage.getItem("username")?.split(" ")?.[0];

    const handleLogout = () => {
        localStorage.clear(); // Clear token & user info
        navigate("/"); // Redirect to login or home
    };

    return (
        <header className="bg-gradient-to-r from-purple-700 to-indigo-700 shadow-md w-full">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white tracking-wide">
                    📝 Task Management
                </h1>

                <div className="hidden md:flex gap-4 items-center text-white text-lg">
                    <FaRegUser />
                    <span>{storedName}</span>
                    {
                        storedName && <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-full text-sm"
                        >
                            Logout
                        </button>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;
