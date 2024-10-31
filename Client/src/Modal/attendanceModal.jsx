// Modal.js
import React, { useState, useEffect } from 'react';

const AttendanceModal = ({ isOpen, onClose, student, onSave }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [className, setClassName] = useState('');
  const [status, setStatus] = useState('Paid'); // Default value
console.log(student);

  useEffect(() => {
    if (student) {
      setName(student.name);
      setAge(student.age);
      setClassName(student.class);
      setStatus(student.status);
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().getDate()
    onSave({ ...student, name,  class: className, status,date }); // Pass updated student object
    onClose(); // Close modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        {student === null ? <h2 className="text-xl mb-4">Mark Attendance</h2> : <h2 className="text-xl mb-4">Update Attendance</h2>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
         
          <div className="mb-4">
            <label className="block mb-2" htmlFor="class">Class:</label>
            <input
              type="text"
              id="class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="paymentStatus">Attendance:</label>
            <select
              id="paymentStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="Paid">Present</option>
              <option value="Pending">Absent</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded ml-2">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AttendanceModal;
