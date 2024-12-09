## Setup Instructions

1. **Connect to the MongoDB Replica Set**  
   Ensure your `.env` file includes the necessary connection string.

2. **Generate the Authentication Secret**  
   Run the following command:  

   ```bash
   npx auth secret
   ```

3. Install Prettier

## Git Commit Guidelines

When making commits, follow this convention:

• Begin each commit message with one of the following prefixes: ADDED, CHANGED, or DELETED.

• Follow the prefix with a clear and descriptive message detailing the changes made.

## Before opening a pull request

```bash
npx prettier . --write
npm run build
```
