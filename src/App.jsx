import { useState, useRef } from "react";

// 音階ファイルのインポート
import doMp3 from './pitch/do.mp3';
import reMp3 from './pitch/re.mp3';
import miMp3 from './pitch/mi.mp3';
import faMp3 from './pitch/fa.mp3';
import soMp3 from './pitch/so.mp3';
import laMp3 from './pitch/la.mp3';
import siMp3 from './pitch/si.mp3';

// 画像ファイル
import pitchKun from "./pitch_kun.png"

//音楽ファイル配列
const sounds = [
  ["ド",doMp3],
  ["レ",reMp3],
  ["ミ",miMp3],
  ["ファ",faMp3],
  ["ソ",soMp3],
  ["ラ",laMp3],
  ["シ",siMp3],
];



/**
 * 音階当てメイン関数
 */
export const App = () => {
  // 正解、試行回数
  const [correctNum, setCorrectNum] = useState(0);
  const [attemptNum, setAttemptNum] = useState(0);


  // ボタン状態
  const [startBtnState, setStartBtnState] = useState(true);
  const [stopBtnState, setStopBtnState] = useState(false);

  const [repeatBtnState, setRepeatBtnState] = useState(false);
  const [nextBtnState, setNextBtnState] = useState(false);
  
  const [doBtnState, setDoBtnState] = useState(false);
  const [reBtnState, setReBtnState] = useState(false);
  const [miBtnState, setMiBtnState] = useState(false);
  const [faBtnState, setFaBtnState] = useState(false);
  const [soBtnState, setSoBtnState] = useState(false);
  const [laBtnState, setLaBtnState] = useState(false);
  const [siBtnState, setSiBtnState] = useState(false);

  // 表示テキスト
  const [text, setText] = useState('　');

  // 問題の音楽番号
  const musicNumRef = useRef(0);

  // 訓練状態の有無
  const trainFlgRef = useRef(false);

  /**
   * ボタンを押した時の関数
   * @param {string|number} value ボタンを押したときの値
   */ 
  const onClickButton = (value) => {
    
    switch (value) { 
      case "start":
        trainFlgRef.current = false;
        musicNumRef.current = Math.floor(Math.random()*7);
        playMusic(sounds[musicNumRef.current][1]);
        changeAllBtnState(false);
        break;

      case "stop":
        setAttemptNum(0);
        setCorrectNum(0);
        setText("　");
        changeAllBtnState(true);
        break;
      
      case "repeat":
        playMusic(sounds[musicNumRef.current][1]);
        break;
      
      case "next":
        setText("　");
        musicNumRef.current = Math.floor(Math.random()*7);
        playMusic(sounds[musicNumRef.current][1]);
        break;

      default:
        if (!trainFlgRef.current){ setAttemptNum(attemptNum+1); } 

        playMusic(sounds[value][1]);
        if (musicNumRef.current==value){
          setText(`正解:音階${sounds[musicNumRef.current][0]},あなた${sounds[value][0]}`);
          if (!trainFlgRef.current){ setCorrectNum(correctNum+1); }
        }  else {
          setText(`不正解:音階${sounds[musicNumRef.current][0]},あなた${sounds[value][0]}`);
        }
        if (!trainFlgRef.current){ trainFlgRef.current=true; }
    }
  };

  /**
   * 音楽を流す関数
   * @param {string} music 再生する音楽ファイルパス
  */ 
  const playMusic = (music) => {
    const audio = new Audio(music);
    audio.play();
  }

  /**
   * ボタン状態を変更する関数
   * @param {boolean} startBtnState スタートボタンの状態
   */
  const changeAllBtnState = (startBtnState) => {
    setStartBtnState(startBtnState);
    setStopBtnState(!startBtnState);
    setRepeatBtnState(!startBtnState);
    setNextBtnState(!startBtnState);
    setDoBtnState(!startBtnState);
    setReBtnState(!startBtnState);
    setMiBtnState(!startBtnState);
    setFaBtnState(!startBtnState);
    setSoBtnState(!startBtnState);
    setLaBtnState(!startBtnState);
    setSiBtnState(!startBtnState);
  }

  return (
    <>
      
      <h1 className="fw-bolder">音階当てゲーム</h1>
      <p className="lead">音階を当てましょう！</p>
      <div>
        <button onClick={()=>{onClickButton("start")}} disabled={!startBtnState}>スタート</button>
        <button onClick={()=>{onClickButton("stop")}} disabled={!stopBtnState}>ストップ</button>
      </div>
      <p className="mb-0" > {text}</p>
      {attemptNum>0 ? <p>正解率{correctNum/attemptNum*100}% 正解{correctNum}/試行回数{attemptNum}</p>:<p>　</p>}
      <div>
        <button onClick={()=>{onClickButton("repeat")}} disabled={!repeatBtnState}>繰り返す</button>
        <button onClick={()=>{onClickButton("next")}} disabled={!nextBtnState}>次を聞く</button>
      </div>
      <div>
        <button onClick={()=>{onClickButton(0)}} disabled={!doBtnState}>ド</button>
        <button onClick={()=>{onClickButton(1)}} disabled={!reBtnState}>レ</button>
        <button onClick={()=>{onClickButton(2)}} disabled={!miBtnState}>ミ</button>
        <button onClick={()=>{onClickButton(3)}} disabled={!faBtnState}>ファ</button>
        <button onClick={()=>{onClickButton(4)}} disabled={!soBtnState}>ソ</button>
        <button onClick={()=>{onClickButton(5)}} disabled={!laBtnState}>ラ</button>
        <button onClick={()=>{onClickButton(6)}} disabled={!siBtnState}>シ</button>
      </div>
      <div className="mt-5">
        <img src={pitchKun} alt="背景イラスト" />
      </div>
    </>
  );
};

export default App;