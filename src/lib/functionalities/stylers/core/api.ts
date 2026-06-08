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
      if ($selection && !$selection.isCollapsed) {
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

  handleHeading(level: number, cb: () => void) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.range = selection.getRangeAt(0);
    }

    if (this.range) {
      const tag = document.createElement(`h${level}`);
      try {
        this.range.surroundContents(tag);
        tag.insertAdjacentHTML("afterend", "<br>");
      } catch (e) {
        console.log(e);
      }
    } else {
      cb();
    }
  }

  handleList(type: "unordered" | "ordered", cb: () => void) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.range = selection.getRangeAt(0);
    }

    if (this.range) {
      const listTag = document.createElement(type === "unordered" ? "ul" : "ol");
      const listItem = document.createElement("li");
      try {
        this.range.surroundContents(listItem);
        listTag.appendChild(listItem);
        this.range.insertNode(listTag);
      } catch (e) {
        console.log(e);
      }
    } else {
      cb();
    }
  }

  $globalHandler({ cb, style }: { cb: () => void; style: StyleType }) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.range = selection.getRangeAt(0);
    }

    if (this.range) {
      // Requirement 2: Toggle style
      // We use execCommand because it handles toggling (adding/removing) 
      // styles automatically and robustly across complex selections.
      document.execCommand(style, false);
      
      // Update raw text state
      if (this.element) {
        cb(); // In this context, we call cb to signal potential state update needs
      }
    } else {
      cb();
    }
  }

  $insertSpacesAfterTag() {}
}
