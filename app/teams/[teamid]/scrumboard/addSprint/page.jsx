"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { addSprint } from "@/app/services/scrumService";

const AddSprint = () => {
    const [sprintName, setSprintName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState("");
    const [userId, setUserId] = useState("");
    const router = useRouter();

    const teamid = useParams();

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

          const user = getCookie("userId");
          setUserId(user);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //TODO: Request to send Data to the Backend:
        const response = await addSprint(teamid, startDate, endDate)

        if(response.ok) {
            router.push(`/teams/${teamid}/scrumboard`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-5">Create Sprint</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Sprint name</label>
                    <input 
                        type="text" 
                        value={sprintName} 
                        onChange={(e) => {
                            setSprintName(e.target.value);
                            setError("");
                        }}
                        className="w-full p-2 border rounded" 
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Start Date: </label>
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => {
                            setStartDate(e.target.value);
                            setError("");
                        }}
                        className="w-full p-2 border rounded" 
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">End Date: </label>
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => {
                            setEndDate(e.target.value);
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
}
 
export default AddSprint;