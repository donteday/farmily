import { useSelector} from 'react-redux'
import Bed from "../Bed/Bed";

const Garden = () => {
  const data = useSelector(state => state.counter.dataGarden);

    return ( 
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
     );
}
 
export default Garden;