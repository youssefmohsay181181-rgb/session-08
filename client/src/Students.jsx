import React from 'react';
import { useState, useEffect } from 'react';

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <b>{student.name}</b> - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;
