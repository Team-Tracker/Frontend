"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const TeamCard = ({ projectid, projectName, leaderName, description }) => {
    const router = useRouter();

    /**
        router.push redirects to the specific projects
        f.e. /projects/1

        TODO: link to projectName --> same time request with the id  
    */
    const handleClick = () => {
        router.push(`/projects/${projectid}`);
    };

    /**
        Displays the card and the info that you need to know,
        link to a handleClick function, provided above. 
    */
    return (
        <div
        key={projectid}
        onClick={handleClick}
        className="bg-white rounded-lg shadow-2xl p-4 m-4 cursor-pointer hover:shadow-xl transition-all duration-300"
        style={{ width: '250px', height: '250px' }}
        >
        <h3 className="text-xl font-bold">{projectName}</h3>
        <p className="text-gray-700">
            <strong>Leader:</strong> {leaderName}
        </p>
        <p className="text-gray-600">
            <strong>Description:</strong> {description.slice(0, 20)}...
        </p>
        </div>
    );
};

export default TeamCard;
