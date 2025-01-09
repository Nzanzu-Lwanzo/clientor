import { useCallback } from "react";

const Textarea = () => {

  const handleTyping = useCallback((event: React.FormEvent<HTMLDivElement>)=>{
    console.log(event.currentTarget.innerText)
  },[])

  return (
    <div id="textarea">
      <div
        id="text"
        contentEditable
        onInput={handleTyping}
      ></div>
    </div>
  );
};

export default Textarea;
