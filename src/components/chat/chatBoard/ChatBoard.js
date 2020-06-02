import React, { Component } from 'react';
import firebase, { db } from '../../../config/fb.config';
import moment from 'moment';

class ChatBoard extends Component {
   constructor(props) {
   super(props)
   this.state = {
      isLoading: false,
      isShowSticker: false,
      inputValue: ''
   }
   this.listMessage = []
   this.currentPeerUser = this.props.currentPeerUser
   this.messages = this.props.messages
   this.groupChatId = null
   this.removeListener = null
   this.currentPhotoFile = null
   }


//   componentDidUpdate() {
//    this.scrollToBottom()
// }

//    scrollToBottom = () => {
//       if (this.messagesEnd) {
//        this.messagesEnd.scrollIntoView({})
//       }
//    }

   componentDidMount() {
   // For first render, it's not go through componentWillReceiveProps
      //this.getListHistory()
      console.log(this.currentPeerUser.uid, 'this.currentPeerUser')
      console.log(this.messages);
      this.messages.map(message => {
         if (this.currentPeerUser.uid === message.uidTo) {
            console.log(message.authorId, 'message.authorId');
            console.log(message.uidTo, 'message.uidTo');
            console.log(this.currentPeerUser.uid, 'this.currentPeerUser.uid');
         } else {
            console.log('no');
         }
      })
   }

   componentWillUnmount() {
      if (this.removeListener) {
          this.removeListener()
      }
  }

   getListHistory = () => {
      if (this.removeListener) {
          this.removeListener()
      }
      this.listMessage.length = 0
      this.setState({isLoading: true})
      if (
          this.hashString(this.currentUserId) <=
          this.hashString(this.currentPeerUser.authorId)
      ) {
          this.groupChatId = `${this.currentUserId}-${this.currentPeerUser.authorId}`
      } else {
          this.groupChatId = `${this.currentPeerUser.authorId}-${this.currentUserId}`
      }

      // Get history and listen new data added
      this.removeListener = db
          .collection('message')
          .doc(this.groupChatId)
          .collection(this.groupChatId)
          .onSnapshot(
              snapshot => {
                  snapshot.docChanges().forEach(change => {
                      if (change.type === 'added') {
                          this.listMessage.push(change.doc.data())
                      }
                  })
                  this.setState({isLoading: false})
              },
              err => {
                  this.props.showToast(0, err.toString())
              }
          )
  }

  openListSticker = () => {
   this.setState({isShowSticker: !this.state.isShowSticker})
}


onSendMessage = (content, type) => {
   // if (this.state.isShowSticker && type === 2) {
   //     this.setState({isShowSticker: false})
   // }

   if (content.trim() === '') {
       return
   }

   const timestamp = moment()
       .valueOf()
       .toString()

   const itemMessage = {
       idFrom: this.currentUserId,
       idTo: this.currentPeerUser.id,
       timestamp: timestamp,
       content: content.trim(),
       type: type
   }

   db
       .collection('messages')
       .doc(this.groupChatId)
       .collection(this.groupChatId)
       .doc(timestamp)
       .set(itemMessage)
       .then(() => {
           this.setState({inputValue: ''})
       })
       .catch(err => {
           this.props.showToast(0, err.toString())
       })
}


