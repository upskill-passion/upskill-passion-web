const { Firestore } = require('@google-cloud/firestore');
const CREDENTIALS = require('./gdsc-solution-challenge-ca597-firebase-adminsdk-6xeqp-9cd685e569.json');

const firestore = new Firestore({
    projectId: CREDENTIALS.project_id,
    credentials: {
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    }
});

const db = firestore.collection('queries');
const dbb = firestore.collection('blogs');
module.exports = {
    db,
    dbb,
    firestore
};