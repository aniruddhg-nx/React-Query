
   
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes =  () => {
  return axios.get('http://localhost:4000/superheroes')
};

export const RQSuperHeroesPage = () => {
  // const { isLoading, data, isError, error, isFetching } = useQuery('super-heroes',
  // fetchSuperHeroes);

  const onSuccess = (data) =>{
    console.log('Query was success with data : ', data);
  }

  const onError = (error) =>{
    console.log('Query failed with error : ', error);
  }

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery('super-heroes',
  fetchSuperHeroes,
  {
   enabled:false,
   onSuccess,
   onError
  });


  console.log({isLoading, isFetching});
  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick = {refetch}>Refetch</button>
      {data?.data.map(hero => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )
}