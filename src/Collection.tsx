// Import Libraries
import { useState, useEffect, act } from 'react'
import axios from 'axios';

// Import Compoennts
import Thumbnail from './Thumbnail';
import ErrorBlock from './ErrorBlock';

// Import TS Interface
import {Artwork} from './definitions/artwork.model'

// Import CSS
import collectionStyles from './styles/GalleryWall.module.css'

// Constructor
export default function Collection( {url, highlightFavorites=true} : {url: string, highlightFavorites?:boolean} ) {
  // Establish state
  const [catalog, setCatalog] = useState<Artwork[]>();
  const [isAsyncError, setIsAsyncError] = useState<Boolean>(false);
  
  // Pull down collection information from AIC
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response:Artwork[] = await (await axios.get(url)).data.data;
        const catalog:Artwork[] = response.filter( artwork => {
          return Boolean(artwork.image_id);
        });
        act(() => { 
          setCatalog(catalog);
        });
      } catch {
        act(() => { 
          setIsAsyncError(true);
        });
      }
    };
    fetchData();
  },[]);

  // Renderer
  if(isAsyncError){
    return (
      <div title="error">
        <ErrorBlock message="async" />
      </div>
    );
  } else {
    return (
      <ul title="collection" className={collectionStyles.collection}>
        {catalog?.map( (artwork:Artwork) =>
          <Thumbnail key={'thumbnail-'+artwork.id} artwork={artwork} highlightFavorites={highlightFavorites} />
        )}
      </ul>
    );
  }
}