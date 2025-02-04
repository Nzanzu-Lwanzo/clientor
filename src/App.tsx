import ClientorBox from "./ui/ClientorBox";
import { ClientorContextProvider } from "./lib/contexts/clientorContext";
import ClientorUserProvider from "./lib/contexts/clientorUserContext";
import { MockUser } from "./ui/components/top/btns/AtTag";

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
      references={{
        request(hint) {
          return new Promise((resolve) => {
            const users = [
              { id: 1, name: "John Doe" },
              { id: 2, name: "Jane Doe" },
              {
                id: 3,
                name: "Marcus Garvey",
                absolute_url: `https://www.backend.tech/user/absolute-url`,
              },
              { id: 4, name: "Lumumba" },
              { id: 5, name: "2Pac Shakur" },
              { id: 6, name: "Dr Dre" },
              { id: 7, name: "Tshisekedi" },
              { id: 8, name: "Mamadou Ndala" },
            ];

            // Simulate a Network request that takes
            // 1.5 seconds to return a response
            setTimeout(
              () =>
                resolve(
                  users.filter((_ref) =>
                    _ref.name.toLowerCase().includes(hint.toLowerCase())
                  )
                ),
              1500
            );
          });
        },
        // label: "name",
        formatURL(_ref) {
          const reference = _ref as MockUser;

          return `https://www.backend.tech/user/${reference.name}/${reference.id}`;
        },
        // id: "id",
      }}
    >
      <ClientorContextProvider>
        <ClientorBox />
      </ClientorContextProvider>
    </ClientorUserProvider>
  );
}

export default App;
