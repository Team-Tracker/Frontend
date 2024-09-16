 
export default async function handler(req, res) {
  try {
    const user = req.body
    const sessionId = generateSessionId()
    const insertSession = ({
       sessionId,
       userId: user.id,
       createdAt: new Date(),
    })
    const response = await fetch('http://localhost:8080', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(insertSession),
    })
   
    res.status(200).json({ sessionId })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}