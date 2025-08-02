# React Smart Dialogue

A customizable and accessible dialogue component for React applications with TypeScript support and Tailwind CSS styling.

## Features

- 🎨 **Fully Customizable** - Style with Tailwind CSS classes
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- ♿ **Accessible** - ARIA compliant with proper focus management
- 🪝 **Hook Support** - Promise-based dialogue with `useDialogue` hook
- 🌐 **Provider Pattern** - Global dialogue management with `DialogueProvider`
- 📱 **Responsive** - Works on all screen sizes
- 🎯 **Lightweight** - Minimal dependencies

## Installation

```bash
npm install react-smart-dialogue
# or
yarn add react-smart-dialogue
# or
pnpm add react-smart-dialogue
```

## Quick Start (Recommended: Provider Pattern)

### 1. Wrap your app with the Provider

```tsx
import React from "react";
import { DialogueProvider } from "react-smart-dialogue";
import App from "./App";

function Root() {
  return (
    <DialogueProvider>
      <App />
    </DialogueProvider>
  );
}

export default Root;
```

### 2. Use dialogue from anywhere in your app

```tsx
import React from "react";
import { useDialogueContext } from "react-smart-dialogue";

function DeleteButton() {
  const { showDialogue } = useDialogueContext();

  const handleDelete = async () => {
    const confirmed = await showDialogue({
      title: "Delete Item",
      message:
        "Are you sure you want to delete this item? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (confirmed) {
      console.log("Item deleted!");
      // Perform delete action
    }
  };

  return <button onClick={handleDelete}>Delete Item</button>;
}
```

## Alternative Usage Methods

### Basic Component Usage

```tsx
import React, { useState } from "react";
import { DynamicDialogue } from "react-smart-dialogue";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Show Dialogue</button>

      <DynamicDialogue
        isOpen={isOpen}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        onConfirm={() => {
          console.log("Confirmed!");
          setIsOpen(false);
        }}
        onCancel={() => {
          console.log("Cancelled!");
          setIsOpen(false);
        }}
      />
    </>
  );
}
```

### Hook Usage (Local Management)

```tsx
import React from "react";
import { DynamicDialogue, useDialogue } from "react-smart-dialogue";

function MyComponent() {
  const { isOpen, dialogueProps, showDialogue, handleConfirm, handleCancel } =
    useDialogue();

  const handleAction = async () => {
    const confirmed = await showDialogue({
      title: "Warning",
      message: "Are you sure you want to proceed?",
      confirmText: "Yes",
      cancelText: "No",
    });

    if (confirmed) {
      console.log("User confirmed!");
    }
  };

  return (
    <>
      <button onClick={handleAction}>Show Local Dialogue</button>

      <DynamicDialogue
        isOpen={isOpen}
        title={dialogueProps.title}
        message={dialogueProps.message}
        confirmText={dialogueProps.confirmText}
        cancelText={dialogueProps.cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
```

## Custom Styling

The dialogue component comes with beautiful default styling but can be fully customized:

```tsx
import React from "react";
import { useDialogueContext } from "react-smart-dialogue";

function StyledDialogueExample() {
  const { showDialogue } = useDialogueContext();

  const showCustomDialogue = () => {
    showDialogue({
      title: "Custom Styled Dialogue",
      message: "This dialogue has beautiful custom styling!",
      confirmText: "Awesome!",
      cancelText: "Maybe Later",
    });
  };

  return <button onClick={showCustomDialogue}>Show Styled Dialogue</button>;
}
```

For advanced styling, you can pass custom className props when using the component directly:

```tsx
<DynamicDialogue
  isOpen={isOpen}
  title="Custom Styled Dialogue"
  message="This dialogue has custom styling!"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  // Custom classes
  dialogueClassName="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6"
  titleClassName="text-2xl font-bold text-white mb-4"
  messageClassName="text-white/90 mb-6"
  confirmButtonClassName="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100"
  cancelButtonClassName="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-600"
/>
```

## API Reference

### DialogueProvider

Wraps your app to provide a single dialogue instance via React Context.

| Prop       | Type        | Description      |
| ---------- | ----------- | ---------------- |
| `children` | `ReactNode` | Your app content |

### useDialogueContext

Access the dialogue from anywhere in a component (must be inside a `DialogueProvider`).

**Returns:**

- `{ showDialogue: (options: UseDialogueOptions) => Promise<boolean> }`

### UseDialogueOptions

| Property      | Type     | Default     | Description         |
| ------------- | -------- | ----------- | ------------------- |
| `title`       | `string` | -           | Dialogue title      |
| `message`     | `string` | -           | Dialogue message    |
| `confirmText` | `string` | `"Confirm"` | Confirm button text |
| `cancelText`  | `string` | `"Cancel"`  | Cancel button text  |

### DynamicDialogue Props

