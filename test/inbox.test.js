const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); //capitalized constructor function
const web3 = new Web3(ganache.provider()); //connect web3 and ganache by provider
const { interface, bytecode } = require("../compile"); //import from compile.js

let accounts;
let inbox;
const initialMessage = "hello world";
beforeEach(async () => {
  //get a list of accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [initialMessage],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "hello world");
  });
  it("can change the message", async () => {
    await inbox.methods.setMessage("new world").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "new world");
  });
});
// class Car {
//   park() {
//     return "stopped";
//   }
//   drive() {
//     return "vroom";
//   }
// }

// let car;//global scope
// beforeEach(() => {
//   car = new Car();
// });
// describe("car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });
//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
