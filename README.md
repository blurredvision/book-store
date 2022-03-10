## Getting Started

First, install all of the node modules for the project in root of the folder:

```bash
npm install
```

Secondly, start mongo by going to "C:\Program Files\MongoDB\Server\5.0\bin" and run :

```bash
mongod --dbpath "C:\Users\LabStudent-55-604385\Documents\MongoDB\data\db"
```

Finally, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open another terminal in "C:\Program Files\MongoDB\Server\5.0\bin" and run:

```bash
mongo 127.0.0.1/bookStore "C:\Users\LabStudent-55-604385\Documents\Book-Store\load.js"
```

This should populate the database by adding books and users

Credentials for the 3 users:

Client:
```bash
name = Alex
password = 12345
```

Employee:
```bash
name = Jeremy
password = 12345
```

Admin:
```bash
name = Max
password = 12345
```