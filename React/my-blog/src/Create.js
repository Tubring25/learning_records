import { useState } from "react"
import { useHistory} from 'react-router-dom'

const Create = () => {
  const [title, setTitle] = useState('')  
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('')
  const history = useHistory()
  // history.go(-1)
  // history.push('/')

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { title, body, author }
  }
  return (
    <div className="create">
      <h2>Add New Blog</h2>
      <form onSubmit={()=>handleSubmit}>
        <label>Blog Title</label>
        <input type="text" required value={title} onChange={(e)=>setTitle(e.target.value)} />
        <label>Blog Content</label>
        <textarea required value={body} onChange={(e)=>setBody(e.target.value)}></textarea>
        <label>Blog Author</label>
        <select value={author} onChange={(e)=>setAuthor(e.target.value)}>
          <option value="Mario">Mario</option>
          <option value="Tubring">Tubring</option>
          <option value="Sam">Sam</option>
        </select>
        <button>Add Blog</button>
        <p>{title}</p>
        <p>{body}</p>
        <p>{author}</p>
      </form>
    </div>
    
  )
    
}

export default Create