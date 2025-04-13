import { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setUser({ username: "", email: "", password: "", confirmPassword: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin && user.password !== user.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (isLogin) {
            // console.log("Logging in with:", user.email, user.password);
            try{
                const response = await axios.post(`http://localhost:3000/login`,{
                    email:user.email,
                    password: user.password
                })

                const data = response.data;
                console.log(data);
                localStorage.setItem("username", data.username);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("authToken", data.jwtToken);

                navigate(`/home/${data.userId}`);
            }catch(err){
                alert(err.message)
            }

        } else {
            // console.log("Registering user:", user);
            // Handle register logic
            try {
                const response = await axios.post(`http://localhost:3000/api/createUser`, user)
                const data = response.data;

                alert(data.message);
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                    {isLogin ? "Login" : "Register"}
                </h2>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                                value={user.username}
                                onChange={(e) =>
                                    setUser((prev) => ({ ...prev, username: e.target.value }))
                                }
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                            value={user.email}
                            onChange={(e) =>
                                setUser((prev) => ({ ...prev, email: e.target.value }))
                            }
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                            value={user.password}
                            onChange={(e) =>
                                setUser((prev) => ({ ...prev, password: e.target.value }))
                            }
                        />
                    </div>

                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                                value={user.confirmPassword}
                                onChange={(e) =>
                                    setUser((prev) => ({ ...prev, confirmPassword: e.target.value }))
                                }
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-300"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        className="text-purple-600 hover:underline"
                        onClick={toggleForm}
                    >
                        {isLogin ? "Register here" : "Login here"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Auth;
