export function getSelectionData() {
  const selection = window.getSelection();

  if (selection?.isCollapsed || !selection) {
    return;
  }

  if (selection) {
    let selectionStartPosition = selection.anchorOffset;
    let selectionEndPosition = selection.focusOffset;
    let selectedText = selection.toString();
    return { selectedText, selectionStartPosition, selectionEndPosition };
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
