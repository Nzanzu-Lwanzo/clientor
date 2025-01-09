import ClientorStore from "../../../lib/store";

const SwitchMDXRichText = () => {
  const { mode, setMode } = ClientorStore();

  return (
    <button
      type="button"
      className="square-btn"
      onClick={() => {
        if (mode === "mdx") {
          setMode("rte");
        } else {
          setMode("mdx");
        }
      }}
      disabled
    >
      {mode === "rte" ? "RICH TEXT" : "MARKDOWN"}
    </button>
  );
};

export default SwitchMDXRichText;
