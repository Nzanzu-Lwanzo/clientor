## TODO

- From [this file (AtTag.tsx)](src\ui\components\top\btns\AtTag.tsx) as well as [this file (useFunctionalities.tsx)](src\lib\useFunctionalities.ts) and [this file too (App.tsx)](src\App.tsx), remove all references to MockUser type and leave the unkown type for safety
- After inserting a link or an image, the prompt should automatically be placed at the end so the user can start typing without clicking first in the textarea box to give it a focus again.
- What's the use of the **htmlText** state if, on submit, we can just get the **innerHTML** of the div that serves as textarea ? Should I **remove** it ? DEFINITELY YESSSSSS ! REMOVE THE htmlText state. BUT NO, wait. It might be useful for the other functionalities like bolding or underlining text.

## BUG FIXES

