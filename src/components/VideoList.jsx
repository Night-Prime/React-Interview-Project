import React, { useState, useEffect } from "react";
import MkdSDK from "../utils/MkdSDK";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  let sdk = new MkdSDK();

  React.useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(
        "https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE",
        {
          method: "POST",
          headers: sdk.getHeader(),
          body: JSON.stringify({
            payload: {},
            page: page,
            limit: 10,
          }),
        }
      );

      const data = await response.json();
      console.log(data.list);
      setVideos(data.list);
      setTotalPages(data.num_pages);
    };

    fetchVideos();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-row flex-end items-end ml-16">
      <div className="text-xs">
        <div>
          {videos.map((video) => (
            <span className="h-1/8 flex flex-row flex-start items-center py-2" key={video.id}>
              <span>
                <img className="w-16 h-8" src={video.photo} alt="image" />
              </span>
              <span className="ml-52 w-64 font-mono font-thin">{video.title}</span>
              <span className="ml-16">{video.username}</span>
              <span className="ml-16">{video.like}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="text-sm mb-8 ml-16">
        {page > 1 && (
          <button className="mx-4" onClick={() => handlePageChange(page - 1)}>Prev</button>
        )}
        {page} of {totalPages}
        {page < totalPages && (
        <button className="ml-4 px-3 py-2 bg-lime-400 border rounded-full text-black border-lime-400 hover:text-lime-400 hover:bg-black" onClick={() => handlePageChange(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default VideoList;
