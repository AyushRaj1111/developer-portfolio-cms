import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        history.push('/login');
      }
    });

    return () => unsubscribe();
  }, [history]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard, {user.displayName}</h1>
      <p>Here you can manage your blogs, projects, learning progress, achievements, and experiences.</p>
    </div>
  );
};

export default Dashboard;
