
class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0
    for (let x of this.transactions) {
      balance += x.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }
}

class Withdrawal extends Transaction{

  get value () {
    return -this.amount;
  }

  isAllowed() {
    if (this.account.balance - this.amount >= 0) {
      return true;
    }
    return false;
  }

}


class Deposit extends Transaction{

  get value () {
    return this.amount
  }

  isAllowed() {
    return true;
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected



const myAccount = new Account("snow-patrol");

const t1 = new Deposit(100, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

const t2 = new Withdrawal(150.25, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

const t3 = new Deposit(20, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

const t4 = new Withdrawal(50.25, myAccount);
t4.commit();
console.log('Transaction 4:', t4);

console.log('Ending balance:', myAccount.balance);


// t2 = new Withdrawal(9.99);
// t2.commit();
// console.log('Transaction 2:', t2);

// t3 = new Deposit(120.00);
// t3.commit();
// console.log('Transaction 3:', t3);

