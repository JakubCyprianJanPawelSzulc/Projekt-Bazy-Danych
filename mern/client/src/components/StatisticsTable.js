import React from 'react';
import { Table } from 'react-bootstrap';

export default function StatisticsTable({ statistics }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Statystyka</th>
          <th>Wartość</th>
        </tr>
      </thead>
      <tbody>
        {statistics.map((statistic, index) => (
          <tr key={statistic.name}>
            <td>{index + 1}</td>
            <td>{statistic.name}</td>
            <td>{statistic.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
