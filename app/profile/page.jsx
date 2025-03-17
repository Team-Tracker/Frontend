"use client";

import { useEffect, useState } from "react";
import { getUserData, updateUserData } from "../services/userinfo";

const Profile = () => {
    const [firstname, setFirstname] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [userid, setUserId] = useState([])

    useEffect(async () => {
        const getCookie = (name) => {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    return cookie.substring(name.length + 1);
                }
            }
            return null;
        };

        const fetchUserData = async () => {

            const response = await getUserData(cookie);
            if (!response.ok) {
                console.log("Error fetching User Data");
                return;
            }

            const userData = await response.json();
            setFirstname(userData.firstname || "");
            setLastName(userData.lastName || "");
            setEmail(userData.email || "");
            setPhone(userData.phone || "");
        };

        const cookie = getCookie('userId');
        if (!cookie) return;
        setUserId(cookie);
        
        fetchUserData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userUpdate = await updateUserData(userid, firstname, lastName, email, phone)

        if(!userUpdate.ok){
            console.log("Error updating User data");
            return
        }
    }

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
            </div>
        </div>
    );
}

export default Profile;