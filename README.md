# Clientor

## 1. Presentation

Clientor is a versatile **React** package that provides a robust text editor component. It supports both **MDX** and **Rich Text** editing styles, making it ideal for developers who need a flexible and powerful text input solution. Key features include local and remote image insertion with validation, link management, formatting tools, and customizable content length constraints.

## 2. Development Guide

To get started with development on Clientor, follow these steps:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd clientor
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
Start the Vite development server to see the project in action:
```bash
npm run dev
```

### Building for Production
To create a production-ready build:
```bash
npm run build
```

### Linting
To check the code for linting errors:
```bash
npm run lint
```

## 3. How to use

To integrate Clientor into your React application, follow these steps:

### Step 1: Wrap with Providers
Clientor requires two main providers to function correctly: `ClientorUserProvider` (for user-specific configurations and handlers) and `ClientorContextProvider` (for internal editor state).

```tsx
import { ClientorContextProvider } from "./lib/contexts/clientorContext";
import ClientorUserProvider from "./lib/contexts/clientorUserContext";
import ClientorBox from "./ui/ClientorBox";

function App() {
  return (
    <ClientorUserProvider
      handleSubmit={(data) => {
        console.log("Submitted data:", data);
        return data.raw !== "";
      }}
      // Optional: Add other configurations like min/max content length, sounds, etc.
    >
      <ClientorContextProvider>
        <ClientorBox />
      </ClientorContextProvider>
    </ClientorUserProvider>
  );
}
```

### Step 2: Configuration Options
The `ClientorUserProvider` accepts several props to customize the editor's behavior:
- `handleSubmit`: A function called when the user submits the content.
- `maxContentLength`: Define a maximum character limit and a handler for when it's exceeded.
- `minContentLength`: Define a minimum character limit and a handler.
- `playSounds`: Enable/disable sounds for sending or errors.
- `imagesValidate`: Configure validation rules for local and remote images (origins, sizes, etc.).

## 4. Project Structure

The project is organized into several key directories within `src/`:

1. #### `css/`
   Contains all stylesheets. `clientor.css` is the core component styling, while `app.css` is for the development environment.

2. #### `lib/`
   The "factory" of the project. Contains non-JSX logic:
   - `contexts/`: React contexts for state management.
   - `storage/`: Helpers for IndexedDB (`idb.ts`) and Session Storage (`ss.ts`).
   - `hooks.ts` & `useFunctionalities.ts`: Custom hooks for editor logic.
   - `helpers.ts`, `utils.ts`, `types.ts`: Utility functions and type definitions.

3. #### `ui/`
   Contains all React components. The main entry point is `ClientorBox.tsx`.
   - `components/`: Sub-components for different parts of the editor (top toolbar, textarea, bottom bar, preview).

4. #### `clientor.config.ts`
   Defines the default configuration values for the component.

## 5. Components Structure

To maintain consistency, all components in Clientor follow a specific internal structure:

1. **STATES**: Context consumers and local states.
2. **RH**: Standard React hooks (e.g., `useTransition`).
3. **CH**: Custom hooks.
4. **REFS**: Component refs.
5. **FEH**: Functions and Event Handlers.
6. **EFFECTS**: `useEffect` hooks.
7. **IVS**: Intermediary Variables for render logic.
8. **TSX | JSX**: The returned UI.

*Example pattern:*
```tsx
const MyComponent = () => {
  // 1. STATES
  // 2. RH
  // ...
  // 8. TSX
  return <div>...</div>;
};
```

## 6. Collaboration

Clientor is open-source, and we welcome contributions!

### How to Contribute:
1. Join our [Telegram group](https://t.me/+wEnyU9DGJXI5Yjlk) to discuss features.
2. Create a feature branch off of the `develop` branch: `feature/your-feature-name`.
3. Regularly commit with clear messages (max 128 characters).
4. Submit a Pull Request with a clear explanation of your changes.

### Conventions:
- Follow the component structure described above.
- Ensure all parts of your components are properly labeled.
- Do not edit the README directly in your PR unless instructed.

## 7. Third party packages

Clientor leverages the following libraries:

- **lucide-react**: Providing a clean and consistent icon set.
- **marked**: Used for parsing Markdown text into HTML.
- **nanoid**: For generating unique resource identifiers (e.g., image IDs).
- **react** & **react-dom**: The core framework.
