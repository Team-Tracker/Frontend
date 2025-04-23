"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData, updateUserData } from "../services/userinfo";

const Profile = () => {
    const [firstname, setFirstname] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userId, setUserId] = useState("");
    const router = useRouter();

    useEffect(() => {
        const getCookie = (name) => {
            if (typeof document === "undefined") return null;
            const cookies = document.cookie.split(";");
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(`${name}=`)) {
                    return cookie.substring(name.length + 1);
                }
            }
            return null;
        };

        const cookie = getCookie("userId");
        if (!cookie) return;

        setUserId(cookie);

        const fetchUserData = async () => {
            try {
                const response = await getUserData(cookie);
                if (!response.ok) {
                    console.error("Error fetching user data");
                    return;
                }

                const userData = await response.json();
                console.log("Data: ", userData);
                setFirstname(userData.firstname || "");
                setLastName(userData.lastName || "");
                setEmail(userData.email || "");
                setPhone(userData.phone || "");
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            console.error("User ID is missing. Please log in again.");
            return;
        }

        try {
            const userUpdate = await updateUserData(userId, firstname, lastName, email, phone);
            if (!userUpdate.ok) {
                console.error("Error updating user data");
                return;
            }
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Failed to update user data:", error);
        }
    };

    const handleLogout = () => {
        // Clear all cookies
        if (typeof document !== "undefined") {
            const cookies = document.cookie.split(";");
            for (const cookie of cookies) {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            }
        }
        // Redirect to login page
        router.push("/login");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-900 shadow-lg rounded-lg p-6 w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Save
                    </button>
                </form>
                <button
                    onClick={handleLogout}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Profile;
