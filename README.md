# React Dynamic Dialogue

A customizable and accessible dialogue component for React applications with TypeScript support and Tailwind CSS styling.

## Features

- 🎨 **Fully Customizable** - Style with Tailwind CSS classes
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- ♿ **Accessible** - ARIA compliant with proper focus management
- 🪝 **Hook Support** - Promise-based dialogue with `useDialogue` hook
- 📱 **Responsive** - Works on all screen sizes
- 🎯 **Lightweight** - Minimal dependencies

## Installation

```bash
npm install react-dynamic-dialogue
# or
yarn add react-dynamic-dialogue
# or
pnpm add react-dynamic-dialogue
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { DynamicDialogue } from "react-dynamic-dialogue";

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

## Hook Usage (Promise-based)

```tsx
import React from "react";
import { DynamicDialogue, useDialogue } from "react-dynamic-dialogue";

function App() {
  const { isOpen, dialogueProps, showDialogue, handleConfirm, handleCancel } =
    useDialogue();

  const handleDelete = async () => {
    const confirmed = await showDialogue({
      title: "Delete Item",
      message: "This action cannot be undone. Are you sure?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (confirmed) {
      // Perform delete action
      console.log("Item deleted!");
    }
  };

  return (
    <>
      <button onClick={handleDelete}>Delete Item</button>

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

```tsx
<DynamicDialogue
  isOpen={isOpen}
  title="Custom Styled Dialogue"
  message="This dialogue has custom styling!"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  // Custom classes
  dialogueClassName="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl shadow-2xl max-w-lg w-full mx-4"
  titleClassName="text-2xl font-bold text-white mb-4"
  messageClassName="text-white/90 mb-6"
  confirmButtonClassName="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100"
  cancelButtonClassName="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-600"
/>
```

## API Reference

### DynamicDialogue Props

| Prop                        | Type         | Default     | Description                                           |
| --------------------------- | ------------ | ----------- | ----------------------------------------------------- |
| `isOpen`                    | `boolean`    | -           | Controls dialogue visibility                          |
| `title`                     | `string`     | -           | Dialogue title                                        |
| `message`                   | `string`     | -           | Dialogue message                                      |
| `confirmText`               | `string`     | `"Confirm"` | Confirm button text                                   |
| `cancelText`                | `string`     | `"Cancel"`  | Cancel button text                                    |
| `onConfirm`                 | `() => void` | -           | Confirm button handler                                |
| `onCancel`                  | `() => void` | -           | Cancel button handler                                 |
| `onClose`                   | `() => void` | -           | Optional close handler (called when clicking overlay) |
| `dialogueClassName`         | `string`     | -           | Custom dialogue container classes                     |
| `overlayClassName`          | `string`     | -           | Custom overlay classes                                |
| `titleClassName`            | `string`     | -           | Custom title classes                                  |
| `messageClassName`          | `string`     | -           | Custom message classes                                |
| `confirmButtonClassName`    | `string`     | -           | Custom confirm button classes                         |
| `cancelButtonClassName`     | `string`     | -           | Custom cancel button classes                          |
| `buttonsContainerClassName` | `string`     | -           | Custom buttons container classes                      |

### useDialogue Hook

Returns an object with:

| Property        | Type                                                | Description                      |
| --------------- | --------------------------------------------------- | -------------------------------- |
| `isOpen`        | `boolean`                                           | Current dialogue state           |
| `dialogueProps` | `UseDialogueOptions`                                | Current dialogue configuration   |
| `showDialogue`  | `(options: UseDialogueOptions) => Promise<boolean>` | Show dialogue and return promise |
| `handleConfirm` | `() => void`                                        | Confirm handler for the dialogue |
| `handleCancel`  | `() => void`                                        | Cancel handler for the dialogue  |

### UseDialogueOptions

| Property      | Type     | Default     | Description         |
| ------------- | -------- | ----------- | ------------------- |
| `title`       | `string` | -           | Dialogue title      |
| `message`     | `string` | -           | Dialogue message    |
| `confirmText` | `string` | `"Confirm"` | Confirm button text |
| `cancelText`  | `string` | `"Cancel"`  | Cancel button text  |

## Accessibility

The component includes proper ARIA attributes and keyboard navigation:

- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` and `aria-describedby` for proper labeling
- Clicking outside the dialogue closes it (customizable with `onClose`)
- Focus management

## Tailwind CSS

This component is designed to work with Tailwind CSS. Make sure you have Tailwind CSS configured in your project. The component uses utility classes for styling and allows full customization through className props.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]
