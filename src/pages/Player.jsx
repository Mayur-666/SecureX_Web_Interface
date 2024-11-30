import {getDownloadURL, listAll, ref} from 'firebase/storage';
import {storage} from  '../utils/firebase.js'
import { useState , useEffect } from 'react';

const Player = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const storageRef = ref(storage, '/videos/');
      const result = await listAll(storageRef);
      const urls = await Promise.all(result.items.map(item => getDownloadURL(item)));
      setFiles(urls);
    };

    fetchFiles();
  }, []);

  console.log(files);

  return (
    <div>
      <h1>Video Player</h1>
      {files.map((url, index) => (
        <div key={index}>
          <video width="600" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default Player;