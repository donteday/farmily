import { useEffect } from 'react';
import './Snowfall.css'; // Импортируем стили для снежинок

const Snowfall = () => {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.textContent = '•';
      snowflake.style.fontSize = Math.random() * 24 + 10 + 'px';
      snowflake.style.left = Math.random() * window.innerWidth + 'px';
      snowflake.style.animation = `fall ${Math.random() * 4 + 4}s linear infinite, sideWays ${Math.random() * 2 + 1}s ease-in-out infinite`;

      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, Math.random() * 4000 + 4000);
    };

    const intervalId = setInterval(createSnowflake, 100);

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
  }, []);

  return null; // Этот компонент ничего не рендерит
};

export default Snowfall;