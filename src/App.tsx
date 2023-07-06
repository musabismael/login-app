import React, { useState } from 'react';
import './styles.css';
import LoginPage from './components/LoginPage';
import Table from './components/Table';

const App: React.FC = () => {
  const [role, setRole] = useState('');

  const handleLogin = (userRole: string) => {
    setRole(userRole);
  };

  return (
    <div className="container">
      {role ? (
        <>
          <h1>Login Successful!</h1>
          <Table role={role} />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
