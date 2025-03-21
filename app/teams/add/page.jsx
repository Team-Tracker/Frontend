"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTeam } from "@/app/services/teamsManagement";

const AddTeam = () => {
    const [teamName, setTeamName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [userId, setUserId] = useState("");
    const router = useRouter();

    useEffect(() => {
        const getCookie = (name) => {
            if (typeof document === "undefined") return null;
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              if (cookie.startsWith(name + "=")) {
                return cookie.substring(name.length + 1);
              }
            }
            return null;
          };

        const cookie = getCookie("userId");
        setUserId(cookie);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!teamName.trim()) {
            setError("Please fill out the name");
            return;
        }
        console.log("Team erstellt:", teamName);
        await createTeam(userId, teamName, description)
        router.push("/teams");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-5">Create team</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Team Name</label>
                    <input 
                        type="text" 
                        value={teamName} 
                        onChange={(e) => {
                            setTeamName(e.target.value);
                            setError("");
                        }}
                        className="w-full p-2 border rounded" 
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Description</label>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setError("");
                        }}
                        className="w-full p-2 border rounded" 
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddTeam;
