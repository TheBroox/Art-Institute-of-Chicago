import { render, screen } from '@testing-library/react';
import Footer from "./Footer";

describe('Footer component', () => {

    test('verify Brooks Child', () => {
        render( <Footer />);
        const msg = screen.getAllByText('Website designed and coded by Brooks Child.');
        expect(msg).toHaveLength(1);
    })


});