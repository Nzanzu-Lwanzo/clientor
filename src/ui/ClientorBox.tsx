import "../css/clientor.css";
import Top from "./components/top/_index";
import Bottom from "./components/bottom/_index";
import Textarea from "./components/textarea/_index";
import { ClientorContextProvider } from "../lib/context";

interface ClientorBoxProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, text: string) => true;
}

const ClientorBox = ({ handleSubmit }: ClientorBoxProps) => {
  return (
    <ClientorContextProvider>
      <form
        id="clientor-main-container"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, "");
        }}
      >
        <Top />
        <Textarea />
        <Bottom />
      </form>
    </ClientorContextProvider>
  );
};

export default ClientorBox;
