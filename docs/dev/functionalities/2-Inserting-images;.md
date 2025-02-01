# Inserting Images

Clientor allows users to upload images as well as text content. These images must be exposed to the client so they can decide what to do with them. However, what goes on between the time a user clicks on the button to upload images to the time they click on the send button is handled by us.

Images are of two types :

- **Remote images** : the images that are not located on the machine of the user. They're essentially url strings pointing to images hosted somewhere in the cloud (like on Getty, Cloudinary, ...)
- **Local images** : the images that are located on the machine of the user. These will be exposed as **File** objects.

## The Flow

- The user clicks on the **insert image** button in the topbar and is presented with a piece of UI with two icons corresponding to the two types of images :

  - On the right, the icon for the **local images** section.
  - On the left, the icon for the **remote images** section.

1. ### Local images

- The user will be asked to select or drop images.
  Those images will be filtered, validated and stored in a array state in the following form :

```ts
type LocalImageType = {
  file: File;
  id: string;
};

// The id will be used to identify the image
// so we can remove it from the state, for example.
```

- Then they will be looped through and each object of the array will be passed as a prop to a **LocalImagePreviewer** component.

- This component will read the **File** object and produce a data url. This is done in a useEffect hook.

- Then the data url produced will be passed as the src attribute to an image element.

- This element will then be returned by the component function so it can be displayed.

- When the user clicks on an image, the image will be deleted from the state.

- Once the user clicks on **insert** :

  - The images will be stored in an **indexedDb** database so they can be fetched later and preserve their integrity.
  - The images will be formatted into strings to be :

    - Concatenated to the **rawText** and/or the **htmlText** state.
    - Concatenated to the innerHTML of the textarea box so images can be displayed.

  - The state that stored the images array will be emptied out.
  - The images will be converted to strings so they can be displayed in the textarea box.

- When the user double clicks on an image already displayed in the textarea box :

  - This image will be deleted from the indexedDb
  - The string corresponding to this image will be removed from :

    - The textarea box innerHTML
    - The rawText state
    - The htmlText state

- When clicking on the send button :
  - All images present in the indexedDb will be fetched
  - The indexedDb object stores will be emptied
  - The images will be given back as an argument to the **handleSubmit** function (see [ClientorUserContextType interface in the clientorUserContext file ](src\lib\contexts\clientorUserContext.tsx)).
