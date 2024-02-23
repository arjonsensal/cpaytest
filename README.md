CPAY Challenge Test

Installation: <br><br>
Install nodejs on your machine via https://nodejs.org/en preferably latest

Open the cmd or powershell and change directory to this folder 
```
cd /yourPath/cpaytest
```
then install dependencies using this command
```
npm install
```
or
for clean install
```
npm ci
```

Wait for the loading and after that you should be able to run the scripts

For the Programming Language used, I used Javascript. Mainly becaused this is my mainly used language and I like it. I could have used Java but I would have to install dependencies on my end 
and it could take a longer time for me to complete this test. For the framework tool used, I used Nightwatch.js as my framework since it's easy to install and use. Similar to Selenium this
tool also uses keyword driven test to test fields and also it can test rest api endpoint so using this tool was enough to test both UI and API on the challenge.

On the folder structure, you will notice the `tests` folder and thats where all the tests will be running. `api` for the api test and `ui` for the ui test.

Exercise 1: UI Test
For the UI Testing of the facebook login page I covered: 
1. Testing of the Login Functionality with the correct credentials - this should be the simplest and also a valuable go to test in every login function for every page
2. Testing of the Login Functionality with incorrect credentials - while the other one is a positive test, this one is a negative testing
3. Testing of the create button - While the other two are important, this should too as well
While this exercise challenge is specified as a UI, I automated the first two as a happy path scenario with the login functionality.

To run the test: 
```
npm run login-test
```
For test execution report:
for every run, there is an html-report that should automatically open in the browser

Exercise 2: <br>
Notable Issues: <br>
1. On the withdrawal instruction, It says you can only schedule for a date within the month. But after adding a UTC date with a next year date the request was still OK(200) when it should have been not.
2. Withdrawal endpoint issue 1 - After withdrawal request, the maxWithdrawalAmount and maxWithdrawal count did not change values.
3. Withdrawal endpoint issue 2 - During withdrawal request, I was able to request an amount higher than the maxWithdrawalAmount for a specific user
4. Withdrawal endpoint issue 3 - Was able to make a withdrawal request with incorrect payment method id and still returns 200
5. Withdrawal endpoint issue 4 - Was able to make a withdrawal request with incorrect user id and still returns 200

For the automated tests: <br>
1. Test of Normal Withdrawal, after withdrawal, the `maxWithdrawals` and `maxWithdrawalAmount` should decrease - I choose this one since this is critical, espcially with money involved. User should only be able to withdraw based on the amount in the account
2. Test of Higher Withdrawal amount, endpoint should not accept the request if withdrawal amount is higher than the `maxWithdrawalAmount` - Similar to first one, this should be tested as well since this leave the company/bank/client vulnerable to exploits involving money
3. Test of Withdrawal times, endpoint should not accept the request if withdrawing a number of times greater than the  `maxWithdrawals` - this one should be tested since this is to ensure the ATM/bank/client have suffiecient funds for others

Run the docker file on APIAutomation folder to run server <br>
To run the test: 
```
npm run api-test
```
If you encounter issues with running this test, like `AggregationError`, check if you are running the server from the docker file <br>
For test execution report:
for every run, there is an html-report that should automatically open in the browser
<br><br>
For a scheduled withdrawal automation: <br>
I could only suggest is to make a dynamic test script based on date and include it in daily run on pipeline of choice <br>
Example: <br>
Prerequisite: There should be 1 static user where no one else uses except for this script
Steps: <br>
1. Create a function/method that will make a request to check the most recent withdrawal status of the static user - there should be an endpoint similar to this
2. Create a function/method that will return a certain day within a week - for me I would choose every monday, now if it isn't monday it will not run the rest of script. -> this is possible with javascript using `new Date().getDay()` function.
   I went and look ahead for a possible condition for java and we can use the Calendar object for this
   ```
   Calendar cal = Calendar.getInstance();
   cal.setTime(theDate);
   boolean monday = cal.get(Calendar.DAY_OF_WEEK) == Calendar.MONDAY;
   ```
4. Now if today is a monday, the script will verify the status and at the same time, also create a new request
5. Done, this should be the main structure steps in verifying a scheduled withdrawal.   
