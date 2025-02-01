import useFunctionalities from "../../../../lib/useFunctionalities";
import IconBtn from "../../_general/IconBtn";
import { AtSign } from "lucide-react";

const AtTag = () => {
  // CH
  const {
    reference: { toggler },
  } = useFunctionalities();

  // const users = [
  //   { id: 1, name: "John Doe" },
  //   { id: 2, name: "Jane Doe" },
  //   { id: 3, name: "Marcus Garvey" },
  //   { id: 4, name: "Lumumba" },
  //   { id: 5, name: "2Pac Shakur" },
  //   { id: 6, name: "Dr Dre" },
  //   { id: 7, name: "Tshisekedi" },
  //   { id: 8, name: "Mamadou Ndala" },
  // ];

  return (
    <IconBtn type="button" handleClick={toggler} editMode="$reference">
      <AtSign size={19} />
      <div className="floating">
        <div className="contains-input">
          <input
            type="search"
            placeholder="@some_id_to_search_by"
            id="search"
            name="search"
          />
        </div>
        <ul className="list-references"></ul>
      </div>
    </IconBtn>
  );
};

export default AtTag;
