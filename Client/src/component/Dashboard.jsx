import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'; // Ensure this line is present to import your CSS
import io from 'socket.io-client';
import { getMetrics } from '../utils/ApiService';

const SOCKET_SERVER_URL = 'http://localhost:5000'; // Update this to your WebSocket server URL
const socket = io(SOCKET_SERVER_URL);

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' });
  const [loading, setLoading] = useState(true);

  // Fetch metrics from your REST API
  const fetchMetrics = async () => {
    try {
      const response = await getMetrics(); // Adjust API call as needed
      if (response.error) {
        throw new Error(response.error);
      }
      setMetrics(response.response.sms_sent || []); // Assuming response contains sms_sent array
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics(); // Fetch initial metrics data

    // Handle incoming WebSocket messages
    socket.on('smsMetricsUpdate', (newMetrics) => {
      console.log('Updated metrics received:', newMetrics);
      setMetrics(newMetrics);
    });

    return () => {
      socket.disconnect(); // Clean up on unmount
    };
  }, []);

  useEffect(() => {
    // D3.js chart rendering
    const svg = d3.select('#chart');
    svg.selectAll('*').remove(); // Clear previous chart
    const margin = { top: 20, right: 30, bottom: 30, left: 40 },
          width = 600 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(metrics.map(metric => metric.country))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(metrics, metric => metric.successRate)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const g = svg.append('g');

    g.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(metrics)
      .join('rect')
      .attr('x', metric => x(metric.country))
      .attr('y', metric => y(metric.successRate))
      .attr('height', metric => y(0) - y(metric.successRate))
      .attr('width', x.bandwidth())
      .on('mouseover', (event, metric) => {
        setTooltip({
          visible: true,
          x: event.pageX,
          y: event.pageY,
          content: `Country: ${metric.country}, Success Rate: ${metric.successRate}%`,
        });
      })
      .on('mouseout', () => {
        setTooltip({ visible: false, x: 0, y: 0, content: '' });
      });

    g.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [metrics]);

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 relative">
      <h1 className="text-xl font-bold mb-4">SMS Metrics Dashboard</h1>
      <svg id="chart" width="600" height="400" />
      {tooltip.visible && (
        <div
          className="tooltip" // Use the tooltip class defined in styles.css
          style={{
            left: tooltip.x,
            top: tooltip.y,
            display: tooltip.visible ? 'block' : 'none',
          }}
        >
          {tooltip.content}
        </div>
      )}
      
      <table className="min-w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Country</th>
            <th className="border border-gray-200 px-4 py-2">Success Rate</th>
            <th className="border border-gray-200 px-4 py-2">Failures</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => (
            <tr key={index}>
              <td className="border border-gray-200 px-4 py-2">{metric.country}</td>
              <td className="border border-gray-200 px-4 py-2">{metric.successRate}%</td>
              <td className="border border-gray-200 px-4 py-2">{metric.failures}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
