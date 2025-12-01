//Import Libraries
import { Link } from 'react-router-dom';

// Import CSS
import collectionStyles from './styles/GalleryWall.module.css'

// Import TS Interface
import {Artwork} from './definitions/artwork.model'

// Constructor
export default function Thumbnail( {artwork, highlightFavorites=true} : {artwork:Artwork, highlightFavorites:boolean} ) {
    // Determine if artwork is favorite
    const favorites = localStorage.getItem('favorites')?.split(',');
    const isFavorite = favorites?.includes(artwork.id.toString());

    // Renderer
    return (
        <li 
            title="thumbnail" 
            key={artwork.id} 
            className={`${collectionStyles.thumbnail} ${highlightFavorites && isFavorite?collectionStyles.favorite:''}`}
            data-testid={highlightFavorites && isFavorite?collectionStyles.favorite:''}
        >
            <Link to={"/artwork/"+artwork.id}>
                <picture>
                    <source srcSet={`https://www.artic.edu/iiif/2/${artwork?.image_id}/full/200,/0/default.jpg`} media="(max-width:200px)" />
                    <source srcSet={`https://www.artic.edu/iiif/2/${artwork?.image_id}/full/400,/0/default.jpg`} media="(max-width:400px)" />
                    <img 
                        src={`https://www.artic.edu/iiif/2/${artwork?.image_id}/full/600,/0/default.jpg`}
                        alt={`${artwork?.title}`.concat(artwork?.artist_title?` by ${artwork.artist_title}`:'') }
                    />
                </picture> 
            </Link>
        </li>
    )
}