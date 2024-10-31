import React, { useState } from "react";
import useSchoolManagement from "../services/ApiService"; // Adjust the path as necessary
import AttendanceModal from "../Modal/attendanceModal";

function Attendance() {
  const { attendance,markAttendance,updatedAttendance, error,fetchAttendance } = useSchoolManagement();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(3453);
  // console.log(teachers);

  const handleAttendance = async () => {
    setCurrentStudent(null);
    isModalOpen == false ? setModalOpen(true) : setModalOpen(false);
  };

  const handleEditClick = (record) => {
    setCurrentStudent(record);
    setModalOpen(true);
  };
  const handleSave = async (updatedStudent) => {
    currentStudent == " " ? await markAttendance(updatedStudent) : await updatedAttendance(attendance);  // Update student details
    setModalOpen(false); // Close the modal after saving
    await fetchAttendance()

  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      <div className="add-student-btn-cont">
        <button className="admin_add_student" onClick={handleAttendance}>
          Create Attendance
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full border table-cont border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendance.length > 0 ? (
              attendance.map((record) => (
                <tr key={record._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                      onClick={() => handleEditClick(record)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Update Attendance
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal for editing */}
      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        student={currentStudent}
        onSave={handleSave}
      />
    </div>
  );
}

export default Attendance;
