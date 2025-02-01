## Introduction

All the functionalities behavior live inside of one [file](src\lib\useFunctionalities.ts). This file default exports a hook named **useFunctionalities**. This hook returns an object. And the properties of this object correspond to the functionalities to actually implement.

These properties hold, at their turn, an object that must be at least in one of the two cases below :

- **Case 1** : If there's no much things to do, the object will only hold a function named **handleFeature**.
- **Case 2** : In case we must handle at the same time some state (for changing the visibility of the button, for example) and the actual functionality, the object will contain two functions : **toggler** for the state and **handleFeature** for the functionality.

Choosing either one depends upon the feeling of the developer and wether they think that's the better way to go about it. Some functionalities will require to separately handle the states and the actual functionality (like inserting images or links) while others won't (like deleting everything).

```tsx
export default function useFunctionalities() {
  // ...
  return {
    deleteAll: {
      handleFeature: () => {
        return "This is case 1";
      },
    },
    insertImage: {
      toggler: () => {
        return "This is case 2";
      },
      handleFeature: () => {
        return "This is case 2 too";
      },
    },
  };
}
```
