import { useSelector } from 'react-redux'
import Bed from "../Bed/Bed";

const Garden = ({ gardenData }) => {
  const myGarden = useSelector(state => state.counter.dataGarden);
  const data = gardenData || myGarden;

  return (
    <>
      <div className='garden'>
        {
          data.map((bed, index) =>
            <Bed
              key={index}
              index={index}
              bed={bed}
            />)
        }
      </div>
      {/* <div className='tractor'></div> */}
    </>

  );
}

export default Garden;