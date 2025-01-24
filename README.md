# About Clientor

Clientor is a **React** package that exposes a text editor component. This component, verbosely called **Clientor**, supports both **MDX** and **Rich Text** editor styles.

## Project Structure

All the code lives inside of the src folder which contains three subfolders.

1. #### css

   This folder contains all the stylesheets of the project. In developement mode, we have 2 main files inside of it : [clientor.css](src/css/clientor.css) and [app.css](src/css/app.css).

   The first file contains all the css related to the component itself and the second contains the css to style the whole page in developement.

   The **app.css** should not be included in the build.

2. #### lib

   This folder can be considered as the project factory. All the code no related to the JSX syntax (I mean, no component stuff) should live inside of here. Things like **contexts**, **stores**, **helpers**, **formatters**, ...

3. #### ui

   This is the folder where live the components and only the components. The main component exposed by the package lives in this file : [ClientorBox.tsx](src/ui/ClientorBox.tsx)

4. #### useFunctionalities

   This is **one** of the core files of the package. It exposes a unique [hook](src/lib/useFunctionalities.ts) that handles all the functionalities of the component from toggling the visibility of the buttons to inserting or formatting. That's the place to define the behavior of the different features of the component.

5. #### clientor.config.ts

    This [file](src/clientor.config.ts) contains the default configuration values defined for a Clientor component. They should be overridable by the user configuration values. 

6. #### clientorUserContext.tsx

    This file contains a context exposed along with the ClientorBox component itself. All the configurations a user should provide to have a control on the behavior of the component should be passed to this context so they can be accessed in all the components.
    Not be confused with the __clientorContext.tsx__. This is the context used internally. 

## Components structure

All the components should follow the following pattern to maintain consistentcy throughout the project and make debugging a brease.

1. STATES & CONTEXT CONSUMMERS & STORES alias **STATES**
2. REACT HOOKS alias **RH**
3. CUSTOM HOOKS alias **CH**
4. REFS alias **REFS**
5. FUNCTIONS AND EVENT HANDLERS alias **FEH**
6. EFFECTS alias **EFFECTS**
7. INTERMEDIARY VARIABLES alias **IVS**
8. TSX | JSX

Each part should be labelled to serve as a landmark, except the last one which is optional. Refer to the following example :

```tsx
const Component = () => {
  // 1. STATES
  const [state, setState] = useState(true);
  const { data, auth } = useContext(SomeContext);
  const addNewToList = useSomeStore((state) => state.addNewToList);

   // 2. RH
  const [transition,startTransition] = useTransition(()=>{
   // ...
  })

  // 3. CH
  const { handleClick, loading } = useCustomHook();

  // 4. REFS
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // 5. FEH
  const handleResponseData = (resData) => {
    if (resData.user.id === auth.id) {
      addNewToList(resData);
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  // 6. EFFECTS
  useEffect(() => {
    setState(false);

    const button = buttonRef.current;

    if (button) {
      button.addEventListener("mouseover", async function (e) {
        try {
          const response = await fetch("https://api.com/data", {
            body: JSON.stringify(data),
            method: "POST",
            mode: "cors",
          });

          if (response.ok) {
            handleResponseData(await response.json());
          }
        } catch (e) {
          handleError(e);
        }
      });
    }
  }, []);

  //   7. IVS
  let buttonLabel = loading ? "Wait ..." : "Create"

  // 8. TSX | JSX

  return (
    <>
      <button ref={buttonRef} onClick={handleClick} disabled={loading}>
        {buttonLabel}
      </button>
    </>
  );
};
```

## Collaboration

As the project is open source, we're actively encouraging people to collaborate. If you're interested, here you got listed the steps to follow and all the conventions to watch.

1. #### Steps

- Join our [Telegram group](https://t.me/+wEnyU9DGJXI5Yjlk) and tell the functionality you want to work on. 

- Create a branch off of the **develop** branch for the feature you're going to add. 

- Fork or clone the **develop** branch of the repository and start working. Don't hesitate to reach out to the community in case you need any help, have any questions or any suggestions. Here's our [Telegram group invitation link](https://t.me/+wEnyU9DGJXI5Yjlk).

- Regularly commit when you hit a milestone in the developement process with simple, short but clear and self-explanatory messages (not more than 128 characters).

- Once you have a usable version of what you're working on, make a pull request with a clear explanation of how the functionnality works and what files or parts of the project are concerned. 

2. #### Conventions

- The branches should follow this naming convention :
```txt
  feature/feature-name
```
**feature-name** being the name of the feature you want to work on (bold,underline,insert images, ...)

- Commit messages should not be more than 128 characters length.
- Components should follow the structure described above and each part should be labelled.
- Don't edit the README file. This file will be being edited only when the code proposed in a pull request has been adopted and merged with the **develop** branch code. 

## Third party packages used

```json

  // This comes from the package.json file

  "dependencies": {
    "lucide-react": "^0.469.0",
    "marked": "^15.0.6",
    "nanoid": "^5.0.9",
  },

```

1. **lucide-react** : for the icons
2. **marked** : to parse the markdown text
3. **nanoid** : to generate unique ids for ressources like the images