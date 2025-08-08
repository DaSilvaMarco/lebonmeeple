'use client';

import React from 'react';
import HomePresentation from '../components/HomePresentation';
import JoinCommunity from '../components/JoinCommunity';
import Testimonial from '../components/Testimonial';
import WhyLeBonMeeple from '../components/WhyLeBonMeeple';


const HomePage = () => {
  return (
    <>
      <HomePresentation />
      <WhyLeBonMeeple />
      <Testimonial />
      <JoinCommunity />
    </>
  );
};

export default HomePage;