import React, { useState } from 'react';
import useSchoolManagement from '../services/ApiService'; // Adjust the path if needed

function Students() {
  const {
    students,
    error,
    addStudent,
    deleteStudent
  } = useSchoolManagement(); // Destructure the necessary functions from the hook

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [localError, setLocalError] = useState('');

  const handleAddStudent = () => {
    // Validation for input fields
    if (!name || !age || !studentClass) {
      setLocalError('Please fill out all the fields.');
      return;
    }

    if (isNaN(age) || age <= 0) {
      setLocalError('Please enter a valid age.');
      return;
    }

    // Call addStudent function from the hook
    addStudent({ name, age, class: studentClass, paymentStatus });

    // Reset the form fields
    setName('');
    setAge('');
    setStudentClass('');
    setPaymentStatus('Pending');
    setLocalError(''); // Clear any local errors
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl">Manage Students</h2>
      {error && <div className="text-red-500">{error}</div>}
      {localError && <div className="text-red-500">{localError}</div>}

      <div className="mt-4 student-cont">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border"
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-2 border ml-2"
        />
        <input
          type="text"
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          className="p-2 border ml-2"
        />
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="p-2 border ml-2"
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
        <button onClick={handleAddStudent} className="ml-2 p-2 bg-blue-500 text-white">
          Add Student
        </button>
      </div>

      <ul className="mt-4">
        {students.map((student) => (
          <li key={student._id} className="p-2 border">
            {student.name} - Age: {student.age}, Class: {student.class}, Payment: {student.paymentStatus}
            <button onClick={() => deleteStudent(student._id)} className="ml-2 p-2 bg-red-500 text-white">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;
