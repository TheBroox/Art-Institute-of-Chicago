// Import Libraries
import { useState, useEffect, act } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

//Import Compoents
import ErrorBlock from './ErrorBlock';

// Import TS Interface
import {Artwork} from './definitions/artwork.model'

// Import CSS
import artworkStyles from './styles/Artwork.module.css'

// Constructor
export default function ArtworkPage() {
    // Establish dtate
    const [artwork, setArtwork] = useState<Artwork>();
    const [isFavorite, setIsFavorite] = useState<Boolean>(false);
    const [favoriteBtnTxt, setFavoriteBtnTxt] = useState<string>('');
    const [isAsyncError, setIsAsyncError] = useState<Boolean>(false);

    // Computed state
    useEffect(() => {
        setIsFavorite( () => {
            const artId = artwork?.id.toString() || '';
            const favorites = localStorage.getItem('favorites')?.split(',') || [];
            return favorites.includes(artId);
        });
    }, [artwork?.id]);

    useEffect(() => {
        setFavoriteBtnTxt( () => isFavorite ? 'Unfavorite' : '♥ Favorite');
    }, [isFavorite]);


    // Favorite/unfavorite functionality
    const toggleFavorite = () => {
        // Get ID and Favorites List from LocalStorage
        const artId = artwork?.id.toString() || '';
        const favorites = localStorage.getItem('favorites')?.split(',') || [];
        const index = favorites.indexOf(artId);
        if( index<0 ){
            // Add ID to Favorites
            favorites.push(artId);
            setFavoriteBtnTxt('Unfavorite');
        } else {
            // Remove ID from Favorites
            favorites.splice(index,1);
            setFavoriteBtnTxt('♥ Favorite');
        }
        // Update LocalSorage
        if(favorites.length){
            localStorage.setItem('favorites', favorites.toString());
        } else {
            localStorage.removeItem('favorites');
        }
    }

    // Get artwork details from AIC
    const {artworkId} = useParams();
    const url = `https://api.artic.edu/api/v1/artworks/${artworkId}?&fields=id,title,artist_display,image_id,date_display,medium_display`;
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const artwork:Artwork = response.data.data;
                act(() => { 
                    setArtwork(artwork);
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
            <main title="error">
                <ErrorBlock message="async" />
            </main>
        );
    } else {
        return (
            <main className={artworkStyles.artwork}>
                <img 
                    src={`https://www.artic.edu/iiif/2/${artwork?.image_id}/full/843,/0/default.jpg`} 
                    alt={`${artwork?.title}`.concat(artwork?.artist_title?` by ${artwork.artist_title}`:'') }
                />
                <div className={artworkStyles.info}>
                    <div className={artworkStyles.artist}>{artwork?.artist_display}</div>
                    <span className={artworkStyles.title}>{artwork?.title}</span>
                    <span className={artworkStyles.date}>{artwork?.date_display}</span>
                    <div className={artworkStyles.medium}>{artwork?.medium_display}</div>
                    <button onClick={toggleFavorite}>
                        {favoriteBtnTxt}
                    </button>
                </div>
            </main>
        );
    }
}