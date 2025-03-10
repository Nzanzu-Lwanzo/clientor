import {
  StylerApiConstructor,
  StylerApiImplementation,
} from "../../../types/stylerApi";
import { StyleType } from "../../../types/stylerApi";

export default class ClientorStylerApi implements StylerApiImplementation {
  element: HTMLDivElement | null = null;
  selection: Selection | null = null;
  range: Range | undefined = undefined;

  constructor({ element, cb }: StylerApiConstructor) {
    this.element = element;

    // Listen for selection event
    document.addEventListener("selectionchange", () => {
      const $selection = window.getSelection();
      if (!$selection?.isCollapsed) {
        this.selection = $selection;
        // Execute the callback and get the range
        if (cb) {
          this.range = cb(this.selection);
        }
      }
    });
  }

  handleBold(cb: () => void) {
    this.$globalHandler({
      cb,
      style: "bold",
    });
  }

  handleItalic(cb: () => void) {
    this.$globalHandler({ cb, style: "italic" });
  }

  handleUnderline(cb: () => void) {
    this.$globalHandler({ cb, style: "underline" });
  }

  $globalHandler({ cb, style }: { cb: () => void; style: StyleType }) {
    if (this.range) {
      let tag: HTMLElement | null = null;

      this.$insertSpacesAfterTag();

      switch (style) {
        case "bold": {
          tag = document.createElement("strong");
          break;
        }
        case "italic": {
          tag = document.createElement("i");
          break;
        }
        case "underline": {
          tag = document.createElement("u");
          break;
        }
      }

      if (tag) {
        try {
          this.range.surroundContents(tag); // Can throw an error
          tag.insertAdjacentHTML("afterend", " ");
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      /*
        This callback handles the toggling of the visual state
        of the button. That is, it sets the state that enables
        adding the active class to the button so it become svg:blue
        and bg:kinda-grey.

        We want to add the active state only when the user clicks
        on the button to style the text they're about to type.

        But in case they just want to style the currently
        selected text, we don't want to active to be persisted.
      */
      cb();
    }
  }

  $insertSpacesAfterTag() {}
}
