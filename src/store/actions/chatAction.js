export const createMessage = (message) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {

      console.log(message, 'message');
    //make async call db
   const firestore = getFirestore();

   const profile = getState().firebase.profile;
   const authorId = getState().firebase.auth.uid;

    firestore.collection('messages').add({
      ...message,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createAt: new Date()
      }).then(() => {
         dispatch({ type: 'CREATE_MESSAGE', message });
      }).catch((err) => {
         dispatch({type: 'CREATE_MESSAGE_ERROR', err})
      })
   }
};

// export const loadMessages = () => {
//    // Create the query to load the last 12 messages and listen for new ones.
//    var query = firebase.firestore().collection('messages').orderBy('timestamp', 'desc').limit(12);
   
//    // Start listening to the query.
//    query.onSnapshot(function(snapshot) {
//      snapshot.docChanges().forEach(function(change) {
//        if (change.type === 'removed') {
//          deleteMessage(change.doc.id);
//        } else {
//          var message = change.doc.data();
//          displayMessage(change.doc.id, message.timestamp, message.name,
//                        message.text, message.profilePicUrl, message.imageUrl);
//        }
//      });
//    });
//  }

//  // Displays a Message in the UI.
// function displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
//    var div = document.getElementById(id) || createAndInsertMessage(id, timestamp);
 
//    // profile picture
//    if (picUrl) {
//      div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
//    }
 
//    div.querySelector('.name').textContent = name;
//    var messageElement = div.querySelector('.message');
 
//    if (text) { // If the message is text.
//      messageElement.textContent = text;
//      // Replace all line breaks by <br>.
//      messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
//    } else if (imageUrl) { // If the message is an image.
//      var image = document.createElement('img');
//      image.addEventListener('load', function() {
//        messageListElement.scrollTop = messageListElement.scrollHeight;
//      });
//      image.src = imageUrl + '&' + new Date().getTime();
//      messageElement.innerHTML = '';
//      messageElement.appendChild(image);
//    }
//    // Show the card fading-in and scroll to view the new message.
//    setTimeout(function() {div.classList.add('visible')}, 1);
//    messageListElement.scrollTop = messageListElement.scrollHeight;
//    messageInputElement.focus();
//  }

