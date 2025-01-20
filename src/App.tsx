import ClientorBox from "./ui/ClientorBox";
import { ClientorContextProvider } from "./lib/context";

function App() {
  return (
    <ClientorContextProvider>
      <ClientorBox
        handleSubmit={(text) => {
          console.log(text);
          return text.raw !== "" && text.raw.length > 0;
        }}
        maxContentLength={{
          value: 12,
          handler() {
            console.log(
              "You cannot type no more because max content length is 12 "
            );
          },
        }}
        minContentLength={{
          value: 6,
          handler() {
            console.log("You cannot submit because min content length is 6");
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
