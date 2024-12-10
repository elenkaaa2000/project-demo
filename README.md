# ProjectDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Start Rest-api Server: 
cd Rest-api --> npm start

## Base URL
The Base URL is the root URL for all of the API, if you ever make a request to the API and you get back a 404 NOT FOUND response then check the Base URL first.

The Base URL for the API is:

```https://localhost:3000/api```

The documentation below assumes you are prepending the Base URL to the endpoints in order to make requests.

## Authentication
This API isn't open API. Authentication is required to store and get data. You can use the connected REACT-app to make registration and sign in. This also means that I've limited what you can do. If you find a mistake, then just write an issue.

# Endpoints: Users

* ```/register``` -- signing up;
* ```/login``` -- signing in;
* ```/logout``` -- logging out;

## Register User
Signs up user and returns the registered data as json.

### URL --> ```/register```

### Method --> ```POST```

### Body -->

```
{
    "name":"John Doe",
    "email":"john@email.com",
    "username":"Johny",
    "password":"12345",
    "rePassword":"12345"
}
```

Required:

```email``` : [string] -- The email of the person is required and must be unique, also there is a minimum length of 10 chars;

```username``` : [string] -- The username of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

```password``` : [string] -- The password of the person is required and must be unique, also there is a minimum length of 4 chars, allowed are latin letters and numbers;

Not Required

```tel``` : [string] -- Optional;

### Success Response:

Code: 200

Content: 
``` 
{
    "gifts": [],
    "likedGifts": [],
    "bougthGifts": [],
    "_id": "5f1875690916010017964978",   
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 409 CONFLICT

Content: 
```
{
    "message": "This email/username is already registered!"
}
```

## Login User
Signs in user and returns the registered data as json.

### URL --> ```/login```

### Method --> ```POST```

### Body -->

```
{
    "email":"Johny",
    "password":"12345"
}
```

Required:

```email``` : [string] -- The email of the person 

```password``` : [string] -- The password of the person 

### Success Response:

Code: 200

Content: 
``` 
{
    "gifts": [],
    "likedGifts": [],
    "bougthGifts": [],
    "_id": "5f1875690916010017964978",   
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{ 
    "message": "Wrong username or password"
}
```

## Logout User
Logout user.

### URL --> ```/logout```

### Method --> ```POST```

### Success Response:

Code: 401 Unauthorized

Content: 
``` 
{ 
    "message": "Logged out!"
}
```

## Get user profile 
Return user profile information.

### URL --> ```/users/profile```

### Method --> ```GET```


## Edit user profile 
Return user profile information. Also in wishlist and shop cart, gifts which were liked or buy

### URL --> ```/users/profile```

### Method --> ```PUT```


## Remove item from shop cart

### URL --> ```/users/profile/:giftId/shop-cartRemove```

### Method --> ```PUT```



## Remove item from wishlist

### URL --> ```/users/profile/:giftId/wishlistRemove```

### Method --> ```PUT```


## Clear shop cart 
### URL --> ```/users```

### Method --> ```PUT```



## Endpoints Gift: 
return data in json 


## Get Last 3 added gifts

### URL --> ```/gifts/home```

### Method --> ```GET```




## Get All Gifts

### URL --> ```/gifts```

### Method --> ```GET```




## Get Gift Details


### URL --> ```/gifts/details/:giftId```

### Method --> ```GET```


## Create Gift 

### URL --> ```/gifts```

### Method --> ```POST```

Payload: {
category: "Women"
delivery: 2
description: "test"
imageUrl: "https://www.findgemstone.com/wp-content/uploads/2024/05/Is-Quartz-Formed-from-Volcanoes.jpg"
price: 1
title: "test",
userId: ...
}


## Edit Gift 
Edit Gift, if the user is the author of the post and returns the changed gift.

### URL --> ```/gifts/:giftId/edit```

### Method --> ```Put```

Payload: {
category: "Women"
delivery: 2
description: "test"
imageUrl: "https://www.findgemstone.com/wp-content/uploads/2024/05/Is-Quartz-Formed-from-Volcanoes.jpg"
price: 1
title: "test",
userId: ...
}


## Delete Gift
Deletes Gift if the user is the author of the post and redirect to catalog page

### URL --> ```/gifts/:giftId/delete```

### Method --> ```DELETE```


## Buy Gift
Buy Gift if the user is logged in but is not author.

### URL --> ```/gifts/:giftId/buy```

### Method --> ```Put```

## Like Gift
Like Gift if the user is logged in but is not author.

### URL --> ```/gifts/:giftId/buy```

### Method --> ```Put```



