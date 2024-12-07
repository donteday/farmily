import React, { useEffect, useState } from 'react';
import './Snowfall.css'; // Импортируем стили для снежинок

const Snowfall = ({ numberOfSnowflakes = 50 }) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const createSnowflake = () => {
      const heightRandom = Math.round(Math.random() * 10 + 2);
      const newSnowflake = {
        id: Date.now() + Math.random(), // Уникальный идентификатор для каждого снежинки
        fontSize: Math.random() * 24 + 10 + 'px',
        left: Math.random() * 100 + 'vw',
        animationDuration: Math.random() * 4 + 4 + 's',
        sideAnimationDuration: Math.random() * 2 + 1 + 's',
        height: heightRandom + 'px',
        width: heightRandom + 'px'
      };      

      setSnowflakes((prev) => [...prev, newSnowflake]);

      // Удаляем снежинку через заданное время
      setTimeout(() => {
        setSnowflakes((prev) => prev.filter(s => s.id !== newSnowflake.id));
      }, Math.random() * 4000 + 4000);
    };

    const intervalId = setInterval(createSnowflake, 200);

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
  }, []);

  return (
    <div className="snowfall-container">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="snowflake"
          style={{
            fontSize: snowflake.fontSize,
            left: snowflake.left,
            height: snowflake.height,
            width: snowflake.width,
            animation: `fall ${snowflake.animationDuration} linear infinite, sideWays ${snowflake.sideAnimationDuration} ease-in-out infinite`,
          }}
        >
          
        </div>
      ))}
    </div>
  );
};

export default Snowfall;