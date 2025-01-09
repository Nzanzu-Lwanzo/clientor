import ClientorBox from "./ui/ClientorBox";

function App() {
  return (
    <>
      <ClientorBox
        handleSubmit={() => {
          return true;
        }}
      />
    </>
  );
}

export default App;
