import React, { useState } from 'react';
import useSchoolManagement from '../services/ApiService'; // Adjust the path if needed

function Teachers() {
  const { teachers, error, addTeacher, deleteTeacher } = useSchoolManagement(); // Destructure the necessary functions from the hook

  // State to manage form fields
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [experience, setExperience] = useState('');
  const [teacherClass, setTeacherClass] = useState('');
  const [localError, setLocalError] = useState('');

  const handleAddTeacher = () => {
    // Basic validation for required fields
    if (!name || !subject || !experience) {
      setLocalError('Please fill out all required fields.');
      return;
    }

    if (isNaN(experience) || experience <= 0) {
      setLocalError('Please enter a valid experience (positive number).');
      return;
    }

    // Call addTeacher function from the hook
    addTeacher({
      name,
      subject,
      experience: parseInt(experience, 10), // Ensure experience is a number
      class: teacherClass, // Optional field
    });

    // Reset the form fields after submission
    setName('');
    setSubject('');
    setExperience('');
    setTeacherClass('');
    setLocalError(''); // Clear any local errors
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl">Manage Teachers</h2>
      {error && <div className="text-red-500">{error}</div>}
      {localError && <div className="text-red-500">{localError}</div>}

      <div className="mt-4 teacher-cont">
        <input
          type="text"
          placeholder="Teacher Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-2 border ml-2"
        />
        <input
          type="number"
          placeholder="Experience (in years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="p-2 border ml-2"
        />
        <input
          type="text"
          placeholder="Class (Optional)"
          value={teacherClass}
          onChange={(e) => setTeacherClass(e.target.value)}
          className="p-2 border ml-2"
        />
        <button onClick={handleAddTeacher} className="ml-2 p-2 bg-blue-500 text-white">
          Add Teacher
        </button>
      </div>

      <ul className="mt-4">
        {teachers.map((teacher) => (
          <li key={teacher._id} className="p-2 border">
            {teacher.name} - Subject: {teacher.subject}, Experience: {teacher.experience} years, Class: {teacher.class || 'N/A'}
            <button onClick={() => deleteTeacher(teacher._id)} className="ml-2 p-2 bg-red-500 text-white">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teachers;
