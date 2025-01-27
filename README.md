<h1 align="center">
QuestSearch</br>
https://tinyurl.com/QuestSearch-07
</h1>
<p align="center">
gRPC,MongoDB, Expressjs, React, Nodejs
</p>

> QuestSearch is an intelligent search platform that enables users to find questions effortlessly using voice search and 
a powerful backend powered by Node.js, gRPC, and MongoDB. With a sleek React and Tailwind CSS frontend, it delivers a seamless and user-friendly search experience.

## clone or download
```terminal
$ git clone https://github.com/Thakurutkarsh07/QuestSearch.git
$ yarn # or npm i
```

## project structure
```terminal
LICENSE
package.json
server/
   server.js
   package.json
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3004)
```terminal
$ cd frontend          // go to frontend folder
$ npm i    // npm install packages
$ npm run dev        // run it locally
```

## Server-side usage(PORT: 3000 50051)

### Prepare your secret

run the script at the first level:

(You need to add a .env to connect to MongoDB)

```terminal
// in the root level
$ cd server
$ echo "MONGOURI=mongodb+srv://thakurutkarsh0700:thakur@cluster0.wfyk1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" >> .env
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ node server.js // run it locally
```

# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios: ^0.15.3 | cors: ^2.8.5
@tailwindcss/vite: ^4.0.0|body-parser: ^1.15.2
fuse.js: ^7.0.0 | cors: ^2.8.1
react: ^16.2.0 | dotenv: ^2.0.0
react-dom: ^16.2.0 | express: ^4.14.0
react-redux: ^4.0.0 | @grpc/grpc-js: ^1.12.5
react-router-dom: ^4.2.2 | mongoose: ^4.7.4
redux: ^3.7.2 | @grpc/proto-loader: ^0.7.13

Email Me: thakurutkarsh.0700@gmail.com (Hey!)

## Author
[Portfolio](https://utkarsh-portfolio-a0699.web.app/)
