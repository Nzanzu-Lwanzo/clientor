import { useShowOneMenuAtATime } from "../../../../lib/hooks";
import IconBtn from "../../_general/IconBtn";
import { Link } from "lucide-react";

const InsertLink = () => {
  const toggler = useShowOneMenuAtATime();

  return (
    <IconBtn
      type="button"
      handleClick={() => toggler("$ins_link")}
      editMode="$ins_link"
    >
      <Link size={19} />
      <div className="floating">
        <div className="contains-input">
          <label htmlFor="link">Link</label>
          <input type="url" placeholder="https | http | *" id="link" />
        </div>
        <div className="contains-input">
          <label htmlFor="label">Label</label>
          <input type="text" id="label" placeholder="Link label (optional)" />
        </div>
        <div className="contains-input">
          <label htmlFor="label">Target</label>
          <input type="text" id="label" placeholder="blank | parent | top " />
        </div>
        <button type="button" className="btn">Insert</button>
      </div>
    </IconBtn>
  );
};

export default InsertLink;