   render() {
         let messageRender = this.messages.map(message => {
            // console.log(this.currentPeerUser.uid === message.uidTo, 'this.currentPeerUser.uid === message.uidTo')
            // console.log(this.currentPeerUser.uid != message.uidTo, 'this.currentPeerUser.uid === message.uidTo !=')

            if (this.currentPeerUser.uid === message.uidTo) {
               return (
               <div>
                  {message.message}
                 <b>{message.authorFirstName} {message.authorLastName}</b>
               </div>
               )
            }
            // else if (this.currentPeerUser.uid != message.uidTo) {
            //    return (
            //       <div>
            //          {messageRender = null}
            //       </div>
            //     )
            // }
         })
      return (
         <div className="container">
             {/* <h2>Chat Board</h2> */}
               <div>
                  {messageRender}
               </div>
         </div>
      )
   }

//    renderListMessage = () => {
//       if (this.listMessage.length > 0) {
//           let viewListMessage = []
//           this.listMessage.forEach((item, index) => {
//               if (item.idFrom === this.currentUserId) {
//                   // Item right (my message)
//                   if (item.type === 0) {
//                       viewListMessage.push(
//                           <div className="viewItemRight" key={item.timestamp}>
//                               <span className="textContentItem">{item.content}</span>
//                           </div>
//                       )
//                   } else if (item.type === 1) {
//                       viewListMessage.push(
//                           <div className="viewItemRight2" key={item.timestamp}>
//                               <img
//                                   className="imgItemRight"
//                                   src={item.content}
//                                   alt="content message"
//                               />
//                           </div>
//                       )
//                   } else {
//                       viewListMessage.push(
//                           <div className="viewItemRight3" key={item.timestamp}>
//                               <img
//                                   className="imgItemRight"
//                                   src={this.getGifImage(item.content)}
//                                   alt="content message"
//                               />
//                           </div>
//                       )
//                   }
//               } else {
//                   // Item left (peer message)
//                   if (item.type === 0) {
//                       viewListMessage.push(
//                           <div className="viewWrapItemLeft" key={item.timestamp}>
//                               <div className="viewWrapItemLeft3">
//                                   {this.isLastMessageLeft(index) ? (
//                                       <img
//                                           src={this.currentPeerUser.photoUrl}
//                                           alt="avatar"
//                                           className="peerAvatarLeft"
//                                       />
//                                   ) : (
//                                       <div className="viewPaddingLeft"/>
//                                   )}
//                                   <div className="viewItemLeft">
//                                       <span className="textContentItem">{item.content}</span>
//                                   </div>
//                               </div>
//                               {this.isLastMessageLeft(index) ? (
//                                   <span className="textTimeLeft">
//                   {moment(Number(item.timestamp)).format('ll')}
//                 </span>
//                               ) : null}
//                           </div>
//                       )
//                   } else if (item.type === 1) {
//                       viewListMessage.push(
//                           <div className="viewWrapItemLeft2" key={item.timestamp}>
//                               <div className="viewWrapItemLeft3">
//                                   {this.isLastMessageLeft(index) ? (
//                                       <img
//                                           src={this.currentPeerUser.photoUrl}
//                                           alt="avatar"
//                                           className="peerAvatarLeft"
//                                       />
//                                   ) : (
//                                       <div className="viewPaddingLeft"/>
//                                   )}
//                                   <div className="viewItemLeft2">
//                                       <img
//                                           className="imgItemLeft"
//                                           src={item.content}
//                                           alt="content message"
//                                       />
//                                   </div>
//                               </div>
//                               {this.isLastMessageLeft(index) ? (
//                                   <span className="textTimeLeft">
//                   {moment(Number(item.timestamp)).format('ll')}
//                 </span>
//                               ) : null}
//                           </div>
//                       )
//                   } else {
//                       viewListMessage.push(
//                           <div className="viewWrapItemLeft2" key={item.timestamp}>
//                               <div className="viewWrapItemLeft3">
//                                   {this.isLastMessageLeft(index) ? (
//                                       <img
//                                           src={this.currentPeerUser.photoUrl}
//                                           alt="avatar"
//                                           className="peerAvatarLeft"
//                                       />
//                                   ) : (
//                                       <div className="viewPaddingLeft"/>
//                                   )}
//                                   <div className="viewItemLeft3" key={item.timestamp}>
//                                       <img
//                                           className="imgItemLeft"
//                                           src={this.getGifImage(item.content)}
//                                           alt="content message"
//                                       />
//                                   </div>
//                               </div>
//                               {this.isLastMessageLeft(index) ? (
//                                   <span className="textTimeLeft">
//                   {moment(Number(item.timestamp)).format('ll')}
//                 </span>
//                               ) : null}
//                           </div>
//                       )
//                   }
//               }
//           })
//           return viewListMessage
//       } else {
//           return (
//               <div className="viewWrapSayHi">
//                   <span className="textSayHi">Say hi to new friend</span>
//                   {/* <img
//                       className="imgWaveHand"
//                       src={images.ic_wave_hand}
//                       alt="wave hand"
//                   /> */}
//               </div>
//           )
//       }
//   }

}

export default ChatBoard;