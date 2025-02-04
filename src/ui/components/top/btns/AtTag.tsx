import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { AtSign } from "lucide-react";
import Loader from "../../_general/Loader";
import { useRef } from "react";
import { useClientorUserContext } from "../../../../lib/contexts/clientorUserContext";

export type MockUser = { id: number; name: string };

const LiElement = ({
  _ref,
  onClick,
}: {
  _ref: unknown;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}) => {
  const {
    references: { label: refLabel },
  } = useClientorUserContext();
  return <li onClick={onClick}>@{(_ref as any)[refLabel!]}</li>;
};

const AtTag = () => {
  // RH
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // CH
  const {
    reference: {
      toggler,
      getRefs,
      refs,
      handleFeature,
      loadingRefs,
      updatingRefsState,
    },
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
                      key={(_ref as MockUser).id}
                      onClick={() => {
                        handleFeature(
                          (_ref as MockUser).id,
                          searchInputRef.current
                        );
                      }}
                      _ref={_ref}
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
