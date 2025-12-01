// Import Libraries
import { useState, ChangeEvent, FormEvent } from 'react';

// Import Components
import Collection from './Collection';

// Import CSS
import subNavStyles from './styles/GallerySubNav.module.css'

// Constructor
export default function Featured() {
    // Establish State
    const [title, setTitle] = useState<string>('Randomized Gallery Selection');
    const fieldsString = 'fields=id,title,artist_title,image_id'

    // Search Functionality
    const [search, setSearch] = useState<string>('');

    const updateSearch = ( e:ChangeEvent<HTMLInputElement> ) => {
        setSearch(e.target.value);
    }

    const searchUrl = ( e:FormEvent<HTMLFormElement> ) =>{
        e.preventDefault();
        setUrl(`https://api.artic.edu/api/v1/artworks/search?q=${search}&${fieldsString}`);
        setTitle(`Gallery Search Results For "${search}"`);
    }

    // Random selection functionality
    const randomUrl  = () => {
        const randomInt = Math.floor(Math.random()*100);
        return `https://api.artic.edu/api/v1/artworks/?page=${randomInt}&limit=100&${fieldsString}`
    }

    const [url, setUrl] = useState<string>(randomUrl);
  
    const randomizeUrl = () => {
        setUrl(randomUrl());
        setTitle('Randomized Gallery Selection');
        setSearch('');
    }
  
    // Renderer
    return (
        <>
            <div className={`subNav ${subNavStyles.subNav}`}>
                <form onSubmit={searchUrl}>
                    <input 
                        type="text"
                        value={search}
                        onChange={updateSearch}
                    />
                    <button type="submit">
                        Search
                    </button>
                </form>
                <button onClick={randomizeUrl}>
                    Randomize Selection
                </button>
            </div>
            <main>
            <h2>{title}</h2>
            <p>Explore the Art Institute of Chicago's entire catalog! Search for specific pieces or use the "Ranomize Selection" button to find something new.</p>
            <Collection key={url} url={url} />
            </main>
        </>
    )
}
