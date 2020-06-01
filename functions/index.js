const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const util = require('util');

const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});


exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const project = doc.data();
    const notification = {
      content: 'Added a new project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);

});

exports.userJoined = functions.auth.user()
  .onCreate(user => {

    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotification(notification);

      });
});

exports.getFavorites_v0 = functions.https.onCall(async(data, context) => {
  const userId = data.uid;
  if (userId) {
    console.log( `I am going to get favorits for user ${userId}` );
    const userDoc = await admin.firestore().doc(`users/${userId}`).get();
    const userData = userDoc.data();
    console.log(util.inspect(userData));
    if (!userData) {
      console.log('No favorites');
      return [];
    }
    const favorits = userData.favoritsList;
    const fetchPromises = [];
    favorits.forEach((restId) => {
      console.log(`Goin get data ${restId}`);
      const nextPromiss = admin.firestore().doc(`projects/${restId}`).get();
      fetchPromises.push(nextPromiss);
    });
    const snapshots = await Promise.all(fetchPromises);
      const responseArray = snapshots.map((snapshot) => {
        const snapData = snapshot.data();
        if (snapData) {
          snapData['id'] = snapshot.id;
        }
        return snapData;
      }).filter((item) => item);
      console.log('Done fetching' + (util.inspect(responseArray)));
      return responseArray;
  } else {
    console.log('No userId!');
    return [];
  }
});

exports.getFavorites_resty_v0 = functions.https.onRequest(async (request, response) => {
  const userId = request.query.uid;
  if (userId) {
    console.log( `I am going to get favorits for user ${userId}` );
    const userDoc = await admin.firestore().doc(`users/${userId}`).get();
    const userData = userDoc.data();
    console.log(util.inspect(userData));
    if (!userData) {
      response.send('No favorites');
      return;
    }
    const favorits = userData.favoritsList;
    const fetchPromises = [];
    favorits.forEach((restId) => {
      console.log(`Goin get data ${restId}`);
      const nextPromiss = admin.firestore().doc(`projects/${restId}`).get();
      fetchPromises.push(nextPromiss);
    });
    const snapshots = await Promise.all(fetchPromises);
      const responseArray = snapshots.map((snapshot) => {
        const snapData = snapshot.data();
        if (snapData) {
          snapData['.id'] = snapshot.id;
        }
        return snapData;
      });
      console.log('Done fetching' + (util.inspect(responseArray)));
  } else {
    response.send('All done!');
  }
});
