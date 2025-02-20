const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function createAssignment(user_id, title, desc, date, startTime, endTime) {
    try {
        const response = await fetch(`${baseUrl}/calender/create?userId=${user_id}&title=${title}&description=${desc}&date=${date}&startTime=${startTime}&endTime=${endTime}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to create assignment');
        }
    
        return response;
      } catch (error) {
        console.error('Error creating assignment:', error);
      }
}

export async function deleteAssignment(assignment_id) {
    try {
        const response = await fetch(`${baseUrl}/calender/delete?eventId=${assignment_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to delete assignment');
        }
    
        return response;
      } catch (error) {
        console.error('Error deleting assignment:', error);
      }
}


export async function updateAssignment(assignment_id, title, desc, date, time, duration) {
    try {
        const response = await fetch(`${baseUrl}/calender/update?eventId=${assignment_id}&title=${title}&description=${desc}&date=${date}&time=${time}&duration=${duration}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to update assignment');
        }
    
        return response;
      } catch (error) {
        console.error('Error updating assignment:', error);
      }
}

export async function getAssignments(user_id) {
    try {
        const response = await fetch(`${baseUrl}/calender/events?userId=${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to get assignments');
        }
    
        return response;
      } catch (error) {
        console.error('Error getting assignments:', error);
      }
}