import React, { useState } from 'react';
import useSchoolManagement from '../services/ApiService';
import StudentModal from '../Modal/studentModal'; // Adjust the import path as necessary

function StudentList() {
  const { students, error, deleteStudent, updateStudent, addStudent,fetchStudents } = useSchoolManagement();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
// console.log(students);

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setModalOpen(true);
  };
  const handleAddStudent = () => {
    setCurrentStudent(null);
    isModalOpen == false ?setModalOpen(true) : setModalOpen(false)
    
    // setModalOpen(true);
  };

  const handleSave = async (updatedStudent) => {
    currentStudent == " " ? await addStudent(updatedStudent) : await updateStudent(updatedStudent);  // Update student details
    setModalOpen(false); // Close the modal after saving
    await fetchStudents()

  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="add-student-btn-cont">
        <button className='admin_add_student' onClick={handleAddStudent}>Add Student</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border table-cont border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Payment Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.paymentStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleEditClick(student)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for editing */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        student={currentStudent}
        onSave={handleSave}
      />
    </div>
  );
}

export default StudentList;
