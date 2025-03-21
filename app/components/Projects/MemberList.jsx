"use client";

import { getMembers } from "@/app/services/teamsManagement";
import { getUserName } from "@/app/services/userinfo";
import { useEffect, useState } from "react";

const MemberList = (teamId) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMembers(teamId.teamId);
                const memberData = await response.json();
        
                let updatedMembers = [];
        
                for (const member of memberData) {
                    const userNameResponse = await getUserName(member.userId);
                    const userName = await userNameResponse.text();
                    
                    const newMember = { ...member, username: userName };
                    updatedMembers.push(newMember);
                }
          
                setMembers(updatedMembers);
              } catch (error) {
                console.error("Error fetching members:", error);
              }
        }

        fetchData();
    }, []);

    return (
        <div className="w-80 w-full h-full bg-gray-900 rounded-lg p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Members</h2>
            <button
              disabled
              className="bg-gray-600 text-white px-3 py-1 rounded-md cursor-not-allowed opacity-60"
            >
              +
            </button>
          </div>
    
          <ul className="h-full space-y-2 max-h-48 overflow-y-auto scrollbar-thumb-white scrollbar-track-gray-700">
            {members.length > 0 ? (
              members.map((member, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-500/10 rounded-md transition-transform hover:bg-gray-500/30 hover:scale-105"
                >
                  {member.username}
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No members yet...</p>
            )}
          </ul>
        </div>
      );
    
}
 
export default MemberList;