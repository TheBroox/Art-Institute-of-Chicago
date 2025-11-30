// Import Components
import Collection from './Collection';
import ErrorBlock from './ErrorBlock'

// Constructor
export default function Featured() {
    // Establish API URL
    const url = `https://api.artic.edu/api/v1/artworks/?ids=${localStorage.getItem('favorites')}&fields=id,title,artist_title,image_id`;

    // Renderer
    return (
        <main>
            <h2>Favorite Artwork</h2>
            <p>Revisit all of your favorite images! Use the "Favorite" button on individual artworks to add to your personal collection.</p>
            { localStorage.getItem('favorites')?.length 
                ? <Collection key={url} url={url} highlightFavorites={false} />
                : <ErrorBlock message="noFavorites" />
            }
        </main>
    )
}
