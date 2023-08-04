import { useEffect, useState } from 'react'
import './App.css'
import { getData } from './api';
import { Cards } from './Cards';

function App() {
  const [data, setData] = useState(undefined);

  useEffect(()=>{
    getData().then((res)=>{
      setData(res);
    });
  }, []);

  return (
    <>
      <header></header>
      {data ? <Cards data={data}/> : "Loading"}
    </>
  )
}

export default App
