import React from 'react';
import { CCarousel, CImage, CCarouselItem } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function IntroSlider() {
  console.log('done');

  const carouselItems = [
    {
      src: 'https://dummyimage.com/1200x300/1776cc/fff',
      alt: 'slide 1',
    },
    {
      src: 'https://dummyimage.com/1200x300/5966cc/fff',
      alt: 'slide 2',
    },
    {
      src: 'https://dummyimage.com/1200x300/9966cc/fff',
      alt: 'slide 3',
    },
  ];
  return (
    <CCarousel className="intro-ads" controls transition="crossfade">
      {carouselItems.map((item, index) => (
        <CCarouselItem key={index}>
          <CImage className="d-block w-100" src={item.src} alt={item.alt} />
        </CCarouselItem>
      ))}
    </CCarousel>
  );
}

export default IntroSlider;
