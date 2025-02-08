import IconBtn from "../../_general/IconBtn";
import { AtSign } from "lucide-react";
import Loader from "../../_general/Loader";
import { useRef } from "react";
import { useClientorUserContext } from "../../../../lib/contexts/clientorUserContext";
import useReference from "../../../../lib/functionalities/references";
import ClientorDefaultConfiguration from "../../../../clientor.config";

const LiElement = ({
  label,
  onClick,
}: {
  label: string;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}) => {
  return <li onClick={onClick}>@{label}</li>;
};

const AtTag = () => {
  // STATE

  /*
    Merge the option values passed through the context provider
    with the default option values.
  */
  const { label: refLabel } = Object.assign(
    useClientorUserContext().references || {},
    ClientorDefaultConfiguration.referenceOptions
  );

  // RH
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // CH
  const {
    toggler,
    getRefs,
    refs,
    handleFeature,
    loadingRefs,
    updatingRefsState,
  } = useReference();

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
            ref={searchInputRef}
          />
        </div>
        <ul className="list-references">
          {loadingRefs === "loading" || updatingRefsState ? (
            <Loader />
          ) : (
            <>
              {refs.length === 0 ? (
                <span style={{ display: "inline-block", textAlign: "center" }}>
                  No reference found !
                </span>
              ) : (
                refs.map((_ref) => {
                  return (
                    <LiElement
                      key={(_ref as any).id}
                      onClick={() => {
                        handleFeature((_ref as any).id, searchInputRef.current);
                      }}
                      label={_ref[refLabel!]}
                    />
                  );
                })
              )}
            </>
          )}
        </ul>
      </div>
    </IconBtn>
  );
};

export default AtTag;
