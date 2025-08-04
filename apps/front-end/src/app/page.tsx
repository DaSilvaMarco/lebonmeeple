'use client';

import React from 'react';
import Testimonial from '@frontend/domains/home/components/Testimonial';
import JoinCommunity from '@frontend/domains/home/components/JoinCommunity';
import WhyLeBonMeeple from '@frontend/domains/home/components/WhyLeBonMeeple';
import HomePresentation from '@frontend/domains/home/components/HomePresentation';

const App = () => {
  return (
    <>
      <HomePresentation />

      <WhyLeBonMeeple />

      <Testimonial />

      <JoinCommunity />
    </>
  );
};

export default App;
