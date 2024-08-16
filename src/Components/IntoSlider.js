import React from 'react';
import { CCarousel, CImage, CCarouselItem } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function IntroSlider() {
  return (
    <CCarousel className="intro-ads" controls transition="crossfade">
      <CCarouselItem>
        <CImage
          className="d-block w-100"
          src="https://dummyimage.com/1200x300/1776cc/fff"
          alt="slide 1"
        />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          className="d-block w-100"
          src="https://dummyimage.com/1200x300/3966cc/fff"
          alt="slide 2"
        />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          className="d-block w-100"
          src="https://dummyimage.com/1200x300/9966cc/fff"
          alt="slide 3"
        />
      </CCarouselItem>
    </CCarousel>
  );
}

export default IntroSlider;
