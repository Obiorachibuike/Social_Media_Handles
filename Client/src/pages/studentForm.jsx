import React, { useState, useEffect } from 'react';
import useSchoolManagement from '../services/ApiService';

const StudentForm = () => {
    const { addStudent, updateStudent, editingStudent, setEditingStudent } = useSchoolManagement
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [className, setClassName] = useState('');
  const [grades, setGrades] = useState([{ subject: '', grade: '' }]);
  const [paymentStatus, setPaymentStatus] = useState('Paid'); // Default value

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age);
      setClassName(editingStudent.class);
      setGrades(editingStudent.grades);
      setPaymentStatus(editingStudent.paymentStatus);
    } else {
      setName('');
      setAge('');
      setClassName('');
      setGrades([{ subject: '', grade: '' }]);
      setPaymentStatus('Paid');
    }
  }, [editingStudent]);

  const handleAddStudent = () => {
    addStudent({ name, age, class: className, grades, paymentStatus });
    resetForm();
  };

  const handleUpdateStudent = () => {
    if (editingStudent) {
      updateStudent({ ...editingStudent, name, age, class: className, grades, paymentStatus });
      setEditingStudent(null);
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setAge('');
    setClassName('');
    setGrades([{ subject: '', grade: '' }]);
    setPaymentStatus('Paid');
  };

  const handleGradeChange = (index, field, value) => {
    const newGrades = [...grades];
    newGrades[index][field] = value;
    setGrades(newGrades);
  };

  const handleAddGrade = () => {
    setGrades([...grades, { subject: '', grade: '' }]);
  };

  return (
    <div>
      <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter student name"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter student age"
        required
      />
      <input
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        placeholder="Enter student class"
        required
      />
      
      <h3>Grades</h3>
      {grades.map((grade, index) => (
        <div key={index}>
          <input
            value={grade.subject}
            onChange={(e) => handleGradeChange(index, 'subject', e.target.value)}
            placeholder="Subject"
            required
          />
          <input
            value={grade.grade}
            onChange={(e) => handleGradeChange(index, 'grade', e.target.value)}
            placeholder="Grade"
            required
          />
        </div>
      ))}
      <button onClick={handleAddGrade}>Add Grade</button>

      <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
      </select>

      {editingStudent ? (
        <button onClick={handleUpdateStudent}>Update Student</button>
      ) : (
        <button onClick={handleAddStudent}>Add Student</button>
      )}
      {editingStudent && (
        <button onClick={() => setEditingStudent(null)}>Cancel</button>
      )}
    </div>
  );
};

export default StudentForm;
