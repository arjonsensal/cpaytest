let request = require("./helpers/request.js");
/**
 * Endpoints: 
  * GET 
  *   /v1/users
  *   /v1/withdrawals
  *   /v1/withdrawals/{id}
  * POST
  *   /v1/withdrawals/users/{userID}/payment-methods/{paymentMethodID}
 */
describe('Withdrawal Functionality', function () {

  /**
   * Test 1 : Normal Withdrawal - db should decrease the `maxWithdrawal` and `maxWithdrawals` after withdrawing
   * 1. Get 1 user from db and get userid and a payment method id
   * 2. Request a withdraw within the withdrawal amount, get withdrawl id
   * 3. Wait for 5 seconds to processed the payment
   * 4. Get withdrawal status via withdrawal id
   * 5. Get the users and assert `maxWithdrawal` and `maxWithdrawals` values
   */
  it('should decrease the withdrawal amount and max withdrawal after a request', async function(browser) {
    let supertest = browser.supertest;
    let withdrawID;
    let userID;
    let originalMaxWithdrawalAmount;
    let originalMaxWithdrawals;
    let paymentMethodID;
    // Get 1 user from db and get userid and a payment method id
    await request.get(supertest, "/users", 200)
      .then(async (getUserResponse) => {
        expect(getUserResponse._body.length).to.be.greaterThan(0, "/users should have data return");
        let user = getUserResponse._body[0];
        userID = user.id;
        originalMaxWithdrawalAmount = user.maxWithdrawalAmount;
        originalMaxWithdrawals = user.maxWithdrawals;
        paymentMethodID = user.paymentMethods[0].id;
        // Request a withdraw within the withdrawal amount, get withdrawl id
        await request.post(supertest, 
          `/withdrawals/users/${userID}/payment-methods/${paymentMethodID}`,
          200, 
          [{
            "amount": 1,
            "executeAt": new Date().toISOString(),
          }])
          .then(async (withdrawResponse) => {
            expect(withdrawResponse._body.length).to.be.greaterThan(0, "/withdrawals/users/{userID}/payment-methods/{paymentMethodID} should have data return");
          });
      });
      
    // Wait for 5 seconds to processed the payment
    await browser.pause(5000, async() => {
      request.get(supertest, `/withdrawals/${withdrawID}`, 200)
        .then(async (withdrawStatusResponse) => {
          expect(withdrawStatusResponse._body.status).to.be.equal("SUCCESS", "Successfully processed");
        });
    });

    // Get the users and assert `maxWithdrawal` and `maxWithdrawals` values
    await request.get(supertest, "/users", 200)
    .then((updatedUserResponse) => {
      expect(updatedUserResponse._body.length).to.be.greaterThan(0, "/users should have data return");

      // Assert the values should be same amount minus the difference from withdrawal amount earlier
      expect(updatedUserResponse._body[0].maxWithdrawalAmount).to.be.lessThan(originalMaxWithdrawalAmount, "amount should be less than the original amount");
      
      // Assert the values should be same amount minus 1 from withdrawal value earlier
      expect(updatedUserResponse._body[0].maxWithdrawals).to.be.lessThan(originalMaxWithdrawals, "withdrawals should be less than the original count");
    })
  });

  /**
   * Test 2: Higher Withdrawal amount than the amount on the account
   * 1. Get a user sample, get id, payment method, and maxWithdrawalAmount
   * 2. Request an amount higher than maxWithdrawalAmount
   * 3. Expect that the HTTP response code is 403 
   */
  it("should not accept the request if withdrawal amount is higher than maxWithdrawalAmount on account", async function({supertest}) {

    // Get a user sample, get id, payment method, and maxWithdrawalAmount
    await request.get(supertest, "/users", 200)
      .then(async (getUserResponse) => {
        expect(getUserResponse._body.length).to.be.greaterThan(0, "/users should have data return");
        let user = getUserResponse._body[0];
        let userID = user.id;
        let paymentMethodID = user.paymentMethods[0].id;
        let maxWithdrawalAmount = user.maxWithdrawalAmount;

        // Request an amount higher than maxWithdrawalAmount and expect the status code to be 403
        await request.post(supertest, `/withdrawals/users/${userID}/payment-methods/${paymentMethodID}`, 403, 
          [{
            "amount": maxWithdrawalAmount + 1,
            "executeAt": new Date().toISOString(),
          }])
      });
  });

  /**
   * Test 3: Withdrawing higher than the number of maxWithdrawals
   * 1. Get a user sample, get id, payment method, and maxWithdrawals
   * 2. Create a withdrawal request that will post a number of (maxWithdrawals + 1) times 
   * 3. Expect on the last call the status code is 403
   */
  it("should not accept the request if withdrawing more times than the maxWithdrawal count", async function(browser) {
    let supertest = browser.supertest;
    let postRequest = async (userID, paymentMethodID, status) => {
      await request.post(supertest, `/withdrawals/users/${userID}/payment-methods/${paymentMethodID}`, status, 
        [{
          "amount": 1,
          "executeAt": new Date().toISOString(),
        }])
    };

    // Get a user sample, get id, payment method, and maxWithdrawalAmount
    await request.get(supertest, "/users", 200)
      .then(async (getUserResponse) => {
        expect(getUserResponse._body.length).to.be.greaterThan(0, "/users should have data return");
        let user = getUserResponse._body[0];
        let maxWithdrawals = user.maxWithdrawals;
        let userID = user.id;
        let paymentMethodID = user.paymentMethods[0].id;

        // Request a withdrawal by maxWithdrawals number of times 
        let requestArray = [];
        for (let index = 0; index < maxWithdrawals; index++) {
          requestArray.push((postRequest(userID, paymentMethodID, 200)));
        }
        Promise.all(requestArray);
        
        // Expect on the last call the status code is 403
        await postRequest(userID, paymentMethodID, 403);
        });
  });  

  after((browser) => {
    browser.end();
  })
});