import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [club, setClub] = useState(null); 

 
  const value = {
    club,setClub
  };

  useEffect(()=>{
    const club = JSON.parse(localStorage.getItem('club'));
    fetch
  },[])
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useApp = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };