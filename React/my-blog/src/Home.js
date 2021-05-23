import { useState, useEffect } from 'react'
import BlogList from './BlogList'


const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
  ])

  const [isPending, setIsPending] = useState(true)

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blogs) => blogs.id!==id)
    setBlogs(newBlogs)
  }

  useEffect(() => {
    console.log('use effet ran')
  })

  return (
    <div className="home">
      { isPending && <div>loading...</div>}
      <BlogList blogs={blogs.filter((blog)=>blog.author === 'mario')} title="Mario's Title" handleDelete={handleDelete}></BlogList>
    </div>
  );
}
 
export default Home
