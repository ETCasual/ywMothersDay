import React, { useEffect, useState } from 'react';
import { ref, set } from 'firebase/database';
import { useDatabase, useDatabaseObjectData } from 'reactfire';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import { Typewriter } from 'react-simple-typewriter';
import { useKeyPress } from '../hooks/useKeyPressed';

export const L5Screen: React.FC = () => {
  const dbRef = useDatabase();

  const gameRef = ref(dbRef, '/');
  const { status, data } =
    useDatabaseObjectData<
      Record<string, { approved: boolean; text: string; name: string; cg: string }>
    >(gameRef);

  const isPressed = useKeyPress({ targetKey: 'g' });
  const [isGradient, setIsGradient] = useState<boolean>(false);

  useEffect(() => {
    if (isPressed && isGradient) setIsGradient(false);
    else if (isPressed && !isGradient) setIsGradient(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPressed]);

  return typeof window !== 'undefined' && status == 'success' ? (
    <>
      <img src="/img/lightbulb.png" className="z-[3] absolute transform scale-[0.4] nudge" />
      <img src="/img/plane.png" className="z-[3] right-0 absolute transform scale-[0.4] nudge" />
      <div
        className={`w-screen h-screen flex flex-col justify-center items-center p-[8rem] ${
          isGradient ? 'gradient' : 'bg-secondary'
        } relative`}
      >
        <div className=" flex absolute text-[7rem] z-[1] top-16 mx-auto bg-primary text-white px-32 shadow-xl py-1 rounded-xl font-bold font-chi">
          <p className="mr-10">她的爱</p>
          <p>我的唉</p>
        </div>

        {data ? (
          <Slider
            slidesToShow={1}
            dots={false}
            infinite
            speed={1000}
            autoplay
            autoplaySpeed={5000}
            fade
            adaptiveHeight
            arrows={false}
            className="h-full w-full bg-white rounded-xl drop-shadow-2xl"
          >
            {Object.values(data).map((d, i) =>
              d && d.approved ? (
                <CarouselItem key={i} text={d.text} name={d.name} cg={d.cg} />
              ) : null
            )}
          </Slider>
        ) : (
          <div className="h-full w-full bg-white rounded-xl flex justify-center items-center drop-shadow-2xl">
            <p className="font-roboto font-bold text-primary text-[8rem]">
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
    </>
  ) : null;
};

interface CarouselItemProps {
  name: string;
  cg: string;
  text: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ name, cg, text }) => {
  return (
    <div className="h-full flex flex-col p-8 overflow-hidden w-full items-center">
      <p className="font-roboto text-[6rem] font-bold mb-1 mt-20 text-primary">{name}</p>
      <p className="font-roboto text-[4rem] font-bold mb-10 text-primary">- {cg} -</p>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p className="font-roboto text-[7rem] font-bold line-clamp-3 mr-5 text-primary">{text}</p>
      </div>
    </div>
  );
};
