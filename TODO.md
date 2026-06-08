## DONE

- [x] After inserting a link or an image, the prompt should automatically be placed at the end so the user can start typing without clicking first in the textarea box to give it a focus again.

- [x] Insert links, images and references, not only at the end of the innerHTML, but wherever the user places their prompt (search for TODO) in the [insertLinks](src\lib\functionalities\insertLinks.ts) functionality file.

## BUG FIXES

- [x] Fixed Italic button calling handleUnderline.
- [x] Added empty array dependency to the second useEffect of the Textarea component.
- [x] Reset countImagesInDb state to zero when using deleteAll.

## NEW FEATURES

- [x] Implemented Headings functionality.
- [x] Implemented Lists functionality.
- [x] Added MDX support for all styling buttons (Bold, Italic, Underline, Headings, Lists).