| Prop                        | Type         | Default                     | Description                                           |
| --------------------------- | ------------ | --------------------------- | ----------------------------------------------------- |
| `isOpen`                    | `boolean`    | -                           | Controls dialogue visibility                          |
| `title`                     | `string`     | -                           | Dialogue title                                        |
| `message`                   | `string`     | -                           | Dialogue message                                      |
| `confirmText`               | `string`     | `"Confirm"`                 | Confirm button text                                   |
| `cancelText`                | `string`     | `"Cancel"`                  | Cancel button text                                    |
| `onConfirm`                 | `() => void` | -                           | Confirm button handler                                |
| `onCancel`                  | `() => void` | -                           | Cancel button handler                                 |
| `onClose`                   | `() => void` | -                           | Optional close handler (called when clicking overlay) |
| `dialogueClassName`         | `string`     | Default styled container    | Custom dialogue container classes                     |
| `overlayClassName`          | `string`     | Default styled overlay      | Custom overlay classes                                |
| `titleClassName`            | `string`     | Default styled title        | Custom title classes                                  |
| `messageClassName`          | `string`     | Default styled message      | Custom message classes                                |
| `confirmButtonClassName`    | `string`     | Default blue confirm button | Custom confirm button classes                         |
| `cancelButtonClassName`     | `string`     | Default gray cancel button  | Custom cancel button classes                          |
| `buttonsContainerClassName` | `string`     | Default flex container      | Custom buttons container classes                      |

### useDialogue Hook

Returns an object with:

| Property        | Type                                                | Description                      |
| --------------- | --------------------------------------------------- | -------------------------------- |
| `isOpen`        | `boolean`                                           | Current dialogue state           |
| `dialogueProps` | `UseDialogueOptions`                                | Current dialogue configuration   |
| `showDialogue`  | `(options: UseDialogueOptions) => Promise<boolean>` | Show dialogue and return promise |
| `handleConfirm` | `() => void`                                        | Confirm handler for the dialogue |
| `handleCancel`  | `() => void`                                        | Cancel handler for the dialogue  |

## Usage Patterns

### Global Confirmation Dialogues

```tsx
// utils/dialogues.ts
import { useDialogueContext } from "react-smart-dialogue";

export const useConfirmations = () => {
  const { showDialogue } = useDialogueContext();

  const confirmDelete = (itemName: string) =>
    showDialogue({
      title: "Delete Item",
      message: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });

  const confirmLogout = () =>
    showDialogue({
      title: "Sign Out",
      message: "Are you sure you want to sign out?",
      confirmText: "Sign Out",
      cancelText: "Stay Signed In",
    });

  const confirmSave = () =>
    showDialogue({
      title: "Save Changes",
      message: "Do you want to save your changes before leaving?",
      confirmText: "Save",
      cancelText: "Discard",
    });

  return { confirmDelete, confirmLogout, confirmSave };
};
```

### Information Dialogues

```tsx
const { showDialogue } = useDialogueContext();

const showInfo = (title: string, message: string) => {
  showDialogue({
    title,
    message,
    confirmText: "OK",
    cancelText: "", // This will hide the cancel button
  });
};

const showSuccess = (message: string) => {
  showInfo("Success", message);
};

const showError = (message: string) => {
  showInfo("Error", message);
};
```

### Form Validation Dialogues

```tsx
const validateAndSubmit = async (formData) => {
  if (!formData.email) {
    const shouldContinue = await showDialogue({
      title: "Missing Email",
      message: "Email is required. Do you want to continue without it?",
      confirmText: "Continue",
      cancelText: "Go Back",
    });

    if (!shouldContinue) return;
  }

  // Submit form
  submitForm(formData);
};
```

## Default Styling

React Smart Dialogue comes with beautiful default styling:

- **Modern Design**: Clean, rounded corners with subtle shadows
- **Responsive**: Works perfectly on mobile and desktop
- **Accessible Colors**: High contrast for better readability
- **Smooth Animations**: Subtle transitions and hover effects
- **Backdrop Blur**: Modern glass-morphism effect

## Accessibility

The component includes comprehensive accessibility features:

- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` and `aria-describedby` for proper labeling
- Keyboard navigation support
- Focus management
- Click outside to close (customizable)
- Screen reader friendly

## Tailwind CSS

This component is designed to work with Tailwind CSS. Make sure you have Tailwind CSS configured in your project. The component uses utility classes for styling and allows full customization through className props.

If you're not using Tailwind CSS, you can still use the component by providing your own CSS classes.

## TypeScript Support

React Smart Dialogue is built with TypeScript and provides full type safety:

```tsx
import { DialogueProps, UseDialogueOptions } from "react-smart-dialogue";

// All props are properly typed
const MyDialogue: React.FC<DialogueProps> = (props) => {
  // TypeScript will catch any prop mismatches
  return <DynamicDialogue {...props} />;
};
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © Ajay Pandey
