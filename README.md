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

4. ### useFunctionalities

   This is **one** of the core files of the package. It exposes a unique [hook](src/lib/useFunctionalities.ts) that handles all the functionalities of the component from toggling the visibility of the buttons to inserting or formatting. That's the place to define the behavior of the different features of the component.

## TODO

- When I click insert images, I'm emptying the states to avoid duplication on further selection and insertion. This was just temporary, I must handle this properly.
- Test if image validation is working fine.

## ISSUES

- When inserting an Anchor tag in the textarea innerHTML I'm getting a p tag inserted instead. Is it a security measure implemented by the browser to avoid some sort of attacks ?
