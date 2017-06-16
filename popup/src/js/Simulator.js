import React, { Component } from 'react';
import '../css/Simulator.css';
import Title from '../img/Title.png';
// eslint-disable-next-line
import ActiveReceive from '../img/ActiveReceive.png';
// eslint-disable-next-line
import InactiveReceive from '../img/InactiveReceive.png';
// eslint-disable-next-line
import ActiveSend from '../img/ActiveSend.png';
// eslint-disable-next-line
import InactiveSend from '../img/InactiveSend.png';
import ChatFeed from './ChatFeed';
import Message from './Message';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Simulator extends Component {
  constructor() {
    super();
    this.state = {
      urlStart: 13132726,
      imgs: [],
      text: '',
      messages: [],
      mode: 0, // 0 for "send", 1 for "receive"
      open: false,
    }
    this.handleImageClick = this.handleImageClick.bind(this);
    this.produceURL = this.produceURL.bind(this);

    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextKeyDown = this.handleTextKeyDown.bind(this);
  }

  componentDidMount() {
    const imgs = [];
    for (var i = this.state.urlStart ; i < this.state.urlStart + 40 ; i++) {
      const nowURL = this.produceURL(i);
      const ID = i;
      imgs.push(
        <img
          className="previewSticker"
          key={i}
          src={nowURL}
          alt=""
          onClick={(event) => this.handleImageClick(event, ID)}
        />
      );
      if ((i - this.state.urlStart) % 4 === 3) {
        imgs.push(<br key={i + 40} />);
      }
    }
    this.setState({
      imgs: imgs,
    });
  }

  componentDidUpdate() {
    if ((typeof this.refs.messages !== "undefined") && this.state.messages.length > 0) {
      this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
    }
  }

  handleImageClick(event, nowImageID) {
    const messages = this.state.messages;
    const imageID = nowImageID - 13132726;
    messages.push({
      id: this.state.messages.length,
      type: "img",
      mode: this.state.mode,
      content: this.produceURL(nowImageID),
    });
    fetch('/api/post', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageID: imageID,
      }),
    });
    for (var i = 0 ; i < 2 ; i += 1) {
      messages.push({
        id: this.state.messages.length,
        type: "text",
        mode: this.state.mode,
        content: "foobar",
        // for react-chat-ui
        chatUI: [new Message({
          id: this.state.mode,
          message: "foobar",
        })],
      });
    }
    this.setState({
      messages: messages,
    });
  }

  produceURL(nowImageID) {
    const url = 'http://dl.stickershop.line.naver.jp/products/0/0/1/1325681/android/stickers/';
    return url + nowImageID.toString() + '.png';
  }

  handleModeChange() {
    let nowMode = this.state.mode;
    nowMode = ( nowMode + 1 ) % 2;
    this.setState({
      mode: nowMode,
    })
  }

  handleTextChange(event) {
    this.setState({
      text: event.target.value,
    })
  }

  handleTextKeyDown(event) {
    if (event.keyCode === 13 && this.state.text !== "") {
      event.preventDefault();
      const messages = this.state.messages;
      messages.push({
        id: this.state.messages.length,
        type: "text",
        mode: this.state.mode,
        content: this.state.text,
        // for react-chat-ui
        chatUI: [new Message({
          id: this.state.mode,
          message: this.state.text,
        })],
      });
      this.setState({
        text: "",
        messages: messages,
      });
    }
  }

  render() {
    return (
      <div className="simulator">
        <img className="title" src={Title} alt="" />
        <div className="messages" ref="messages">
          {this.state.messages.map((message, i) =>
            (message.type === "img")
            ? (
              <img
                key={i}
                className={"messageImage" + message.mode.toString()}
                src={message.content}
                alt=""
              />
            )
            : (
              <div
                key={i}
                className={"messageText" + message.mode.toString()}
              >
              <ChatFeed
                messages={message.chatUI} // Boolean: list of message objects
                isTyping={false} // Boolean: is the recipient typing
                hasInputField={false} // Boolean: use our input, or use your own
                bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                // JSON: Custom bubble styles
                bubbleStyles={
                  {
                    text: {
                      fontSize: 12
                    },
                    chatbubble: {
                      borderRadius: 30,
                      padding: 10
                    }
                  }
                }
              />
              </div>
            )
          )}
        </div>
        <div className="textInputBlock">
          {(this.state.mode === 1)
            ? (
              <img
                className="activeReceive"
                src={ActiveReceive}
                alt=""
                onClick={this.handleModeChange}
              />
            )
            : (
              <img
                className="inactiveReceive"
                src={InactiveReceive}
                alt=""
                onClick={this.handleModeChange}
              />
            )
          }
          <input
            className="textInput"
            type="text"
            placeholder="Enter an message" // 86, 134, 135
            value={this.state.text}
            onChange={this.handleTextChange}
            onKeyDown={this.handleTextKeyDown}
          />
          {(this.state.mode === 0)
            ? (
              <img
                className="activeSend"
                src={ActiveSend}
                alt=""
                onClick={this.handleModeChange}
              />
            )
            : (
              <img
                className="inactiveSend"
                src={InactiveSend}
                alt=""
                onClick={this.handleModeChange}
              />
            )
          }
        </div>
        <div className="previewStickers">
          {this.state.imgs}
        </div>
      </div>
    );
  }
}

export default Simulator;
