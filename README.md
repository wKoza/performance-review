# FullStackEngineerChallenge

### Running application
- clone project
- install all dependencies 
- run following command 'npm run start'

### Overview

Created two separate endpoints (dictated by the NestJS controllers) that handle Employees and Reviews.  These allow the basic functionality of  GET, UPDATE, PUT, and DELETE.  I also included a couple of other endpoints that allow the user to assign a list of employee ids as reviewers to another employee id (reviewee).

On the client side, I created a quick landing page that allows the user to select whether they want the "Admin View" or the "Employee View". This selection then dictates what the user will be able to see.  The "Admin View" includes a list of all employees and the ability to delete an employee, view an employee, or create a new employee.   When viewing an employee, the user can see all of the employees reviews and update any necessary review.  The user can also choose to Add a review from this page.  The "Admin View" also has a page where they can assign a list of employees as reviewers to a selected reviewee.

The "Employee View" is allowed to see a list of  reviews. These statuses of the reviews are updated after a review is submitted.

The tech stack is Angular 8, Angular Material and CSS on the frontend, [NestJS](https://nestjs.com/) (framework built on top of ExpressJS and TypeScript) on the backend, Jest for testing, and Prettier + tslint to style my code.  I also used [Nx](https://nx.dev/angular) to create my project.  Nx allows me to reuse components, interfaces or applications throughout my application.  I used this to help create my NestJS and Angular components faster and to reuse code, such as my interfaces. 

I've also included a link below for a schema that I created.  Unfortunately, I wasn't able to add database support but the following shows my initial approach to creating a schema.

[Free Database Designer | DbDesigner.net](https://dbdesigner.page.link/NZSn)

### Assumptions Made

- Admin can update a review that has already been submitted
- Reviews can be in a "Pending" state or "Submitted" state
- Employees can view feedback they are required to submit
- Employees can only view feedback that they have not submitted (that are in "Pending" state)
- Admin can assign herself/himself to also be a reviewer of an employee
- An employee cannot be a Reviewee and a Reviewer in the same revierw.
For example employee1 cannot review employee1
- Admin can assign others to review herself/himself
- A review can be NULL in the table, if status is "Pending"
- A review requires a date requested and a date submitted
- No object is returned when deleting a Review or an Employee. Just a status of 200
- List of employees in the admin page contain everyone except for the current admin

### Possible Updates

The following are areas of improvement that I was not able to implement due to time constraints

- **Adding history to the reviews**
Since an admin can update the reviews, we could benfit from having a history of the reviews, or at least a column to specify who it was updated by last and another column for when it was last updated
- **Common error page** 
A common error page (component) could have been created. This component could have then been used any time we run into any errors.
- Implementing a database.  Unfortunately, I was not able to include a database but I did include an [example](https://dbdesigner.page.link/NZSn) of what my schema would look like.
    - This could have been implemented a number of ways, such as an Amazon RDS for PostegreSQL setup
    - If I had added a PostegreSQL database (or a MySQL database) I could have used TypeORM to create entities for most of my interfaces created in api-interface.ts file
    - I then could've have created the connection within my app module in my NestJS backend
- **Adding security to specific endpoints** 
Certain endpoints should have extra validation to validate that user is an Admin
- **Adding authorization guards in Angular**
Certain components should have extra a guard service that validate that user is an Admin
- **Versioning API**
I should have added a version number to the API that way the user can have a way to access newer versions of the API without potentially breaking them.
- **Updates to assign endpoint**
I should ideally have different types of endpoints for assign (similar to how I set up the source type for Reviews). This could've allowed the users to specify what they wanted to assign, in case we wanted to expand what the Admin can assign.
- **Creating multiple modules for components**
