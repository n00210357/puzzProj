//imports
import axios from 'axios';
import { useState, useCallback } from 'react';
import { IResponseType } from '../types';

export default function usePost(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [error, setError] = useState(null);

    const putRequest = useCallback((url: string, formData: object, headers: object, onSuccess: <T extends IResponseType>(data:T) => void) => {
         setLoading(true);

         let foDa = new FormData();

         for (const [key, value] of Object.entries(formData)) 
         {
            if (key !== 'file')
            {
               foDa.append(key, value)
               console.log(`${key}: ${value}`);
            }
            else
            {
               foDa.append('file', value)
            }
         }

         axios.put(url, foDa, headers)
             .then(response => {
                setData(response.data);
                onSuccess(response.data);
                console.log(response.data)
             })
             .catch(e => {
                setError(e.response.data.message);
             })
             .finally(() => {
                setLoading(false);
             });
    }, []);

    const postRequest = useCallback((url: string, formData: object, headers: object, onSuccess: <T extends IResponseType>(data:T) => void) => {
      setLoading(true);

      let foDa = new FormData();

      for (const [key, value] of Object.entries(formData)) 
      {
         if (key !== 'file')
         {
            foDa.append(key, value)
            console.log(`${key}: ${value}`);
         }
         else
         {
            foDa.append('file', value)
            console.log(value);
         }
      }

      axios.post(url, foDa, headers)
         .then(response => {
            setData(response.data);
            onSuccess(response.data);
            console.log(response.data)
         })
         .catch(e => {
            console.log(url)
            setError(e.response.data.message);
         })
         .finally(() => {
            setLoading(false);
         });
    }, []);


    const getRequest = useCallback((url: string, headers: object, onSuccess: <T extends IResponseType>(data:T) => void) => {
      setLoading(true);

      axios.get(url, headers)
           .then(response => {
              setData(response.data);
              onSuccess(response.data);
           })
           .catch(e => {
              setError(e.response.data.message);
           })
           .finally(() => {
              setLoading(false);
           });
  }, []);

    return { getRequest, putRequest, postRequest, data, loading, error};

}