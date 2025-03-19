"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddTeam = () => {
    const [teamName, setTeamName] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!teamName.trim()) {
            setError("Dieses Feld ist erforderlich");
            return;
        }
        console.log("Team erstellt:", teamName);
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
