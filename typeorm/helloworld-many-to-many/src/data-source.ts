import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/Post"
import { PostAuthor } from "./entity/PostAuthor"
import { PostCategory } from "./entity/PostCategory"
import { PostDetails } from "./entity/PostDetails"
import { PostImage } from "./entity/PostImage"
import { PostInformation } from "./entity/PostInformation"
import { PostMetadata } from "./entity/PostMetadata"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Post, PostAuthor, PostCategory, PostDetails, PostImage, PostMetadata, PostInformation],
    migrations: [],
    subscribers: [],
})
