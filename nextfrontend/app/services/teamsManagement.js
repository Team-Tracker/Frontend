

export async function getTeams(){
    const response = await fetch(`http://geyser.sytes.net:1234/teams/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
}

export async function getProject(teamId) {
    const response = await fetch(`http://geyser.sytes.net:1234/teams/projectId/${teamId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
}