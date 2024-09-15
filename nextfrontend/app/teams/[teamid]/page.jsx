"use client";

import { useParams } from 'next/navigation'

const TeamPage = () => {
    const params = useParams()

    console.log(params)

    return (
        <div className="ml-1 mt-1 p-4">
        <h1 className="text-3xl font-bold">Welcome in the team</h1>
        {/* Projectlist will be added */}
        </div>
    );
};

export default TeamPage;
