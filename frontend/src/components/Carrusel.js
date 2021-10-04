import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';


const items = [
    [{src: './assets/santiagodechile.jpg', pais: "Santiago"},
        {src: './assets/montevideo.jpg', pais: "Montevideo"},
        {src: './assets/buenoaires.jpg', pais: "Cordoba"},
        {src: './assets/brasilia.jpg', pais: 'Rio de Janeiro'}],
    [{src: './assets/bogota.jpg', pais: "Bogota"},
        {src: './assets/lapaz.jpg', pais: "La Paz"},
        {src: './assets/asuncion.jpg', pais: "Ikita"},
        {src: './assets/lima.jpg', pais: "Lima"}],
    [{src: './assets/caracas.jpg', pais: "Caracas"},
        {src: './assets/paramaribo.jpg', pais: "Paramaribo"},
        {src: './assets/cayena.jpg', pais: "Cayena"},
        {src: './assets/quito.jpg', pais: "Quito"}],
];

const Carrusel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  
  const slides = items.map((item, index) => {
    return (
       
      <CarouselItem 
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}>
          <div className = "slide">
            {item.map((info, index) => 
                <div  key={index} className="carouselPhotos" style ={{backgroundImage: `url("${info.src}")`}}>  <h3 id="nameCity">{info.pais}</h3> </div>, 
            )}
        </div>    
      </CarouselItem>
      
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev"  onClickHandler={previous} />
      <CarouselControl direction="next"  onClickHandler={next} />
    </Carousel>
  );
}

export default Carrusel;