
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Collection from "./Collection";


describe('Collection component', () => {

    test('renders an error message when passed invalid link', done => {
        render(<Collection url="https://api.artic.edu/api/v1/artworks/blarg"/>);
        setTimeout(() => {
            const error = screen.getAllByTitle('error');
            expect(error).toHaveLength(1);
            done();
        },400);
    });

    test('renders thumbnails when passed invalid link', done => {
        render(<MemoryRouter><Collection url="https://api.artic.edu/api/v1/artworks/?fields=id,title,artist_title,image_id" /></MemoryRouter>);
        setTimeout(() => {
            const numThumbnails = screen.getAllByTitle('thumbnail').length;
            expect(numThumbnails).toBeGreaterThanOrEqual(1);
            done();
        },400);

    });

});