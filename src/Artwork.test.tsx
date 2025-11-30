import { render, screen, fireEvent } from '@testing-library/react';
import Artwork from "./Artwork";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Import and retain actual exports
    useParams: jest.fn(() => ({
        artworkId: '9018',
    })),
}));

describe('Artwork component', () => {

    test('verify favorite functionality', done => {
        localStorage.clear()
        render(<Artwork/>);
        setTimeout(() => {
            expect(screen.getAllByText('♥ Favorite').length).toBe(1);
            const favBtn = screen.getByRole('button');
            fireEvent.click(favBtn);
            expect(localStorage.getItem('favorites')).toBe('9018');
            expect(screen.getAllByText('Unfavorite').length).toBe(1);
            localStorage.clear()
            done();
        },800);
    });

    test('verify unfavorite functionality', done => {
        localStorage.setItem('favorites','9018');
        render(<Artwork/>);
        setTimeout(() => {
            expect(screen.getAllByText('Unfavorite').length).toBe(1);
            expect(localStorage.getItem('favorites')).toBe('9018');
            const favBtn = screen.getByRole('button');
            fireEvent.click(favBtn);
            expect(localStorage.getItem('favorites')).toBeNull();
            expect(screen.getAllByText('♥ Favorite').length).toBe(1);
            localStorage.clear()
            done();
        },800);
    });
    
    test('renders art details when passed a valid URL param', done => {
        render(<Artwork/>);
        setTimeout(() => {
            const artist = screen.getAllByText('Gabriele Münter German, 1877–1962');
            expect(artist).toHaveLength(1);
            const title = screen.getAllByText('Still Life with Queen');
            expect(title).toHaveLength(1);
            const date = screen.getAllByText('1912');
            expect(date).toHaveLength(1);
            const materials = screen.getAllByText('Oil on canvas');
            expect(materials).toHaveLength(1);
            done();
        },800);
    });

    test('renders an error message when passed invalid URL param', done => {
        const useParams = require('react-router-dom').useParams;
        useParams.mockReturnValue({ artworkId: 'blarg' });
        render(<Artwork/>);
        setTimeout(() => {
            const error = screen.getAllByTitle('error');
            expect(error).toHaveLength(1);
            done();
        },800);
    });

});