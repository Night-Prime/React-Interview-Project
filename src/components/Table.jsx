import React from "react";
import VideoList from "./VideoList";

const Table = () => {
  return (
    <div className="w-full flex flex-col justify-between flex-wrap bg-transparent px-12 mt-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center flex-shrink-0 text-white mr-6 ml-8">
          <h1 className="font-thin text-4xl tracking-tight">
            Today's Leaderboard
          </h1>
        </div>
        <div className="w-1/3 p-4">
          <div className="rounded-full bg-neutral-800 border text-neutral-400 border-neutral-800 flex flex-row justify-center items-center">
            <p className="text-sm px-2 py-3">30 May 2022</p>
            <span className="w-1 h-1 bg-neutral-400 rounded-full mr-2"></span>
            <span className="text-xs border px-2 py-2 bg-lime-400 border-lime-400 rounded-full">SUBMISSIONS OPEN</span>
            <span className="w-1 h-1 bg-neutral-400 rounded-full ml-2"></span>
            <p className="text-sm ml-2">11:34</p>
          </div>
        </div>
      </div>
      <VideoList />
    </div>
  );
};

export default Table;
