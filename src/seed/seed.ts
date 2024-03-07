import db from "../config/connectDb";
import { users } from "./UserSeed";
import { posts } from "./PostSeed";
import { likes } from "./LikeSeed";

async function seedUsers() {
  users.forEach(async (user) => {
    await db.user.upsert({
      where: {
        id: user.id,
      },
      update: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
      create: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  });
}

async function seedPosts() {
  posts.forEach(async (post) => {
    await db.post.upsert({
      where: {
        id: post.id,
      },
      update: {
        id: post.id,
        title: post.title,
        content: post.content,
        like: post.like,
        userId: post.user_id,
      },
      create: {
        id: post.id,
        title: post.title,
        content: post.content,
        like: post.like,
        userId: post.user_id,
      },
    });
  });
}

async function seedLikes() {
  likes.forEach(async (like) => {
    await db.like.upsert({
      where: {
        id: like.id,
      },
      update: {
        id: like.id,
        postId: like.post_id,
        userId: like.user_id,
      },
      create: {
        id: like.id,
        postId: like.post_id,
        userId: like.user_id,
      },
    });
  });
}

async function main() {
  try {
    seedUsers();
    seedPosts();
    seedLikes();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
