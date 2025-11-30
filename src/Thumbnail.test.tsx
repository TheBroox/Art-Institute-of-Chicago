import { render, screen } from '@testing-library/react';
import Thumbnail from "./Thumbnail";

import {Artwork} from './definitions/artwork.model'
import { MemoryRouter } from 'react-router';

const artwork:Artwork = {id: 9018, title: 'Still Life with Queen', artist_title: 'Gabriele Münter', image_id: '6b5916ab-baa7-caa0-fcc2-314f6ec268bc'};

describe('Thumbnail component', () => {

    test('construct img tag with appropriate alt text', () => {
        render( <MemoryRouter><Thumbnail artwork={artwork} highlightFavorites={true} /></MemoryRouter>);
        const image = screen.getAllByAltText('Still Life with Queen by Gabriele Münter');
        expect(image).toHaveLength(1);
    })

    test("verify favorite icon shows on favorited artwork", () => {
        localStorage.setItem('favorites','9018')
        render( <MemoryRouter><Thumbnail artwork={artwork} highlightFavorites={true} /></MemoryRouter>);
        const fav = screen.getAllByTestId('favorite');
        expect(fav).toHaveLength(1);
    })

    test("verify favorite icon doesn't shows on non-favorited artwork", () => {
        localStorage.clear()
        render( <MemoryRouter><Thumbnail artwork={artwork} highlightFavorites={true} /></MemoryRouter>);
        const fav = screen.queryAllByTestId('favorite');
        expect(fav).toHaveLength(0);
    })

});