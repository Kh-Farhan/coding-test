import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Task, Transaction } from '../types';

const useAPI = () => {
  const getTasks = useCallback(async (): Promise<Task[]> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return [];
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return [];
  }, []);

  const authenticate = useCallback(async (email:string, password:string): Promise<any> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
        method: 'Post',
        mode: 'cors',
        credentials: 'include',
        body:JSON.stringify({email,password})
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return [];
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return [];
  }, []);

  const getTransactions = useCallback(async (pageNo:number|any): Promise<{ [key: string]: Transaction }> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions?page=${pageNo}`, {
        method: 'Get',
        mode: 'cors',
        credentials: 'include',
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return {};
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return {};
  }, []);

  return {
    getTasks,
    authenticate,
    getTransactions
  };
};

export default useAPI;
