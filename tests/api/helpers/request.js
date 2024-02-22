const url = "http://localhost:7070/v1";
class request {
  static async get(supertest, endpoint, status)  {
    return await supertest
      .request(url)
      .get(endpoint)
      .expect(status)
      .expect('Content-Type', /json/);
  }

  static async post(supertest, endpoint, status, body) {
    return await supertest
      .request(url)
      .post(endpoint)
      .expect(status)
      .expect('Content-Type', /json/)
      .send(body);
  }
}

module.exports = request