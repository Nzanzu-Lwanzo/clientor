import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { Link } from "lucide-react";

const InsertLink = () => {
  // CH
  const {
    insertLink: { toggler, handleFeature },
  } = useFunctionalities();

  return (
    <IconBtn type="button" handleClick={toggler} editMode="$ins_link">
      <Link size={19} />
      <form className="floating" onSubmit={handleFeature}>
        <div className="contains-input">
          <label htmlFor="link">Link</label>
          <input
            type="url"
            placeholder="https | http | *"
            id="link"
            name="link"
            required
          />
        </div>
        <div className="contains-input">
          <label htmlFor="label">Label</label>
          <input
            type="text"
            id="label"
            placeholder="Link label (optional)"
            name="label"
          />
        </div>
        <div className="contains-input">
          <label htmlFor="label">Target</label>
          <input
            type="text"
            id="label"
            placeholder="blank | parent | top "
            name="target"
          />
        </div>
        <button className="btn">Insert</button>
      </form>
    </IconBtn>
  );
};

export default InsertLink;
