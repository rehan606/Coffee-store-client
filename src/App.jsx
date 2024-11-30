
import { Link, useLoaderData } from 'react-router-dom'
import './App.css'
import CoffeeCard from './components/CoffeeCard'
import { useState } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';

function App() {

  const loadedCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(loadedCoffees);

  return (
    <>
      <header className='bg-[#362626]'>
        <Header></Header>
      </header>

      <section className='banner'>
        <Banner></Banner>
      </section>

      <section className='w-11/12 mx-auto py-20'>
        <h1 className='text-5xl text-center text-[#362626] font-bold font-Rancho mb-10'>Our Popular Products </h1>
        
        <div className="flex justify-center items-center">
          <Link to="/addCoffee">
            <span className="font-Rancho text-xl px-6 py-3 bg-[#E3B577] text-white mb-10 inline-block text-center">Add Coffee</span>
          </Link>
        </div>


        <div className='grid  md:grid-cols-2 gap-6 '>
          {
            coffees.map(coffee => <CoffeeCard key={coffee._id} coffee={coffee} coffees={coffees} setCoffees={setCoffees}  ></CoffeeCard>)
          }
        </div>
      </section>

    </>
  )
}

export default App
