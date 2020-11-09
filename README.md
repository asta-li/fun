# Web App with React and Go

This project was created using the following helpful links:
- [Create React App](https://github.com/facebook/create-react-app)
- [Creating a React Frontend for a Go API](https://rshipp.com/go-react-frontend/)

## Commands

### Run the Go server

Run the following to build the static React frontend and launch the Go server.
```
cd client
npm run build
cd ../server
go run main.go
```

Open [http://localhost:3000](http://localhost:3000) to view in the browser.

### Run in React development mode

After starting the Go server, run the following to run the client code in development mode.
```
cd client
npm start
```

Open [http://localhost:3000](http://localhost:3001) to view in the browser.

