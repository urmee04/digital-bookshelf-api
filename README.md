### Lab 13.2: Mongoose Models and Schemas

A RESTful API for managing a library's book inventory, built with Node.js, Express, and MongoDB/Mongoose.

---

#### Features

- Create new book records
- Read all books or a specific book by ID
- Update existing book information
- Delete books from the collection
- Data validation and error handling

---

#### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- Body-parser middleware
--- 
#### Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/urmee04/digital-bookshelf-api.git
```

   `cd digital-bookshelf`

2. Install dependencies:

   `npm install`

3. Set up environment variables:

   - Create a .env file in the root directory

4. Add your MongoDB connection string:

   `MONGODB_URI=<your-connection-string-here>`
   `PORT=3000`

5. Start the server:

   `npm start`

---

#### Project Structure

```bash
digital-bookshelf-api/
├── db/
│ └── connection.js # database connection logic
│
├── models/ # mongoose models will go here
│ └── Book.js
│
├── routes/ # express route handlers will go here
│ └── bookRoutes.js
│
├── server.js # entry point of the app
├── .env # environment variables (MongoDB URI, PORT, etc.)
├── .gitignore # ignore node_modules and .env
├── package.json
└── package-lock.json
```

---
#### Error Handling
The API returns appropriate HTTP status codes:

- 200: Success
- 201: Resource created successfully
- 400: Bad request (validation error)
- 404: Resource not found
- 500: Internal server error

#### Book API Endpoints

This document outlines the available endpoints for the Book API.

Base URL: /api/books

1. POST (To Create a New Book)

- Open a new tab in Postman.
- Select POST as the HTTP method.
- In the URL bar, type: http://localhost:3000/api/books
- Go to the Body tab.
- Select raw and then choose JSON from the dropdown menu.
- In the body, write the complete information for the new book in JSON format.
- Click the Send button.
- If successful, you will see a confirmation message (e.g., "Book added Successfully") and the complete information of the newly created book, including its unique _id, in the Response Body.

2. GET (To View All Books)

- Open a new tab in Postman.
- Select GET as the HTTP method.
- In the URL bar, type: http://localhost:5000/api/books
- Click the Send button.

You will see a list of all the books you have created in the Response Body below.

3. GET by ID (To View a Single Book)

First, copy the "_id" of any book from the GET request above.
- Select GET as the HTTP method.
- In the URL bar, type: http://localhost:5000/api/books/your_copied_id
- Click the Send button.

You will now see the information for only that specific book.

4. PUT (To Update a Book)

- Copy the "_id" of the book you want to update.
- Select PUT as the HTTP method.
- In the URL bar, type the URL with the ID: http://localhost:3000/api/books/your_copied_id
- Go to the Body tab.
- Select raw and then choose JSON from the dropdown menu.
- In the body, write the information you want to change in JSON format.
- Click the Send button.
- You will see the complete updated information of the book in the response.

5. DELETE (To Delete a Book)

- Copy the "_id" of the book you want to delete.
- Select DELETE as the HTTP method.
- In the URL bar, type the URL with the ID: http://localhost:3000/api/books/your_copied_id
- Click the Send button.
- You will see a success message (e.g., "Book deleted successfully").
- If you now make a GET request to view all books again, you will see that the book is no longer in the list.

---
#### Reflection Questions
Here are detailed responses to your reflection questions:

### 1. Why is it beneficial to separate your routes, models, and database connection into different directories?

Separating routes, models, and database connections into different directories offers several benefits:

- **Organization**: Keeping code organized makes it easier to navigate and manage. Each component has its own space, which helps developers quickly find and modify specific parts of the application.

- **Maintainability**: When the code is organized into distinct modules, it becomes easier to maintain and update. Changes to one part of the application (e.g., routes) can be made without affecting others (e.g., models).

- **Scalability**: As the application grows, having a clear structure allows for easier scaling. New routes, models, or database connections can be added without cluttering existing code.

- **Collaboration**: In a team environment, different developers can work on different components simultaneously without causing conflicts. This separation allows for parallel development and reduces the likelihood of merge conflicts.

- **Testing**: Isolating routes, models, and database connections makes it easier to write unit tests for each component. We can test each part independently, ensuring that the application behaves as expected.

### 2. What is the difference between PUT and PATCH HTTP methods, and which one does your PUT /:id endpoint more closely resemble?

- **PUT**: The PUT method is used to update a resource entirely. When a client sends a PUT request, it typically includes the complete representation of the resource. If any fields are omitted, they may be replaced with default values or removed entirely. PUT is idempotent, meaning that multiple identical requests will have the same effect as a single request.

- **PATCH**: The PATCH method is used to apply partial modifications to a resource. It allows clients to send only the fields that need to be updated, rather than the entire resource. PATCH is also idempotent, but it is more flexible as it can handle partial updates.

If the `PUT /:id` endpoint is designed to update the entire resource with a complete representation, it closely resembles the PUT method. If it allows for partial updates, it would resemble the PATCH method.

### 3. In the DELETE route, what is a good practice for the response you send back to the client after a successful deletion? Should you send the deleted object, a simple success message, or something else? Why?

In a DELETE route, a good practice for the response after a successful deletion is to send a simple success message or a status code indicating success. Here are some considerations:

- **HTTP Status Code**: Returning a 204 No Content status code indicates that the request was successful and that there is no additional content to send back. This is a common practice for DELETE requests.

- **Success Message**: If we choose to send a message, it can be a simple confirmation like "Item deleted successfully." This provides clear feedback to the client that the operation was completed.

- **Avoid Sending the Deleted Object**: Sending the deleted object back is generally not necessary, as the client already knows which object was deleted based on the request. It can also lead to confusion if the client receives the object but is not able to use it anymore.

In summary, returning a status code (like 204) along with a simple success message is a clean and effective way to inform the client that the deletion was successful. This approach keeps the response lightweight and avoids unnecessary data transfer.

---
#### References

My primary resource for completing the lab was the code from our class lessons and materials. Additionally, I used the resources mentioned below to deepen my understanding of the concepts and code flow

- [mongoose](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose)

- [mongoDB Bootcamp](https://generalmotors.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065064#overview)
