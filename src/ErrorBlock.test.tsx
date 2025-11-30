import { render, screen } from '@testing-library/react';
import ErrorBlock from "./ErrorBlock";

describe('ErroBlock component', () => {

    test('verify async error', () => {
        render( <ErrorBlock message="async" />);
        const msg = screen.getAllByText('Apologies, something has gone wrong. Check your connection and refresh the app.');
        expect(msg).toHaveLength(1);
    })

    test('verify no favorites error', () => {
        render( <ErrorBlock message="noFavorites" />);
        const msg = screen.getAllByText("You don't have any favorites yet. Dive into the gallery and find what speaks to you.");
        expect(msg).toHaveLength(1);
    })

    test('verify arbitrary error', () => {
        render( <ErrorBlock message="blarg" />);
        const msg = screen.getAllByText("blarg");
        expect(msg).toHaveLength(1);
    })

});