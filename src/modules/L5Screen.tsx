import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { useDatabase, useDatabaseObjectData } from 'reactfire';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Typewriter } from 'react-simple-typewriter';

export const L5Screen: React.FC = () => {
  const dbRef = useDatabase();

  const gameRef = ref(dbRef, '/');
  const { status, data } =
    useDatabaseObjectData<
      Record<string, { approved: boolean; text: string; name: string; cg: string }>
    >(gameRef);

  return typeof window !== 'undefined' && status == 'success' ? (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-16 bg-secondary">
      {data ? (
        <Slider
          slidesToShow={1}
          dots={false}
          infinite
          speed={1000}
          autoplay
          autoplaySpeed={5000}
          centerMode
          className="h-full w-full bg-white rounded-xl"
        >
          {Object.values(data).map((d, i) =>
            d && d.approved ? <CarouselItem key={i} text={d.text} name={d.name} cg={d.cg} /> : null
          )}
        </Slider>
      ) : (
        <div className="h-full w-full bg-white rounded-xl flex justify-center items-center">
          <p className="font-roboto font-bold text-primary text-6xl">
            <Typewriter
              deleteSpeed={200}
              delaySpeed={5000}
              words={[' 她的爱, 我的唉...']}
              cursorStyle="|"
              loop
              cursor
            />
          </p>
        </div>
      )}
    </div>
  ) : null;
};

interface CarouselItemProps {
  name: string;
  cg: string;
  text: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ name, cg, text }) => {
  return (
    <div className="h-full flex flex-col p-8 overflow-hidden w-full">
      <p className="font-roboto text-5xl font-bold mb-1">{name}</p>
      <p className="font-roboto text-3xl font-bold mb-10">{cg}</p>
      <p className="w-full font-roboto text-7xl font-bold line-clamp-5 mr-5">{text}</p>
    </div>
  );
};
