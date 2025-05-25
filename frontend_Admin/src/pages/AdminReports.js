import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReports = () => {
  const [reports, setReports] = useState({});
  const [stationData, setStationData] = useState([]);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/reports', {
        params: { start: startDate, end: endDate },
      });
      setReports(res.data);
      setStationData(res.data.stationWise);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reports.');
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>System Reports</h2>

      <div style={{ marginBottom: '20px' }}>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ marginLeft: '10px' }} />
        <button onClick={fetchReports} style={{ marginLeft: '15px' }}>Get Report</button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Vehicles Pumped Fuel</h3>
          <p style={styles.reportNumber}>{reports.totalVehicles || 0}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Fuel Dispensed (Litres)</h3>
          <p style={styles.reportNumber}>{reports.totalFuelDispensed || 0}</p>
        </div>
      </div>

      <h3 style={{ marginTop: '40px' }}>Fuel Dispensed by Station</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Station</th>
            <th style={styles.tableHeader}>Total Litres</th>
          </tr>
        </thead>
        <tbody>
          {stationData.map((station, idx) => (
            <tr key={idx}>
              <td style={styles.tableCell}>{station.stationName}</td>
              <td style={styles.tableCell}>{station.totalDispensed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1100px',
    margin: 'auto',
    padding: '40px 20px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
    borderRadius: '18px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
  },
  title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '20px' },
  error: { color: 'red', fontWeight: 600 },
  filterSection: {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
  fetchButton: {
    padding: '10px 20px',
    backgroundColor: '#1d4ed8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
    marginBottom: '40px',
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '16px',
    width: '280px',
    boxShadow: '0 4px 24px rgba(60,72,88,0.1)',
  },
  cardTitle: { fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' },
  reportNumber: {
    fontSize: '3rem',
    fontWeight: 900,
    color: '#1d4ed8',
  },
  breakdown: {
    marginTop: '40px',
    textAlign: 'left',
  },
  breakdownTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableRow: {
    borderBottom: '1px solid #ccc',
  },
};
styles.table = {
  width: '100%',
  marginTop: '20px',
  borderCollapse: 'collapse',
};

styles.tableHeader = {
  background: '#f1f5f9',
  padding: '12px',
  border: '1px solid #cbd5e1',
};

styles.tableCell = {
  padding: '12px',
  border: '1px solid #e2e8f0',
};


export default AdminReports;
