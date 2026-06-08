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
      cb();
    }
  }

  $insertSpacesAfterTag() {}
}
