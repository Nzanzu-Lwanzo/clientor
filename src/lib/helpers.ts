export function getSelectionData() {
  const selection = window.getSelection();

  if (selection?.isCollapsed || !selection) {
    return;
  }

  if (selection) {
    /*
      selection.anchorOffset alias "aof" is where the selection starts
      selection.focusOffset alias "fof" is where the selection ends.

      If you select from the end of the word to its start,
      aof will be > to fof.

      If you select from the beginning of a word to its end,
      fof will be > to aof.

      In case, we want the start index to be < to the end index,
      that's why we compare those values below using 
      the Math.max and Math.min

    */
    let selectionStartPosition = selection.anchorOffset;
    let selectionEndPosition = selection.focusOffset;

    let selectedText = selection.toString();
    return {
      selectedText,
      selectionStartPosition: Math.min(
        selectionStartPosition,
        selectionEndPosition
      ),
      selectionEndPosition: Math.max(
        selectionStartPosition,
        selectionEndPosition
      ),
    };
  }
}

export function getElementWithNewTag({
  tag,
  textarea,
}: {
  tag: string;
  textarea: HTMLDivElement;
}) {
  const selection = getSelectionData();

  if (selection) {
    const boldText = `<${tag}>${selection.selectedText}</${tag}> `;
    let innerHTML = textarea.innerHTML;
    let updatedInnerHTML = innerHTML.replace(selection.selectedText, boldText);

    // Insert the updated innerHTML string in the textarea element
    // so the elements look directly styled
    textarea.innerHTML = updatedInnerHTML;

    // Return the updated innerHTML so the user can do something with it
    // like updating the states
    return updatedInnerHTML;
  }
}

export function bytesToMB(bytes: number) {
  return bytes / (1024 * 1024);
}

export function validateURL(url: string, schema: "http" | "https") {
  const httpsRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/i;
  const httpRegex = /^(http?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/i;

  switch (schema) {
    case "https": {
      return httpsRegex.test(url);
    }

    case "http": {
      return httpRegex.test(url);
    }
  }
}
