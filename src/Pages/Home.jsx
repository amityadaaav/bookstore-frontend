import React from 'react'
import Hero from '../component/Home/Hero'
import RecentAdded from '../component/Home/RecentAdded'

const Home = () => {
  return (
    <div className="bg-zinc-900 text-white">
      <Hero />
      <RecentAdded />
    </div>
  )
}

export default Home
