import React from 'react'
import TopHome from './TopHome'
import HomeContent from './HomeContent'
import FeaturedKitchenItems from './Middle'
import Services from './Serivces'
import Contact from './Contacts'
import MetaData from './layout/MetaData'


const Home = () => {
 
  return (
    <main>
      <MetaData title={"Home"} />
      <HomeContent />
      <TopHome />
      <FeaturedKitchenItems />
      <Services />
      <Contact />
    </main>
  );
}

export default Home