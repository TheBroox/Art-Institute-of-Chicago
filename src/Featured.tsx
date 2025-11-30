// Import Components
import Collection from './Collection';

// Constructor
export default function Featured() {
    // Establish API URL
    const url = 'https://api.artic.edu/api/v1/artworks/?fields=id,title,artist_title,image_id';

    // Renderer
    return (
        <main>
            <h2>Featured Artwork</h2>
            <p>Select pieces that the Art Institute of Chicago has choosen to highlight. Selection rotates regularly!</p>
            <Collection key={url} url={url} />
        </main>
    )
}
