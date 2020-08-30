# Ticket Booking System: Zomentum Hiring Challenge
---

Ticket booking system build on Javascript using the following stack:
-  NodeJS
-  MongoDB
-  Mocha and Chai For Testing

# Checklist

  - [x] An endpoint to book a ticket using a user’s name, phone number, and timings.
  - [x] An endpoint to update a ticket timing.
  - [x] An endpoint to view all the tickets for a particular time.
  - [x] An endpoint to delete a particular ticket.
  - [x] An endpoint to view the user’s details based on the ticket id. 
  - [x] Delete ticket after 8 hours of ticket timing : Used Time to Live(TTL) feature of mongoose to delete documents after 8 hours of their timings. [Link](https://github.com/darksun27/zomentum-hiring-challenge/blob/43a63ea9849aabfc8e02d5a23ef6e04eded5154f/models/ticketsModel.js#L4)
  
# Running the code locally

To run the code locally please follow the given commands:
```
https://github.com/darksun27/zomentum-hiring-challenge.git
npm install 
npm run start
```

To run the code for developing please follow the given commands:
```
https://github.com/darksun27/zomentum-hiring-challenge.git
npm install 
npm run dev
```

To test the code:
```
npm run test
```
Link to postman routes: 
```
https://www.getpostman.com/collections/970b173c18c516bd0f5c
```

# Postman Screenshots
- Booking Ticket using user details
![Task Image 1](https://github.com/darksun27/zomentum-hiring-challenge/blob/master/screenshots/zomentum-task1.png)
- Updating a ticket timing
![Task Image 2](https://github.com/darksun27/zomentum-hiring-challenge/blob/master/screenshots/zomentum-task2.png)
- View all tickets at once
![Task Image 3](https://github.com/darksun27/zomentum-hiring-challenge/blob/master/screenshots/zomentum-task4.png)
- Deleting a particular ticket
![Task Image 4](https://github.com/darksun27/zomentum-hiring-challenge/blob/master/screenshots/zomentum-task3.png)
- User Details from Ticket
![Task Image 5](https://github.com/darksun27/zomentum-hiring-challenge/blob/master/screenshots/zomentum-task5.png)
- Only 20 Tickets per Ticket Timing
![Task Image 6](https://github.com/darksun27/zomentum-hiring-challenge/blob/master/screenshots/zomentum-task6.png)

