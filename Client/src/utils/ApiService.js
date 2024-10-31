import axios from 'axios';

// Base URL for your API
const API_BASE_URL = 'http://127.0.0.1:5000'; // Replace with your actual API base URL

// Function to handle errors from API requests
const handleError = (error) => {
  let errorMessage = 'An error occurred. Please try again.';

  if (error.response) {
    // If the server responded with an error status
    errorMessage = error.response.data.message || errorMessage;
    return {
      success: false,
      error: error.response.data,
      message: errorMessage,
    };
  } else if (error.request) {
    // If no response was received from the server
    return {
      success: false,
      message: 'No response from server.',
    };
  } else {
    // If there was an error setting up the request
    return {
      success: false,
      message: error.message,
    };
  }
};

// Function to handle user signup
export const signup = async (username, password, email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, { username, password, email });
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to handle user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to verify user's email address
export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verify_email/${token}`);
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to add a country operator
export const addCountryOperator = async (countryOperator, highPriority = false) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/country-operator`, {
      country_operator: countryOperator,
      high_priority: highPriority,
    });
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to delete a country operator by ID
export const deleteCountryOperator = async (countryOperatorId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/country-operator/${countryOperatorId}`);
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to start a program with given parameters
export const startProgram = async (countryOperator, phoneNumber, proxy) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/program/start`, {
      country_operator: countryOperator,
      phone_number: phoneNumber,
      proxy,
    });
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to stop a program based on session name
export const stopProgram = async (sessionName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/program/stop`, { session_name: sessionName });
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to restart a program with given parameters
export const restartProgram = async (countryOperator, phoneNumber, proxy) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/program/restart`, {
      country_operator: countryOperator,
      phone_number: phoneNumber,
      proxy,
    });
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to get metrics with pagination
export const getMetrics = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/metrics`, { params: { page, per_page: perPage } });
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to send an alert message
export const sendAlert = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/alerts`, { message });
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to send an SMS
export const sendSms = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send_sms`);
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};

// Function to get the status of a program
export const getProgramStatus = async (sessionName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/program/status`, { params: { session_name: sessionName } });
    return { success: true, data: response.data }; // Return success and data
  } catch (error) {
    return handleError(error); // Handle and return any errors
  }
};
