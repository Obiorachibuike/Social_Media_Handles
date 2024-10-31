import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  addCountryOperator,
  deleteCountryOperator,
  updateCountryOperator,
  getMetrics,
} from '../utils/ApiService';
// import './CountryOperatorManagement.css'; // Import the CSS file

const CountryOperatorManagement = () => {
  const [countryOperatorPairs, setCountryOperatorPairs] = useState([]);
  const [newPair, setNewPair] = useState({ country: '', operator: '', prioritized: false });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCountryOperatorPairs = async () => {
    setLoading(true);
    try {
      const response = await getMetrics();
      setCountryOperatorPairs(response);
    } catch (error) {
      toast.error('Error fetching country-operator pairs: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryOperatorPairs();
  }, []);

  const handleAddOrUpdatePair = async () => {
    if (!newPair.country || !newPair.operator) {
      toast.error('Both fields are required!');
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        const updatedPair = await updateCountryOperator(editingId, newPair);
        setCountryOperatorPairs((prevPairs) => 
          prevPairs.map(pair => (pair.id === editingId ? updatedPair : pair))
        );
        toast.success('Pair updated successfully!');
      } else {
        const addedPair = await addCountryOperator(newPair, false, setCountryOperatorPairs, toast);
        setCountryOperatorPairs((prevPairs) => [...prevPairs, addedPair]);
        toast.success('Pair added successfully!');
      }
      setNewPair({ country: '', operator: '', prioritized: false });
      setEditingId(null);
    } catch (error) {
      toast.error('Error processing pair: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPair = (pair) => {
    setNewPair({ country: pair.country, operator: pair.operator, prioritized: pair.prioritized });
    setEditingId(pair.id);
  };

  const handleRemovePair = async (id) => {
    setLoading(true);
    try {
      await deleteCountryOperator(id, setCountryOperatorPairs, toast);
      setCountryOperatorPairs((prevPairs) => prevPairs.filter(pair => pair.id !== id));
      toast.success('Pair removed successfully!');
    } catch (error) {
      toast.error('Error removing pair: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="country-operator-management">
      <h2>Country-Operator Management</h2>
      <div className="add-pair">
        <input
          type="text"
          placeholder="Country"
          value={newPair.country}
          onChange={(e) => setNewPair({ ...newPair, country: e.target.value })}
        />
        <input
          type="text"
          placeholder="Operator"
          value={newPair.operator}
          onChange={(e) => setNewPair({ ...newPair, operator: e.target.value })}
        />
        <button
          onClick={handleAddOrUpdatePair}
          disabled={loading}
        >
          {editingId ? 'Update Pair' : 'Add Pair'}
        </button>
      </div>
      <div>
        <h3 className="font-semibold">Prioritized Pairs:</h3>
        <ul>
          {countryOperatorPairs.filter(pair => pair.prioritized).map(pair => (
            <li key={pair.id}>
              {pair.country} - {pair.operator}
              <button onClick={() => handleEditPair(pair)} className="text-yellow-500">Edit</button>
              <button onClick={() => handleRemovePair(pair.id)} className="text-red-500">Remove</button>
            </li>
          ))}
        </ul>
        <h3 className="font-semibold">Current Pairs:</h3>
        <ul>
          {countryOperatorPairs.filter(pair => !pair.prioritized).map(pair => (
            <li key={pair.id}>
              {pair.country} - {pair.operator}
              <button onClick={() => handleEditPair(pair)} className="text-yellow-500">Edit</button>
              <button onClick={() => handleRemovePair(pair.id)} className="text-red-500">Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CountryOperatorManagement;
