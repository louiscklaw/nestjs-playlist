import { AppDataSource } from "./data-source"
import { Post } from "./entity/Post"
import { PostDetails } from "./entity/PostDetails"
import { PostMetadata } from "./entity/PostMetadata"
import { User } from "./entity/User"

AppDataSource.initialize().then(async (dataSource) => {

  let details1 = new PostDetails()
  details1.comment = "People"

  let details2 = new PostDetails()
  details2.comment = "Human"

  let metadata1 = new PostMetadata()
  metadata1.description = "People"

  let post = new Post()
  post.text = "Hello how are you?"
  post.title = "hello"
  post.details = [details1, details2]
  post.metadatas = [metadata1]

  let postRepository = dataSource.getRepository(Post)

  postRepository
    .save(post)
  //   .then((post) => console.log("Post has been saved"))
  //   .catch((error) => console.log("Cannot save. Error: ", error))


}).catch(error => console.log(error))


