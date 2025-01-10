# About Clientor

Clientor is a **React** package that exposes a text editor component. This component, verbosely called **Clientor**, supports both **MDX** and **Rich Text** editor styles.

# Project Structure

All the codes lives inside of the src folder which contains three subfolders.

1. ### css

   This folder contains all the stylesheets of the project. In developement mode, we have 2 main files inside of it : [clientor.css](src/css/clientor.css) and [app.css](src/css/app.css).

   The first file contains all the css related to the component itself and the second contains the css to style the whole page in developement.

   The **app.css** should not be included in the build.

2. ### lib

   This folder can be considered as the project factory. All the code no related to the JSX syntax (I mean, not components stuff) should live inside of here. Things like **contexts**, **stores**, **helpers**, **formatters**, ...

3. ### ui

   This is the folder where live the components and only the components. The main component exposed by the package lives in this file : [ClientorBox.tsx](src/ui/ClientorBox.tsx)
