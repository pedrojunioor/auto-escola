
import { createContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const StorageContext = createContext({} as any)
function StorageProvider({ children }: any) {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [role, setRole] = useState<any>(null)

  const [isLoggedStorage, setIsLoggedStorage] = useState(() => {
    const isLogged = localStorage.getItem('token');
    return !!isLogged
  })

  return (
    <StorageContext.Provider value={{
      isLoading,
      role,
      setRole,
      isLoggedStorage,
      setIsLoggedStorage,
      setIsLoading,
    }}>
      {children}
    </StorageContext.Provider>
  );
}


export { StorageContext, StorageProvider };