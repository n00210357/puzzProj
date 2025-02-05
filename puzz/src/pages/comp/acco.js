import { useEffect, useState } from 'react';
import axios from 'axios';
import UserItem from './accountComp.tsx';
import { UserType } from '../../types/index.d.ts';
import FlatList from 'flatlist-react';

export default function AccoPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    axios.get('https://puz-sable.vercel.app/api/users')
         .then(response => {
          console.log(response.data);
          setUsers(response.data);
          console.log(users)
         })
         .catch(e => {
          console.log(e);
         });

  }, []);
  
  return (
    <ul>
      <FlatList
          data={users}
          renderItem={({item}) => <UserItem user={item} />}
          keyExtractor={(user: UserType) => user._id}
      />
  </ul>

  );
}