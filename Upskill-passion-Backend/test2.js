const { firestore } = require("./utilities/firebase-client");

const user = {
    name: "satya"
}
let b;
console.log(user);
user["age"] = 15;
console.log(user);

const a = 10;
if (a == 10) {
    b = 20
}
else {
    b = 40
}
console.log(b);