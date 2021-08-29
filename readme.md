## Lithodomos coding challenge

Welcome to the Lithodomos Coding Challenge. 
It is expected to spend 2-3hrs on this test.

The goals of this challenge is for us to ascertain if you have necessary technical skills for the job, as well as for you the get a feeling of whether you are up for the job since the project setup is similar to how we do it at Lithodomos, albeit much smaller than the real thing.


## Directory structure

There are two projects. These projects are set up similar to the Lithodomos webapps albeit much smaller.

- api: A GraphQL API built with Node.js. 

- client: A React.js app.



## Starting development

### Prerequisites:

- [Node.js v14](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/)
- Git
- [MongoDB (community edition is adequate)](https://www.mongodb.com/try/download/community?tck=docs_server)

#### Recommended but not required

- [VSCode editor](https://code.visualstudio.com/) for coding 
- [Robo3T](https://robomongo.org/) for viewing the DB records


###  API

1) cd into api directory
2) Run `yarn` to install npm packages
3) Start mongodb if not already running and point to a local data file. (eg: mongod --dbpath ./db)
4) Run `yarn seedData` to add seedData to the database (this will add 10 records to the db named `test`. It will drop the `test` db if it is already available.)
5) Create a new .env file in the root of the `api` directory by duplicating the `.env.example` file.
6) Tun `yarn start` to start the API. The API will run on localhost:3000/graphql (if you browse to localhost:3000 in your browser, it will load the playground for you to explore the api)


### Client

1) cd into the client directory
2) Run `yarn` to install npm packages
3) Run `yarn start` to start the Client
4) If you add/modify a graphql query in the Client, make sure to run `yarn generate-gql-types` to add the typescript definitions


## Challenges

There are 3 challenges. 

1) Coding challenge #1 [React]

	Display the list of tours returned from the `getTours` graphql query as a grid below the Hero image.
	- Use `getTours` query. The Tours.tsx file is already wired up.
	- Design a suitable card for each tour.
	  - Each card should show the 
	    - image, 
		- name of the tour
		- price of the tour in USD
		- a button to purchase.
	- The purchase button doesn't really "purchase" anything. It should simply call the `purchaseTours` mutation with the relevant id of the tour.
		- Take a look at the `api\src\graphql\mutations\Tour\purchaseTours.js` file. 
		- It simply adds the id of the tour to the user doc's `purchasedTourIDs` array and returns the tours.
		- Make sure to run `yarn generate-gql-types` after adding the query to generate typescrypt definitions from the graphql types.
	- Note that the user should be logged in to purchase.
		- Click `Sign up` in the navbar to sign up for an account. Make sure to fill all fields. You will be automatically logged in after signing up. It simply calls the `signUpWithEmail` mutation and creates a user record on the `test` mongoDB database. Session will be persisted.
		- You can `Log in` as well, if you have created an account previously.
	- A user shouldn't be able to purchase a tour once they have purchased it.

	Hint: You may need to refetch the tours once a user purchases a tour.

2) Coding challenge #2 [React]

	On the Account page (you'll see the `Account` link on the navbar if the user is logged in), display the list of tours the currently logged in user has purchased.
	
	Reuse as much code from Challenge 1 as possible.

	Hint: Use `getCurrentUser` query to get the purchasedTours. The `purchasedTours` field should return the purchased tours. Make sure to run `yarn generate-gql-types` after adding the query to generate typescrypt definitions from the graphql types.


3) Coding challenge #3 [Node/GraphQL]

       Create a new query which returns the users who have purchased at least one tour.
       

	```graphql
	getUsersWithPurchases(input: GetUsersWithPurchasesInput!): GetUsersWithPurchasesResponse!

	input GetUsersWithPurchasesInput {
		recordsPerPage: Int
		pageNumber: Int
	}

	type GetUsersWithPurchasesResponse implements PaginatedListResponse {
		totalPages: Int!
		totalRecordsCount: Int!
		users: [User!]!
	}
	```

	Hints: 
	- Look how `getTours` query is implemented. 
	- The tricky part is to understand how to register a new query on the api. Look at `rootQuery.js`.

