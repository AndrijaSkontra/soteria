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
- app types are in: `app-typed.d.ts`
- component props should be right above the component like this:

```tsx
type AdminLayoutProps = {
  children: React.ReactNode;
  params: RouteParams;
};

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
```

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

### Forms

Use server side validation with zod and useActionState hook; good [example](https://dev.to/bookercodes/learn-useactionstate-quickly-4jj7)
