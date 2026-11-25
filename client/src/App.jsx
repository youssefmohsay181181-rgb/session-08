/*const element = (
  <div>
    <h1>Hello World</h1>
    <p>Testing Babel!</p>
  </div>
);
*/

import React from 'react';
import { useState } from 'react'
import Signup from './Signup.jsx'
import Students from './Students.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [registered, setRegistered] = useState(false)

  
  const styles = {
    main: {
      padding: '20px',
    },
    title: {
      color: '#5C6AC4'
    },
  };

  // after successful signup show a new page with all students
  if (registered) {
    return (
      <div style={styles.main}>
        <Students />
      </div>
    )
  }

  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Hello, World!</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count {count}
        </button>
      </div>
      <Signup onSuccess={() => setRegistered(true)} />
      <Students />
    </div>
  )
}

export default App