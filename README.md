# Assignment 9-10: Thou shall not pass

This web app is rated **ERR**. It contains uncaught errors 💥 and bugs 🪲, which may not be suitable for general audiences. Strong SvelteKit guidance is advised.

In this assignment, you will be working on improving the error handling, implementing hooks, and enhancing prerendering in a SvelteKit web app. The goal is to enhance the user registration and login experience by fixing bugs and ensuring smooth navigation.

## Setup Instructions

1. Clone the starter repository to your local machine.
2. Install Node.js if you haven't already. You can download it from [nodejs.org](https://nodejs.org/).
3. Navigate to the project directory in your terminal.
4. Run `npm install` to install the project dependencies.
5. Run `npm run dev` to start the development server.
6. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the app.
7. Install a **[CORS Unblock](https://chromewebstore.google.com/detail/cors-unblock/)** extension to enable data fetching.
> **WARNING: Disable CORS Unblock immediately when not needed for the assignment, as bypassing CORS can pose security risks.**
8. You may use the user credentials provided below to login.

```
	username: upcsi
	password: iWryXeat9EQmB/zvKhd/5g==
```

## Scoring ( / 100 )

1. **[10 PTS] Error Hook:** Create a `handleError` hook that returns `message: Kaboom!`

2. **[10 PTS] Fast Page Navigation:** Clicking the `Data` link located in the `Dashboard` page after logging in seems a bit slow. Enhance the speed of navigation for a smoother user experience.

3. **[10 PTS] Reloading :** Clicking the `Logout` link located in the `Dashboard` page after logging in does not log the user out completely. Fix this security issue.

4. **[10 PTS] Hardcoded User Password:** The password for the `seed_user` is not secure. Please address this security vulnerability. Note that the web app needs to run in order to access the environment variables.

Edit `signup/+page.server.ts` such that:

5. **[5 PTS] Username Requirement**: If no username is provided, the user registration process should return a **validation error with a status code of 422**, and an error message should be returned indicating that a username is required.

6. **[5 PTS] Password Requirement**: If no password is provided, the user registration process should return a **validation error with a status code of 422**, and an error message should be returned indicating that a password is required.

7. **[5 PTS] Minimum Password Length**: If the length of the password **is less than 8 characters**, the user registration process should return a **validation error with a status code of 422**, and an error message should be returned indicating that the password must be at least 8 characters long.

8. **[5 PTS] Password Matching**: If the password and the password confirmation do not match, the user registration process should return a **validation error with a status code of 422**, and an error message should be returned indicating that the passwords must match.

9. **[5 PTS] Password Complexity**: If the password does not contain **at least one uppercase letter, one number, and one special character**, the user registration process should return a **validation error with a status code of 422**, and an error message should be returned indicating that the password must contain at least one special character, one number, and one uppercase letter. Use this regex statement to find the special characters: `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/`

10. **[5 PTS] User Already Exists**: If the user is already registered in the database, the user registration process should return a **validation error with a status code of 422**, and an error message should be returned indicating that the username is already registered.

Edit `login/cookie.ts` such that:

11. **[30 PTS] Too many login attempts:** If the users fails to input the correct password for **5 attempts**, the login process should **throw an error**. If the login attempts are below 5, an `Err` object must only be **returned**.

### BONUS

- **[10 PTS] hAcKEr_kAbA:** Decrypt the 128-bit AES encryption of the password for the `upcsi` user and set it as the new header title. (Hint: the secret key is contained in the `README` file)

## Credits

This assignment is modified based on **[SvelteKit Auth Example](https://github.com/danawoodman/sveltekit-auth-example)**, which is licensed under the MIT License.

The original author of **SvelteKit Auth Example** is [Dana Woodman](https://github.com/danawoodman).
