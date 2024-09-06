import React, { useEffect, useState } from 'react';
import { CCarousel, CImage, CCarouselItem } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_API_URL from '../config';

function IntroSlider() {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_API_URL + '/active_ads'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCarouselItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CCarousel controls transition="crossfade">
      {carouselItems.map((item, index) => (
        <CCarouselItem key={index}>
          <CImage className="w-100" src={item.image_url} alt={item.image_url} />
        </CCarouselItem>
      ))}
    </CCarousel>
  );
}

export default IntroSlider;
