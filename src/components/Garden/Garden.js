import { useSelector } from 'react-redux'
import Bed from "../Bed/Bed";

const Garden = ({ gardenData, setIsUserUpdate}) => {
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
              setIsUserUpdate={setIsUserUpdate}
            />)
        }
      </div>
      {/* <div className='tractor'></div> */}
    </>

  );
}

export default Garden;