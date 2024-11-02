"use client";
// /components/Calendar/AppointmentPopup.js
import { useState } from 'react';

export default function AppointmentPopup({ onClose }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [members, setMembers] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle appointment save logic here
    onClose();  // Close the popup after saving
  };

  return (
    <div className="AppointmentPopup">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        
        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        
        <label>Members:</label>
        <input type="text" value={members} onChange={(e) => setMembers(e.target.value)} placeholder="Add members" />
        
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">Save Appointment</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

