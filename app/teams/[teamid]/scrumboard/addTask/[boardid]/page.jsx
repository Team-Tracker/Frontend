"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams  } from "next/navigation";
import { addTask } from "@/app/services/scrumService";

const AddTask = () => {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [userId, setUserId] = useState("");

    const router = useRouter();
    const { teamid, boardid } = useParams();

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
        console.log("boardid: ", boardid)
        const response = await addTask(taskName, description, boardid, userId);

        if (response.ok) {
            router.push(`/teams/${teamid}/scrumboard`);
        }

    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-5">Create Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Task name</label>
                    <input 
                        type="text" 
                        value={taskName} 
                        onChange={(e) => {
                            setTaskName(e.target.value);
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
}
 
export default AddTask;