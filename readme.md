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
 
# API Reference

Base URL= `http://localhost:{PORT}\`

## Authentication

#

## Register a new user

### Request 
`POST /api/users/register`\
Access: Public

### Request Body
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | String | *Required* |
| `email` | String | *Required*, *unique* |
| `password` | String | *Required* |
| `isAdmin` | Boolean | *Default: false* |

### Response

    {
		"_id": "649684275301652b6652a487",
  		"email": "harit@gmail.com"
	}

## Login

### Request 
`POST /api/users/login` \
Access: Public

### Request Body
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | String | *Required*, *unique* |
| `password` | String | *Required* |

### Response

    {
  		"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJoYXJpdCIsImVtYWlsIjoiaGFyaXRAZ21haWwuY29tIiwiaWQiOiI2NDk2ODQyNzUzMDE2NTJiNjY1MmE0ODcifSwiaWF0IjoxNjg3NTg1OTk5LCJleHAiOjE2ODc1ODY4OTl9.SysrqzzLNlYpeVoiehshETDdDh6F3zmOSvlInXoZJic"
	}

The above access token expires in 15 min. Means a session lasts only for 15 mins.


## CRUD operations on Products
#

## Create a new Product

### Request 
`POST /api/products/`\
Access: Private \
Only admin can create the product. `verifyTokenAndAdmin` middleware verifies if the logged-in user is admin or not.

### Request Body
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | String | *Required*, *Unique* |
| `description` | String | *Required*, *unique* |
| `category` | String | *Required* |
| `price` | Boolean | *Default: false* |

### Response

	{
		"message": "Product Created!!",
		"product_info": {
			"name": "Helix Analog Watch",
			"description": "Analog watches by Timex",
			"category": "Watch",
			"price": 1500,
			"_id": "64968e7c21f7fe1fcceadf97",
			"createdAt": "2023-06-24T06:34:36.086Z",
			"updatedAt": "2023-06-24T06:34:36.086Z",
			"__v": 0
		}
	}

## Fetch List of All Products (Paginated Results)
### Request 
`GET /api/products/?page=_&limit=_`\
Access: Public \
Gives paginated results

### Query Parameters
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | Number | Page Number |
| `limit` | Number | Number of records per page |

### Response

	{
		"pagination": {
			"page": 1,
			"totalPages": 1,
			"count": 4,
			"results": [
			{
				"_id": "6495276a2ae507a933f6de79",
				"name": "The Growth Mindset",
				"description": "Self-help book by Carol Dweck | Updated by Admin",
				"category": "Books",
				"price": 100,
				"createdAt": "2023-06-23T05:02:34.993Z",
				"updatedAt": "2023-06-23T06:22:08.936Z",
				"__v": 0
			},
			{
				"_id": "64968e7c21f7fe1fcceadf97",
				"name": "Helix Analog Watch",
				"description": "Analog watches by Timex",
				"category": "Watch",
				"price": 1500,
				"createdAt": "2023-06-24T06:34:36.086Z",
				"updatedAt": "2023-06-24T06:34:36.086Z",
				"__v": 0
			}
			]
		}
	}


## Search Products by name or category
### Request 
`GET /api/products/search?name=_&category=-`\
Access: Public \

### Query Parameters
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | String | Name of the product |
| `category` | String | Category of the product |


## Update a Product
### Request 
`PUT /api/products/:id`\
Access: Private \
Only Admin can modfiy a product.
JWT Access token needs to be passed in the Auth Header.

### Query Parameters
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | String | Id of product |


## Delete a Product
### Request 
`DELETE /api/products/:id`\
Access: Private \
Only Admin can delete a product.
JWT Access token needs to be passed in the Auth Header.

### Query Parameters
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | String | Id of product |



## CART
#

## View User's Cart

### Request 
`GET /api/cart/` \
Access: Private \
Only authorized user can view his own cart.

## Add to Cart

### Request
`POST /api/cart/` \
Access: Private \
Only authorized user can add to his own cart.

### Request Body
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `product_id` | String | *Required* |
| `quantity` | Number | *Default: 1* |



## ORDER
#

## Place Order

### Request
`POST /api/order/` \
Access: Private \
The product items and quantity are taken from Cart collections. That is, when a user places an order, all of the items in his cart are sold to him.

### Request Body
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `address` | String | *Required* |


## Fetch the list of all Orders

### Request
`GET /api/order/?page=_&limit=` \
Access: Public \
Gives paginated results.

### Query Parameters
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | Number | Page Number |
| `limit` | Number | Number of records per page |
