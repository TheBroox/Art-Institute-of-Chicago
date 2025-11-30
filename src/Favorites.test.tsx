import { render, screen, fireEvent } from '@testing-library/react';
import App from "./App";
import Favorites from "./Favorites";
import axios from 'axios';
import {Artwork} from './definitions/artwork.model'

describe('Favorites component', () => {

    test('verify routing', () => {
        render(<App/>);
        const nav = screen.getByText('Favorites');
        fireEvent.click(nav);
        expect(screen.getAllByText('Favorite Artwork').length).toBe(1);
    })

    test('verify no favorites', () => {
        render(<Favorites />);
        const error = screen.getAllByText("You don't have any favorites yet. Dive into the gallery and find what speaks to you.");
        expect(error).toHaveLength(1);
    })

    test('verify favorites', () => {
        localStorage.setItem('favorites','9018,9019');
        render( <Favorites />);
        expect(screen.getAllByRole('list').length).toBe(1);
        localStorage.clear()
    })

    test('verify favorites endpoint is returning expected data', async () => {
        const url = 'https://api.artic.edu/api/v1/artworks/?ids=9018,9019&fields=id,title,artist_title,image_id';
        const response:Artwork[] = await (await axios.get(url)).data.data;
        expect(response.length).toBe(2);
    });
    
    
});