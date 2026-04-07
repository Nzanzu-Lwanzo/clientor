# TODO

## General Improvements
- [ ] **Image Insertion State:** Currently, image states are emptied after insertion to avoid duplication. This is a temporary fix; implement a more robust way to handle multiple selections and insertions. (Ref: `src/lib/useFunctionalities.ts`)
- [ ] **Style Management:** Consider unapplying all styles when the user unfocuses or finishes typing. (Ref: `src/lib/contexts/clientorContext.tsx`)
- [ ] **Image Validation:** Thoroughly test if the image validation logic (origins, size, etc.) is working as expected.

## Features & Bug Fixes
- [ ] **IDB Image Deletion:** On double-click to delete an image from the textarea, ensure it is also removed from the IndexedDB database. (Ref: `src/ui/components/textarea/_index.tsx`)
- [ ] **HTML Injection Issue:** Investigate why inserting an `<a>` tag into the textarea's `innerHTML` results in a `<p>` tag instead. Determine if this is a browser security measure or a bug in the insertion logic.

## Technical Debt
- [ ] Review and clean up hardcoded examples in `App.tsx` (e.g., `allowOrigins`, `banOrigins`).
- [ ] Ensure consistent use of `RH`, `FEH`, `EFFECTS`, etc., labels across all components as per the documentation.
