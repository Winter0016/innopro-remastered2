import React from 'react'
import { useState, useEffect } from 'react';
export const testing_api = () => {
    const API_URL = 'http://localhost:3500/employees';
    const [employees, setemployees] = useState([]);
    const [newItem, setNewItem] = useState('');

    
  useEffect(() => {

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        console.log(`response : ${JSON.stringify(response)}`);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        console.log(`items before json : ${listItems}`);
        console.log(`items : ${JSON.stringify(listItems)}`);
        console.log(`items parse in : ${JSON.parse(JSON.stringify(listItems))}`);
        // console.log(` item 2 parse in : ${JSON.parse(listItems)}`);
        setemployees(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    // setTimeout(() => fetchItems(), 2000);
  }, [])
  return (
    <div>index</div>
  )
}
