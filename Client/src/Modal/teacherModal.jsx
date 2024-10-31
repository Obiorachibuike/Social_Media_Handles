// Modal.js
import React, { useState } from 'react';

const TeacherModal = ({ isOpen, onClose, teacher, onSave }) => {
  const [name, setName] = useState(teacher.name || '');
  const [subject, setSubject] = useState(teacher.subject || '');
  const [experience, setExperience] = useState(teacher.experience || '');
  const [className, setClassName] = useState(teacher.class || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...teacher, name, subject, experience, class: className }); // Pass updated teacher object
    onClose(); // Close modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Edit Teacher</h2>
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
            <label className="block mb-2" htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="experience">Experience (Years):</label>
            <input
              type="number"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded ml-2">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;
