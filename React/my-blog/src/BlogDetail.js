import {useParams} from 'react-router-dom'
const BlogDetial = () => {

  const { id } = useParams()

  return (
    <div className="blog-detail">
      <h1>BlogDetail - {id}</h1>
    </div>
  )
}

export default BlogDetial