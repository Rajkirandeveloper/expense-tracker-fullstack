import React, { createContext, useState, useContext, useEffect } from 'react';


const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide context to children components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true); 

  // useEffect to check if a token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
     
      const decodedUser = { name: 'Kiran', email: 'kiran@example.com' }; 
      setUser(decodedUser);  
    }
    setLoading(false); 
  }, []);

  // Function to log in a user
  const login = (userData) => {
    console.log("Logging in with user data:", userData);
    setUser(userData); // Update user state with user data
    localStorage.setItem('token', userData.token); // Store token in localStorage
  };

// Provide the user, loading, login, and logout methods via context
  return (
    <AuthContext.Provider value={{ user,setUser, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};
