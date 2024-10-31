import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { startProgram, stopProgram, restartProgram, getProgramStatus } from '../utils/ApiService'; // Import API functions
// import './ProgramControl.css'; // Import the CSS file

const ProgramControl = () => {
  const [programStatus, setProgramStatus] = useState('inactive'); // Default status
  const [loading, setLoading] = useState(false);

  // Function to fetch current program status from the backend
  const fetchProgramStatus = async () => {
    setLoading(true);
    try {
      const response = await getProgramStatus(); // Use the API function
      setProgramStatus(response.status); // Ensure response contains the correct status
    } catch (error) {
      toast.error('Error fetching program status: ' + error.message); // More specific error message
    } finally {
      setLoading(false);
    }
  };

  // Call fetchProgramStatus on component mount
  useEffect(() => {
    fetchProgramStatus();
  }, []);

  // Functions to handle button clicks
  const handleStartProgram = async () => {
    setLoading(true);
    try {
      await startProgram(); // Use the API function
      toast.success('Program started successfully!');
      await fetchProgramStatus(); // Re-fetch status after starting the program
    } catch (error) {
      toast.error('Error starting program: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStopProgram = async () => {
    setLoading(true);
    try {
      await stopProgram(); // Use the API function
      toast.success('Program stopped successfully!');
      await fetchProgramStatus(); // Re-fetch status after stopping the program
    } catch (error) {
      toast.error('Error stopping program: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRestartProgram = async () => {
    setLoading(true);
    try {
      await restartProgram(); // Use the API function
      toast.success('Program restarted successfully!');
      await fetchProgramStatus(); // Re-fetch status after restarting the program
    } catch (error) {
      toast.error('Error restarting program: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="program-control">
      <h2>Program Control</h2>
      <div className="status">
        <span className="font-semibold">Current Status:</span> {loading ? 'Loading...' : programStatus}
      </div>
      <div className="buttons">
        <button
          onClick={handleStartProgram}
          disabled={loading || programStatus === 'active'}
          className="bg-green-500 text-white"
        >
          {loading && programStatus === 'inactive' ? 'Starting...' : 'Start Program'}
        </button>
        <button
          onClick={handleStopProgram}
          disabled={loading || programStatus === 'inactive'}
          className="bg-red-500 text-white"
        >
          {loading && programStatus === 'active' ? 'Stopping...' : 'Stop Program'}
        </button>
        <button
          onClick={handleRestartProgram}
          disabled={loading || programStatus === 'active'}
          className="bg-yellow-500 text-white"
        >
          {loading && programStatus === 'active' ? 'Restarting...' : 'Restart Program'}
        </button>
      </div>
    </div>
  );
};

export default ProgramControl;
