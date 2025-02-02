import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { AtSign } from "lucide-react";

type MockUser = { id: number; name: string };

const LiElement = ({
  _ref,
  onClick,
}: {
  _ref: unknown;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}) => {
  return <li onClick={onClick}>@{(_ref as MockUser).name}</li>;
};

const AtTag = () => {
  // CH
  const {
    reference: { toggler, getRefs, refs, handleFeature },
  } = useFunctionalities();

  return (
    <IconBtn type="button" handleClick={toggler} editMode="$reference">
      <AtSign size={19} />
      <div className="floating">
        <div className="contains-input">
          <input
            type="search"
            placeholder="@type_to_search"
            id="search"
            name="search"
            onChange={getRefs}
          />
        </div>
        <ul className="list-references">
          {refs.map((_ref) => {
            return (
              <LiElement
                key={(_ref as MockUser).id}
                onClick={() => {
                  handleFeature((_ref as MockUser).id);
                }}
                _ref={_ref}
              />
            );
          })}
        </ul>
      </div>
    </IconBtn>
  );
};

export default AtTag;
