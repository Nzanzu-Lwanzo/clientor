import ClientorBox from "./ui/ClientorBox";
import { ClientorContextProvider } from "./lib/context";

function App() {
  return (
    <ClientorContextProvider>
      <ClientorBox
        handleSubmit={(text) => {
          return text.raw !== "" && text.raw.length > 0;
        }}
        maxContentLength={{
          value: 12,
          handler() {
            console.log("You cannot type no more ");
          },
        }}
        minContentLength={{
          value: 6,
          handler() {
            console.log("You cannot submit");
          },
        }}
        playSounds={{
          onSend: true,
          onError: true,
        }}
      />
    </ClientorContextProvider>
  );
}

export default App;
