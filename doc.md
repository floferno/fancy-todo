# 1. POST /register

- **To create a new user**

## URL

```jsx
/register
```

## Method

```jsx
POST
```

## URL Params

```jsx
None
```

## Request Headers

```jsx
None
```

## Request Body

```jsx
email=[string]
password=[string]
```

## Success Response

```jsx
Code: 201
Response:
{
    "msg": "Registration successful",
    "id": 1,
    "email": "mlackmink@gmail.com"
}
```

## Error Response

```jsx
Code: 400
Response:
{
    "error": [
        "Email must be unique"
    ]
}

OR 

{
    "error": [
        "Invalid email format"
    ]
}

OR

{
    "error": [
        "Password must be at least 6 characters"
    ]
}
```



# 2. GET /login

- **To login with an existing account**

## URL

```jsx
/login
```

## Method

```jsx
GET
```

## URL Params

```jsx
None
```

## Request Headers

```jsx
None
```

## Request Body

```jsx
email=[string]
password=[string]
```

## Success Response

```jsx
Code: 200
Response:
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtbGFja21pbmtAZ21haWwuY29tIiwiaWF0IjoxNjQ1MzY1MzE4fQ.k0IzrEWzPbgiE9tdYwl_2aqxGCBAVS5ikUpZfjNUBsk"
}
```

## Error Response

```jsx
Code: 500
Response:
{
    "error": "Internal server error"
}
```


# 3. POST /todos

- **To add a new todo**

## URL

```jsx
/todos
```

## Method

```jsx
POST
```

## URL Params

```jsx
None
```

## Request Headers

```jsx
access_token=[string]
```

## Request Body

```jsx
title=[string]
description=[string]
status=[boolean]
due_date=[date]
```

## Success Response

```jsx
Code: 201
Response:
{
    "title": "ngoding",
    "description": "biar ada bahan nangis",
    "status": false,
    "due_date": "2022-12-12",
}
```

## Error Response

```jsx
Code: 500
Response:
{
    "error": "Internal server error"
}
```




# 4. GET /todos

- **To show all added todos**

## URL

```jsx
/todos
```

## Method

```jsx
GET
```

## URL Params

```jsx
None
```

## Request Headers

```jsx
access_token=[string]
```

## Request Body

```jsx
None
```

## Success Response

```jsx
Code: 200
Response:
[
    {
        "id": 1,
        "title": "merenung di bandung",
        "description": "ama bebeb dudung",
        "status": false,
        "due_date": "2022-12-12",
        "UserId": 1,
        "createdAt": "2022-02-20T14:02:33.277Z",
        "updatedAt": "2022-02-20T14:02:33.277Z"

    },
    {
        "id": 2,
        "title": "melali di bali",
        "description": "ama bli",
        "status": false,
        "due_date": "2022-12-12",
        "UserId": 1,
        "createdAt": "2022-02-20T14:02:33.277Z",
        "updatedAt": "2022-02-20T14:02:33.277Z"

    },
    {
        "id": 3,
        "title": "resing",
        "description": "sama maman",
        "status": false,
        "due_date": "2022-12-12",
        "UserId": 1,
        "createdAt": "2022-02-20T14:02:33.277Z",
        "updatedAt": "2022-02-20T14:02:33.277Z"

    }
]
```

## Error Response

```jsx
Code: 500
Response:
{
    "error": "Internal server error"
}
```






# 5. GET /todos/:id

- **To show a specific todo**

## URL

```jsx
/todos/:id
```

## Method

```jsx
GET
```

## URL Params

```jsx
/todos/3
```

## Request Headers

```jsx
access_token=[string]
```

## Request Body

```jsx
None
```

## Success Response

```jsx
Code: 200
Response:
{
    "id": 3,
    "title": "resing",
    "description": "sama maman",
    "status": false,
    "due_date": "2022-12-12",
    "UserId": 1,
    "createdAt": "2022-02-20T14:13:43.594Z",
    "updatedAt": "2022-02-20T14:13:43.594Z"
}
```

## Error Response

```jsx
Code: 401
Response:
{
    "error": "Not authorized"
}

OR 

Code: 500
Response:
{
    "error": "Internal server error"
}
```






# 6. PUT /todos/:id

- **To edit the entire data in a specific todo**

## URL

```jsx
/todos/:id
```

## Method

```jsx
PUT
```

## URL Params

```jsx
/todos/3
```

## Request Headers

```jsx
access_token=[string]
```

## Request Body

```jsx
title=[string]
description=[string]
status=[boolean]
due_date=[date]
```

## Success Response

```jsx
Code: 200
Response:
{
    "id": 3,
    "title": "resing lagi",
    "description": "sama luna cinta",
    "status": true,
    "due_date": "2022-11-11",
    "UserId": 1,
    "createdAt": "2022-02-20T14:13:43.594Z",
    "updatedAt": "2022-02-20T14:13:43.594Z"
}
```

## Error Response

```jsx
Code: 401
Response:
{
    "error": "Not authorized"
}

OR 

Code: 500
Response:
{
    "error": "Internal server error"
}
```





# 7. PATCH /todos/:id

- **To edit the one or some data but not entirely in a specific todo**

## URL

```jsx
/todos/:id
```

## Method

```jsx
PATCH
```

## URL Params

```jsx
/todos/3
```

## Request Headers

```jsx
access_token=[string]
```

## Request Body

```jsx
status=[boolean]
```

## Success Response

```jsx
Code: 200
Response:
{
    "id": 3,
    "title": "resing lagi",
    "description": "sama luna cinta",
    "status": false,
    "due_date": "2022-11-11",
    "UserId": 1,
    "createdAt": "2022-02-20T14:13:43.594Z",
    "updatedAt": "2022-02-20T14:13:43.594Z"
}
```

## Error Response

```jsx
Code: 401
Response:
{
    "error": "Not authorized"
}

OR 

Code: 500
Response:
{
    "error": "Internal server error"
}
```




# 8. DELETE /todos/:id

- **To delete a specific todo**

## URL

```jsx
/todos/:id
```

## Method

```jsx
DELETE
```

## URL Params

```jsx
/todos/3
```

## Request Headers

```jsx
access_token=[string]
```

## Request Body

```jsx
None
```

## Success Response

```jsx
Code: 200
Response:
{
    "msg": "Todo successfully deleted"
}
```

## Error Response

```jsx
Code: 401
Response:
{
    "error": "Not authorized"
}

OR 

Code: 500
Response:
{
    "error": "Internal server error"
}
```



# 8. GET /randomfunactivities
- **To show random fun activities**

## URL

```jsx
/randomfunactivities
```

## Method

```jsx
GET
```

## URL Params

```jsx
None
```

## Request Headers

```jsx
None
```

## Request Body

```jsx
None
```

## Success Response

```jsx
Code: 200
Response:
{
    "activity": "Take your dog on a walk",
    "type": "relaxation",
    "participants": 1
}
```

## Error Response

```jsx
Code: 500
Response:
{
    "error": "Internal server error"
}
```
