## TODO

- After inserting a link or an image, the prompt should automatically be placed at the end so the user can start typing without clicking first in the textarea box to give it a focus again.

- Insert links, images and references, not only at the end of the innerHTML, but wherever the user places their prompt (search for TODO) in the [insertLinks](src\lib\functionalities\insertLinks.ts) functionality file.

## BUG FIXES

## NOTES

- In case you rollback to commit **a609c00c83e4d7c0ba0774920f23b6e080331e65**, don't forget to fix this :
  - Make sure that you reset the countImagesInDb state to zero when the user deletes everything using the deleteAll functionality and buttons.
  - Add an empty array dependency to the second useEffect of this [component (the Textarea)](src\ui\components\textarea_index.tsx)
