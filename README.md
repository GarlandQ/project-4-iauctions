[![Work in Repl.it](https://classroom.github.com/assets/work-in-replit-14baed9a392b3a25080506f3b7b6d57f295ec2978f6f33ec97e36a161684cbe9.svg)](https://classroom.github.com/online_ide?assignment_repo_id=4554580&assignment_repo_type=AssignmentRepo)
# Project 4 | **iAuctions-api**

**iAuctions-api** - iAuctions-api is a RESTful api to an eBay-like e-commerce auction site that will allow users to post auction listings, categorize listings, place bids on listings and comment on those listings.

Time spent: **~6** hours spent in total

## User Stories

The following **required** functionality is completed:

### AUTH

- [X] A user can `signup` for an account by submitting a POST request to /signup/ containing an email an password. The endpoint should return
an auth token
- [X] A user can `login` to the api by submitting a POST request to /login/ containing an email an password of a valid user. The endpoint should return
an auth token
- [X] All endpoints except the `login` and `signup` endpoints require a valid Authorization token in the request Headers as a Bearer Token

### USERS

- [X] A user can get a list of users by submitting a GET request to /users/
- [X] A user can create another user by submitting a POST request to /users/. The request should contain a valid email and password
- [X] A user can get a details about a user by submitting a GET request to /users/id. The response contains all the listings created by this user
- [X] A user can get a update her email and password by submitting a PATCH request to /users/id. A user can only edit her own email and password but not others
- [X] A user can get a delete her account by submitting a DELETE request to /users/id.

### CATEGORIES

- [X] A user can get a list of categories by submitting a GET request to /categories/
  - SAMPLE RESPONSE

  ```json
    [
      {
          "id": 1,
          "name": "Phone Cases",
          "createdAt": "2021-03-15T02:42:35.451Z",
          "updatedAt": "2021-03-15T02:42:35.451Z"
      },
      {
          "id": 2,
          "name": "Apples",
          "createdAt": "2021-03-15T02:54:55.897Z",
          "updatedAt": "2021-03-15T02:54:55.897Z"
      }
    ]
  ```

- [X] A user can create a category by submitting a POST request to /categories/
  - SAMPLE REQUEST

  ```json
    {
        "name": "new category"
    }
  ```

  - SAMPLE RESPONSE

  ```json
    {
      "id": 3,
      "name": "new category",
      "updatedAt": "2021-03-15T02:58:46.380Z",
      "createdAt": "2021-03-15T02:58:46.380Z"
    }
  ```

- [X] A user can get a details about a category by submitting a GET request to /categories/id. The Response should contain any listings associated with that category
  - SAMPLE RESPONSE

  ```json
    {
      "id": 1,
      "name": "Phone Cases",
      "createdAt": "2021-03-15T02:42:35.451Z",
      "updatedAt": "2021-03-15T02:42:35.451Z",
      "listings": [
          {
              "id": 4,
              "title": "Testing",
              "price": 100000000,
              "description": null,
              "userId": 3,
              "categoryId": 1,
              "createdAt": "2021-03-15T02:52:37.375Z",
              "updatedAt": "2021-03-15T02:57:56.223Z"
          }
      ]
    }
  ```

- [X] A user can get a modify a category by submitting a PATCH request to /category/id/.
  - SAMPLE REQUEST

  ```json
    {
      "name": "new category yo"
    }
  ```

  - SAMPLE RESPONSE

  ```json
    {
      "id": 2,
      "name": "new category yo",
      "createdAt": "2021-03-15T02:54:55.897Z",
      "updatedAt": "2021-03-15T03:00:55.756Z",
    }
  ```

- [X] A user can delete a category by submitting a DELETE request to /categories/id. The endpoint should return the deleted category or 204 NO CONTENT

### LISTINGS

- [X] A user can get a list of listings by submitting a GET request to /listings/
  - SAMPLE RESPONSE

  ```json
    [
      {
          "id": 1,
          "title": "Beef Cutter",
          "price": 5000,
          "description": "An authentic beef cutter",
          "userId": 1,
          "categoryId": null,
          "createdAt": "2021-03-09T06:06:07.883Z",
          "updatedAt": "2021-03-09T06:06:07.883Z"
      },
      {
          "id": 2,
          "title": "Beef Slicer",
          "price": 7000,
          "description": "An authentic beef slicer",
          "userId": 1,
          "categoryId": null,
          "createdAt": "2021-03-09T06:06:07.883Z",
          "updatedAt": "2021-03-09T06:06:07.883Z"
      }
    ]
  ```

- [X] A user can create a listing by submitting a POST request to /listings/
  - SAMPLE REQUEST (description and category are optional)

  ```json
    {
      "title": "Phone case",
      "price": 300,
      "description": "Amazing phone case yo",
      "categoryId": 1
    }
  ```

  - SAMPLE RESPONSE

  ```json
    {
      "id": 3,
      "title": "Phone case",
      "price": 300,
      "description": "Amazing phone case yo",
      "categoryId": 1,
      "userId": 3,
      "updatedAt": "2021-03-15T02:42:48.519Z",
      "createdAt": "2021-03-15T02:42:48.519Z"
    },
  ```

- [X] A user can get a details about a listing by submitting a GET request to /listings/id. The Response should contain any comments & bids
  - SAMPLE RESPONSE

  ```json
    {
      "id": 1,
      "title": "Beef Cutter",
      "price": 100000000,
      "description": "An authentic beef cutter",
      "userId": 1,
      "categoryId": null,
      "createdAt": "2021-03-09T06:06:07.883Z",
      "updatedAt": "2021-03-15T02:47:23.363Z",
      "comments": [
          {
              "id": 1,
              "description": "whoooaaaaa",
              "userId": 3,
              "listingId": 1,
              "createdAt": "2021-03-15T02:47:08.288Z",
              "updatedAt": "2021-03-15T02:47:08.288Z"
          }
      ],
      "bids": [
          {
              "id": 1,
              "amount": 100000000,
              "userId": 3,
              "listingId": 1,
              "createdAt": "2021-03-15T02:47:23.342Z",
              "updatedAt": "2021-03-15T02:47:23.342Z"
          }
      ]
    }
  ```

- [X] A user can get a modify a listing by submitting a PATCH request to /listings/id. A user can only edit her own listings.
  - SAMPLE REQUEST

  ```json
    {
      "categoryId": 2
    }
  ```

  - SAMPLE RESPONSE

  ```json
    {
      "id": 3,
      "title": "Phone case",
      "price": 300,
      "description": "Amazing phone case yo",
      "categoryId": 2,
      "userId": 3,
      "updatedAt": "2021-03-15T02:42:48.519Z",
      "createdAt": "2021-03-15T02:42:48.519Z"
    },
  ```

- [X] A user can delete a listing by submitting a DELETE request to /listings/id. The endpoint should return the deleted listing or 204 NO CONTENT

- [X] A user can create add a comment to a listing by submitting a POST request to /listings/id/comments/. The comment is automatically associated with the user who submitted the comment
  - SAMPLE REQUEST

  ```json
    {
      "description": "whooooaaaaa"
    }
  ```

  - SAMPLE RESPONSE

  ```json
    {
      "id": 1,
      "title": "Beef Cutter",
      "price": 100000000,
      "description": "An authentic beef cutter",
      "userId": 1,
      "categoryId": null,
      "createdAt": "2021-03-09T06:06:07.883Z",
      "updatedAt": "2021-03-15T02:47:23.363Z",
      "comments": [
          {
              "id": 1,
              "description": "whoooaaaaa",
              "userId": 3,
              "listingId": 1,
              "createdAt": "2021-03-15T02:47:08.288Z",
              "updatedAt": "2021-03-15T02:47:08.288Z"
          }
      ],
      "bids": [
          {
              "id": 1,
              "amount": 100000000,
              "userId": 3,
              "listingId": 1,
              "createdAt": "2021-03-15T02:47:23.342Z",
              "updatedAt": "2021-03-15T02:47:23.342Z"
          }
      ]
    }
  ```

- [X] A user can create add a bid to a listing by submitting a POST request to /listings/id/bids/. The bid is automatically associated with the user who submitted the bid. If the bid amount is less than or equal to the listing price, the request is rejected and an error message is returned. If the bid amount is greater than the listing price, the bid is saved and the listing price is updated to the bid amount
  - SAMPLE REQUEST

  ```json
    {
        "amount": 100000000
    }
  ```

  - SAMPLE RESPONSE

  ```json
    {
      "id": 1,
      "title": "Beef Cutter",
      "price": 100000000,
      "description": "An authentic beef cutter",
      "userId": 1,
      "categoryId": null,
      "createdAt": "2021-03-09T06:06:07.883Z",
      "updatedAt": "2021-03-15T02:47:23.363Z",
      "comments": [
          {
              "id": 1,
              "description": "whoooaaaaa",
              "userId": 3,
              "listingId": 1,
              "createdAt": "2021-03-15T02:47:08.288Z",
              "updatedAt": "2021-03-15T02:47:08.288Z"
          }
      ],
      "bids": [
          {
              "id": 1,
              "amount": 100000000,
              "userId": 3,
              "listingId": 1,
              "createdAt": "2021-03-15T02:47:23.342Z",
              "updatedAt": "2021-03-15T02:47:23.342Z"
          }
      ]
    }
  ```

The following **optional** functionality is completed:

- [ ] A user can edit her comments
- [ ] A user can delete her comments
- [ ] Listings have an expiry date 1 hour (for easy testing) from its creation, after the expiry date, no more bids can be submitted

## TESTING

Lines Code Coverage: 69%

## Video Walkthrough

Here's a walkthrough of implemented user stories:

[<img src="https://img.youtube.com/vi/wYnXVdxWgJY/maxresdefault.jpg" width="50%">](https://youtu.be/wYnXVdxWgJY)


## Notes

Describe any challenges encountered while building the app.

When it came to this project, there was not much challenging aspects as previous projects and assignments covered many of the basics of the methods used
for this project. Aside from learning how all the models and functions work together to create the API, implementing the user stories did not seem much
of an issue afterwards.


## License

    Copyright [Year] [Name]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
