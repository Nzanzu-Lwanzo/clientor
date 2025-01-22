import ClientorBox from "./ui/ClientorBox";
import { ClientorContextProvider } from "./lib/contexts/clientorContext";
import ClientorUserProvider from "./lib/contexts/clientorUserContext";

function App() {
  return (
    <ClientorUserProvider
      handleSubmit={(data) => {
        console.log(data);
        return data.raw !== "" && data.raw.length > 0;
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
      imagesValidate={{
        remote: {
          allowOrigins: ["https://getty.images.com"],
          banOrigins: ["http://localhost:8000/"],
          allowHttpImages: true,
        },
        local: {},
      }}
    >
      <ClientorContextProvider>
        <ClientorBox />
      </ClientorContextProvider>
    </ClientorUserProvider>
  );
}

export default App;
