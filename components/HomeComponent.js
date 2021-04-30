import React,{useRef, useEffect} from "react";
import {useMediaQuery} from 'react-responsive';
import Carousel from "./CarouselComponent";

export default function HomeComponent() {
  const scrollRef = useRef(null);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  useEffect(()=>{
    if(isMobile)
    {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  },[]);
  return (
    <div ref={scrollRef} className="container my-3">
      <Carousel />
    </div>
  );
}
