# Fictional Online Store

This project is focused on building REST APIs for a fictional online store that sells electronic products. API built in this project allows users to:

- Create, Read, Update, and Delete products (only Admin can Create, Update and Delete the products)
- Search for products by name and category
- Add products to a shopping cart and place orders
- Register and authenticate users

---
## Requirements

For development, you will only need Node.js and a node global package installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

If the installation was successful, you should be able to run the following command.

    $ node --version
    $ npm --version

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### MongoDB
- Create a Free MongoDB Atlas Cluster and then create a Database inside that cluster
- Get Your Cluster's Connection Info: 
  - In 
Atlas
, navigate to your cluster and click `CONNECT`. The Cluster Connection Wizard will appear.
  - Next, the Wizard will prompt you to choose a connection method. Select `Connect Your Application`. When the Wizard prompts you to select your driver version, select Node.js and 3.6 or later. Copy the provided connection string.



---

## Install on Local System

	$ git clone https://github.com/KartikDholakia/fictional_store
    $ cd fictional_store
    $ npm install

## Configure app

Create a `.env` file in the root directory and define the following variables:

- `PORT`: Port on which you want to run your server;
- `CONNECTION_STRING`: MongoDB connection string;
- `ACCESS_TOKEN`: JWT Access token;

## Running the project

    $ npm run dev

It runs your app on `http://localhost:{PORT}`

---

