
# Login System

This Project is a Login Flow of a website, it is an take home interview assignment by ``HrCadre Consulting``
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`: your Mongo DB URI to connect with the application

`JWT_SECRET`: your JWT Secret Key


## Tech Stack


**Server:** Node, Express, Pug (For rendering HTML elements)


## Run Locally

Go to the project directory

```bash
  cd loginFlow
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Go to the home page of the website, you will be able to redirect to login as well as register

once you login the application, you will be redirected to dashboard (in a project this can be replaced by user data), you cannot reopen login/register page until you logout and vice-versa.

I have added what to do if using REST API in comment inside the code
## Authors

- [@Saurav-Navdhare](https://www.github.com/Saurav-Navdhare/)

