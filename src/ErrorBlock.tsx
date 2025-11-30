// Import CSS
import errorBlockStyles from './styles/ErrorBlock.module.css'

// Constructor
export default function ErrorBlock({message}:{message:string}){
    // Default message mapping
    interface ErrorMessageMap {
        [key: string]: string
    }

    const stockMessages:ErrorMessageMap = {
        async : 'Apologies, something has gone wrong. Check your connection and refresh the app.',
        noFavorites : "You don't have any favorites yet. Dive into the gallery and find what speaks to you."
    }

    // Renderer
    return (
        <div className={errorBlockStyles.errorBlock}>
           { stockMessages[message] ? stockMessages[message] : message }
        </div>
    );
}