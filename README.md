# KANON GAMING Development Test

## Backend

The backend source code is located in the './backend' directory.

To get started with the project, follow these steps:

```bash
# Start in development mode
1. cd ./backend
2. npm install
3. npm run dev # Starts in development mode

# Start in production mode
1. cd ./backend
2. npm install
3. npm run build 
4. npm run start
```

### Backend Endpoint Details

The backend environment will run on port 3000, and the endpoint will be accessible at http://www.localhost:3000.

#### Endpoint Methods

- `/games`: Retrieves a list of games. If the `search` parameter is added, it filters the games based on the provided
  text.
- `/slot-machine/spin`: Performs a spin on the slot machine according to specified requirements.

## Frontend

The frontend source code is located in the './frontend' directory.

To get started with the project, follow these steps, make sure that the backend is running before testing the frontend:

```bash
# Start in development mode
1. cd ./frontend
2. npm install
3. npm run dev # Starts in development mode

# Start in production mode
1. cd ./frontend
2. npm install
3. npm run build 
4. Open dist/index.html in browser
```

## ESLINT && PRETTIER

For both projects, eslint and prettier are installed. You can run the below commands to test eslint / format the code:

```bash
# ESLINT
npm run lint

# PRETTIER
npm run format
```

## Database Questions

You can find the ER diagram and SQL for QUESTIONS 4 AND 5 in "./documentation/database" folder.