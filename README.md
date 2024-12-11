## Setup Instructions

1. **Connect to the MongoDB Replica Set**  
   Ensure your `.env` file includes the necessary connection string.

2. **Generate the Authentication Secret**  
   Run the following command: `npx auth secret`

3. **Install Prettier**

## Git Commit Guidelines

When making commits, follow this convention:

• Begin each commit message with one of the following prefixes: ADDED, CHANGED, DELETED or FIXED.

• Follow the prefix with a clear and descriptive message detailing the changes made.

## Before opening a pull request

```bash
npx prettier . --write
npm run build
```
> Ensure that npm run build completes without any errors or warnings.

## Clean Code Guidelines

- files and directories use [kebab case](https://www.freecodecamp.org/news/programming-naming-conventions-explained/#heading-what-is-kebab-case)
- "use server" functions: `src/lib/server-actions/`
- data access files: `src/lib/services/`
- constants: `src/lib/constants/`
- seed database `scripts: src/lib/seed/`

### Toasts

```tsx
// src/components/toasts/update-subject-success.tsx
export function UpdateSubjectSuccessToast({ subject }) {
  return (
    <div>
      <p className="text-md font-bold">UPDATED</p>
      <p>
        Subject <strong>{subject.name}</strong> updated
      </p>
    </div>
  );
}

// usage
toast({
  description: <UpdateSubjectSuccessToast subject={subject} />,
  duration: 2000,
});
```
