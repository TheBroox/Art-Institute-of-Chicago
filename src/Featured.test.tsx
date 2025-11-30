import { render, screen, fireEvent } from '@testing-library/react';
import App from "./App";
import Featured from "./Featured";
import axios from 'axios';
import {Artwork} from './definitions/artwork.model'

describe('Featured component', () => {

    test('verify routing', () => {
        render(<App/>);
        const nav = screen.getByText('Featured');
        fireEvent.click(nav);
        expect(screen.getAllByText('Featured Artwork').length).toBe(1);
    });

    test('verify collection', () => {
        render( <Featured />);
        expect(screen.getAllByRole('list').length).toBe(1);
    });

    test('verify featured endpoint is returning expected data', async () => {
        const url = 'https://api.artic.edu/api/v1/artworks/?fields=id,title,artist_title,image_id';
        const response:Artwork[] = await (await axios.get(url)).data.data;
        expect(response.length).toBeGreaterThan(1);
    });
    
});