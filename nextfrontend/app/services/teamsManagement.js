const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function getTeams(){
    const response = await fetch(`${baseUrl}/team/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
}

export async function getProject(teamId) {
    const response = await fetch(`${baseUrl}/team${teamId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
}