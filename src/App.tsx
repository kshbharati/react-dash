import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [file,setFile] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <>
      <div>
          <form method='post' encType='multipart/form-data' onSubmit={async (e)=>{
            e.preventDefault();
                        console.info(file);
            const formData= new FormData();
            formData.append('file',file);

            const res = await fetch('http://localhost:4000/upload',{
              method: 'POST',
              body: formData
            });
            console.log(res);
          }}>
              <div className="input-group">
                <label htmlFor='files'> Select files </label>
              <input id='file' name="file" type="file" onChange={onFileChange}/>
              <button type='submit'>Submit</button>
            </div>
          </form>
      </div>
    </>
  )
}

export default App
