"use client";
import Image from "next/image";
import buzz from "../../public/buzz.jpg";
import noob from "../../public/noob.png";
import cooked from "../../public/cooked.png";
import youlose from "../../public/youlose.png";
import { Progress } from "@/components/ui/progress"
import { useClickSound } from "./sound";
import { useAutoRandomAttacks } from "./useAutoRandomAttacks";
import React, { useState, useRef, useEffect, useMemo } from "react";


export default function Home() {

  const [snowmanHealth, setSnowmanHealth] = useState(1000);
  const [playerHealth, setPlayerHealth] = useState(1000);
  const [photo, setPhoto] = useState(buzz);
  const [playerphoto, setPlayerPhoto] = useState(noob);
  const getBlasted = useClickSound("/sounds/getBlasted.mp3");
  const omg = useClickSound("/sounds/tiktok.mp3");
  const steve = useClickSound("/sounds/minecraft.mp3");
  const ohh = useClickSound("/sounds/ohhh.mp3");
  const btn =
    "inline-flex items-center justify-center rounded-2xl border " +
    "border-neutral-300 bg-white px-5 py-4 text-lg font-semibold text-neutral-800 " +
    "shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md " +
    "active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 " +
    "dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700";

    const card = `
    rounded-2xl border border-zinc-200 bg-white p-4
    shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
  `;

  const card1 =
  "w-full inline-flex items-center justify-center rounded-2xl border " +
  "border-neutral-300 bg-white px-5 py-4 text-lg font-semibold text-neutral-800 " +
  "shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ";


  function handleRizz() {
    if ((snowmanHealth - 10) >= 0 )
    {
      if (playerHealth > 0){
        setSnowmanHealth(snowmanHealth - 10);
      }
      
    } 
    else
    {
      setSnowmanHealth(0);
      setPhoto(cooked);
    }
  }
  
  function kissthecheek() {
    if ((snowmanHealth - 30) >= 0 )
    {
      if (playerHealth > 0){
        setSnowmanHealth(snowmanHealth - 30);
      }
    } 
    else
    {
      setSnowmanHealth(0);
      setPhoto(cooked);
    }
  }

  function SlapBro() {
    if ((snowmanHealth - 50) >= 0)
    {
      if (playerHealth > 0){
        setSnowmanHealth(snowmanHealth - 50);
      }
    } 
    else
    {
      setSnowmanHealth(0);
      setPhoto(cooked);
    }
  }

  function OneShot(){
    if (snowmanHealth> 0){
      if (playerHealth > 0){
        setSnowmanHealth(0);
        setPhoto(cooked);
      }
      
    }
    
  }
  
  function handleSnowmanAttack1() {
    setPlayerHealth(h => {
      const next = Math.max(0, h - 5);
      if (next === 0 && h > 0) setPhoto(cooked); // fired only on the transition to 0
      return next;
    });
  }
  
  function handleSnowmanAttack2() {
    setPlayerHealth(h => {
      const next = Math.max(0, h - 30);
      if (next === 0 && h > 0) setPhoto(cooked);
      return next;
    });
  }
  
  function handleSnowmanAttack3() {
    setPlayerHealth(h => {
      const next = Math.max(0, h - 100);
      if (next === 0 && h > 0) setPhoto(cooked);
      return next;
    });
  }
  
  function handleSnowmanAttack4() {
    setPlayerHealth(h => {
      const next = Math.max(0, h - 250);
      if (next === 0 && h > 0) setPhoto(cooked);
      return next;
    });
  }


  function restart(){
    setPlayerHealth(1000);
    setSnowmanHealth(1000);
    setPhoto(buzz);
    setPlayerPhoto(noob);
  }

  const actions = useMemo(
    () => [handleSnowmanAttack1, handleSnowmanAttack2, handleSnowmanAttack3, handleSnowmanAttack4],
    [handleSnowmanAttack1, handleSnowmanAttack2, handleSnowmanAttack3, handleSnowmanAttack4]
  );
  const alive = snowmanHealth != 0 && playerHealth != 0;
  useAutoRandomAttacks(actions, alive, 2000);
  
  
  useEffect(() => {
    if(playerHealth <= 0){
      setPlayerPhoto(youlose);
    }
    }, [playerHealth]);


   
  



  return (

    <div>
        <h1 className="text-6xl font-extrabold text-center font-serif "> BATTLE TO THE DEATH </h1>
      <div className="flex justify-evenly"> 
        <div className={card}>
          <div id="player" className="font-bold mt-4 mb-2">{playerHealth} Health (This is you btw)</div>
          <Progress className="bg-red" value={playerHealth / 10 } />
          <Image src={playerphoto} alt="the player" width={600} height={600} />
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <button className={btn} onClick={() => {handleRizz(); steve();}}>Punch - 10</button>
          <button className={btn} onClick={() => {kissthecheek(); steve();}}>Blow a kiss -30</button>
          <button className={btn} onClick={() => {SlapBro(); ohh();}}>Slap him -50</button>
          <button className={btn} onClick={() => {OneShot(); getBlasted(); omg();}}>OneShot this mf</button>
          </div>
        </div>
        <div className={card1}>
          
          <div id="buzzy" className="font-bold mt-4 mb-2">{snowmanHealth} Health</div>
          <div className="grid grid-cols-2">
          <Progress className="bg-red" value={snowmanHealth / 10 } />
          
          <div id="buzzgoofyah" className="font-bold mt-4 mb-2"></div>
          <Image src={photo} alt="your opp" width={300} height={300} />
          </div>
        </div>
      </div>
      <button className="col-span-2 w-full inline-flex items-center justify-center rounded-2xl border
                     border-transparent bg-red-300 text-white px-5 py-4 text-lg font-semibold
                     shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md" onClick={() => {restart();}}>Restart</button>
      </div>
  );

}
