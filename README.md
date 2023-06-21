# ReadLyst
A book tracking web application using MEAN stack

## Features

- Feature 1 - User can add books to a reading list either by searching or manually by submitting the book details.
- Feature 2 - Each book in a reading list has a status that indicates whether it is: Unread, In Progress, or Finished.
- Feature 3 - A book will have the status "Unread" when its first added to a reading list.
- Feature 4 - Books in a reading list can be deleted by clicking on the trash icon.
- Feature 5 - Book details can be updated by clicking on the edit icon.
- Feature 6 - Book status can be updated by clicking correspoding buttons. Button text will be updated based on the current book status.
- Feature 7 - User can view the full reading list, books that are in progress, finished books and favourite books.
 - Feature 8 - Book has 5 attributes: title, author, status, isbn and number of pages.
- Feature 9 - It is a single tenant service.
 - Feature 10 - Five API endpoints for reading list application are added. The get endpoint will fetch the reading list. The post endpoint will add a new book to the reading list. The get (parameterized url) will fetch a book by ID. Put endpoint is to update book details and delete endpoint to delete a book by ID.

 - Feature 11 - Integration with MongoDB. MongoDB used to store and retrieve the reading list.


  - Feature 12 - Custom validation using Joi.

  - Feature 13 - Good use of express middleware (e.g. Error handling). Error handling is done by using 'http-errors' module which helps to specify error status and error messages.

  - Feature 14 - API documentation (Swagger/openAPI) - Documentation for all endpoints.

  - Feature 15 - Logging - using 'winston' module.

  - Feature 16 - Angular Integration: User can call get endpoint from my-books page to see a listed view of their added books. The post endpoint will be called when user adds a new book either by searching or manually by submitting the form and the data is saved to database. Update and delete endpoints are called when user clicks on the edit and trash icons on the book respectively.

## Additional features
- Feature 1 - Book search by utilizing Google books API.
 - Feature 2 - User can add their books to 'Favourites' where they can also view the current status of the book.



## Installation Requirements
First clone the repo

```cmd
git clone https://github.com/ANSN07/ReadLyst.git
```

Provide the necessary env variables as listed in the below section
followed by installation.
Install the API dependencies by running the following command: 

```bat
npm install
```

Then start the server by using following command:

```cmd
npm start
```

The API server will start running on the specified port.
Now, in order to set up and run the Angular app, first install the Angular app dependencies by running the following command:

```bat
npm install
```

Once the dependencies are installed, you can start the Angular development server using the following command:

```bat
ng serve
```

After the development server starts, Angular app can be accessed in the browser by visiting http://localhost:4200.


## API Configuration

Env variables are listed below:

```bat
NODE_ENV=development
PORT=8080
DATABASE_URL=YourMongoURL
LOG_LEVEL=info
```
Env variables for angular app can be seen in the folder 'src/environment' where API base-url is to be specified.

## API Design

Endpoint | GET | POST | PUT | DELETE 
--- | --- | --- | --- |--- |
/api/reading-list | Gets full reading list | Add a new book | Update book details including status | Delete a book
/api/reading-list/{bookId} | Gets a book based on the book id

API documentation done by using Swagger, the url for Swagger UI will be
"http://localhost:8080/api-docs/"


## Validation

Custom joi validation is used to validate book data submitted by the user in the UI. All the fields should be in string format. Page number is validated based on a pattern where only numbers are allowed. The book status should be one of the 'Unread', 'In Progress' or 'Finished'. Also, all these fields are set as required and should not be empty except the isbn. The same validation criteria and custom error messages are used in the UI also.

## Integrating with Angular App

The user after submitting the add book form will be redirected to all-books page. A click on save book button will call the reading-list endpoint (POST) and the details will be stored in the mongodb database. The get endpoint to get the full reading list is called when user navigate to the my-books page. If no books are added yet by the user, then a message saying "No books added yet" will be shown to user. Otherwise a list of all books added by the user will be displayed in the page.

## Extra features

Logging using "winston" package. This package offers differnt levels of logging such as "info", "error", "warn" and so on. This is so convenient and simple to use.
