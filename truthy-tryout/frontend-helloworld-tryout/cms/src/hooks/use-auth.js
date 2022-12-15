import { useContext } from 'react';

// import { AuthContext } from '../contexts/jwt-context';
// export const useAuth = () => useContext(AuthContext);

import { AuthContext } from '../contexts/truthy-context';
export const useAuth = () => useContext(AuthContext);
