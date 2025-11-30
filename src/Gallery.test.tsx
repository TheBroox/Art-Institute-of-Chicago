import { render, screen, fireEvent } from '@testing-library/react';
import App from "./App";
import Gallery from "./Gallery";
import axios from 'axios';
import {Artwork} from './definitions/artwork.model'

describe('Gallery component', () => {

    test('verify routing', () => {
        render(<App/>);
        const nav = screen.getByText('Gallery');
        fireEvent.click(nav);
        expect(screen.getAllByText('Randomized Gallery Selection').length).toBe(1);
    });

    test('verify collection', () => {
        render( <Gallery />);
        expect(screen.getAllByRole('list').length).toBe(1);
    });

    test('verify title change', () => {
        render( <Gallery />);
        const search = screen.getByDisplayValue('');
        fireEvent.change(search, { target: { value: 'blarg' } })
        const submit = screen.getByText('Search');
        fireEvent.click(submit);
        expect(screen.getAllByText('Gallery Search Results For "blarg"').length).toBe(1);
        const randomizeBtn = screen.getByText('Randomize Selection');
        fireEvent.click(randomizeBtn);
        expect(screen.getAllByText('Randomized Gallery Selection').length).toBe(1);
    });
    const fieldsString = 'fields=id,title,artist_title,image_id'

    test('verify random endpoint is returning expected data', async () => {
        const url = `https://api.artic.edu/api/v1/artworks/?page=1&limit=100&${fieldsString}`;
        const response:Artwork[] = await (await axios.get(url)).data.data;
        expect(response.length).toBeGreaterThan(1);
    });

    test('verify search endpoint is returning expected data', async () => {
        const url = `https://api.artic.edu/api/v1/artworks/search?q=blarg&${fieldsString}`;
        const response:Artwork[] = await (await axios.get(url)).data.data;
        expect(response.length).toBeGreaterThan(1);
    });


    
});