// Import CSS
import footerStyles from './styles/Footer.module.css';

// Constructor
export default function Footer(){
    // Renderer
    return (
        <div className={footerStyles.footer}>
            Website designed and coded by Brooks Child.
        </div>
    );
}