
   
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchSuperHeroes =  () => {
  return axios.get('http://localhost:4000/superheroes')
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery('super-heroes',
  fetchSuperHeroes);

  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const addSuperHero = hero => {
    return axios.post('http://localhost:4000/superheroes', hero)
  }

  const queryClient = useQueryClient();
  const { mutate } =useMutation(addSuperHero, {
    onSuccess: () => {
      queryClient.invalidateQueries('super-heroes')
    }
  });

  console.log({isLoading, isFetching});
  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  const handleAddHeroClick = () => {
    mutate({ name, alterEgo })
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick = {refetch}>Refetch</button>
      {data?.data.map(hero => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )
}