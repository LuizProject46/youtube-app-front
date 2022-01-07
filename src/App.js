import React , {useState} from 'react'
import './index.css'
function App() {
  const [url, setUrl] = useState('')
  const [format, setFormat] = useState('mp3')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(){
    if(!url || !format){
        alert("URL de video  obrigatório!!!")
    }else{
      setLoading(true)
      try{
          fetch('https://youtube-app46.herokuapp.com/download', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
          "url" : url,
          "format" : format
            })
        
        })
        .then( response => response.json()
        .then((response) => {
           setResult(response.url.split('/')[4])
           setLoading(false)
        }))
        
       
        
      }catch(err){
        setLoading(false)
        alert(err.message)
      }
    }
   

  }

  return (
    <div className="container" >
      <h1>Youtube Downloader</h1>
        <input value={url} onChange={ e => setUrl(e.target.value)} placeholder="Digite a url do video..."/>
          <select onChange={ e => setFormat(e.target.value)}>
            <option value="mp3">MP3</option>
            <option value="mp4">MP4</option>
          </select>
        <button onClick={handleSubmit}>
          {loading ? (
            'Carregando...'
          ):(
            'Baixar video'
          )}
        </button>

        {result && (
            <>
              <h3>Clique no link abaixo</h3>
            <a download href={`https://youtube-app46.herokuapp.com/downloads/${result}`} target="_blank">{result}</a>
            </>
        )}
    </div>
  );
}

export default App;
