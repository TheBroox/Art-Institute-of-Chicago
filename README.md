# Art Institute of Chicago SPA

After a bit of research into public APIs, I settled on using the [Art Institute of Chicago's (AIC) API](https://api.artic.edu/docs/) for my code challenge. It exposes the entire collection of the Institute, both metadata about the pieces as well as images of every piece. <sup>*</sup>

<small><sub>* It turns out that there are quite a few broken/missing image in their database unfortunately. If you happen to stumble across them please accept my apologies and let me encourage you to randomize the gallery again.</sub></small>

## Install

After pulling down the repo all you need to do to get the app running is to do an `npm install` and then either `npm run dev` or `npm run build` depending on how you would like to serve it. The testing suite can be run via `npm run test`.

## Design Decisions

### "Persistent" Storage

Rather than stand up a database I chose to instead keep track of the user's favorites via `LocalStorage`. It works quite well as a stand in for demonstrative purposes.

### Black & White Design Language

I took inspiration from AIC's own design language, as established by their logo and website, and choose to primarily used black, whites and greys. I assume my reasoning is the same as theirs; by keeping everything else muted the art is able to stand out more and therefore is the focus of the user. The website doesn't compete with the collection for the user's attention.

## Features

The single page app allows users to explore the collection via four main features, highlighted below.

### Featured Artworks

The AIC highlights twelve pieces in the collection at any given time. The entire set of twelve rotates a few times every 24 hours based on my observations but the duration that each set is featured doesn't seem to follow a regular pattern. The "Featured" page of the SPA is a gallery wall allows users to see the IAC's currently spotlighted pieces.

### Exploring the Gallery

The AIC asks that you don't query more than 100 pieces of art at a time. Therefore, to allow users to explore the entire collection, the SPA features simple search functionality as well as the ability to see a random set of 100-ish pieces (those with `null` links get dropped by the SPA) of art via the "Gallery" page.

### Saving Favorites

From the artwork detail pages users can favorite pieces of art in the collection. Those pieces are then displayed on the "Favorites" page. Additionally, favorite pieces of art on the "Featured" and "Gallery" pages have small indicators in their lower right corners.

### Artwork Details

If a user clicks on a piece of art on the "Featured", "Gallery" or "Favorites" pages then they go to the piece's details page. This features a larger image of the piece as well as it's metadata, presented in a format that is meant to be reminiscent of museum's attribution placard.