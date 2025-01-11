import ClientorBox from "./ui/ClientorBox";
import { ClientorContextProvider } from "./lib/context";

function App() {
  return (
    <ClientorContextProvider>
      <ClientorBox
        handleSubmit={(text) => {
          console.log(text);

          return true;
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
      />
    </ClientorContextProvider>
  );
}

export default App;
