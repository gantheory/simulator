import React, { Component } from 'react';
import '../css/Introduction.css';
import RaisedButton from 'material-ui/RaisedButton';

class Simulator extends Component {
  constructor() {
    super();

    this.handleSimulatorOpen = this.handleSimulatorOpen.bind(this);
    this.handleFanpageOpen = this.handleFanpageOpen.bind(this);
    this.handleBuyOpen = this.handleBuyOpen.bind(this);
  }

  handleSimulatorOpen() {
    const width = 330;
    const height = 595;
    const left = (window.screen.width / 2) - ((width / 2) + 10);
    const top = (window.screen.height / 2) - ((height / 2) + 50);
    //window.open("http://localhost:3001", "Simulator", "height=" + height + ",width=" + width + ",top=" + top + ",left=" + left);
    window.open("https://simulator-cprzpqokpk.now.sh/", "Simulator", "height=" + height + ",width=" + width + ",top=" + top + ",left=" + left);
  }

  handleFanpageOpen() {
    window.open("https://www.facebook.com/TurturTuantuan/?ref=aymt_homepage_panel");
  }

  handleBuyOpen() {
    window.open("https://store.line.me/stickershop/product/1325681/zh-Hant");
  }

  render() {
    return (
      <div className="introduction">
        <div className="btns">
          <div className="buyBtn">
          <RaisedButton
            label="BUY"
            primary={true}
            onTouchTap={this.handleBuyOpen}
          />
          </div>
          <div className="fanpageBtn">
          <RaisedButton
            label="FANPAGE"
            primary={true}
            onTouchTap={this.handleFanpageOpen}
          />
          </div>
        </div>
        <div className="text">
          <h1>Turtur & Tuantuan</h1>
          <h1>Sticker Simulator</h1>
          <p>Enjoy our stickers!</p>
        </div>
        <div className="startBtn">
          <RaisedButton
            label="START"
            secondary={true}
            onTouchTap={this.handleSimulatorOpen}
          />
        </div>
      </div>
    );
  }
}

export default Simulator;
