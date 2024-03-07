import db from "../config/connectDb";
import { PostRequest } from "../model/PostModel";

export const createPost = async (
  titleInput: string,
  contentInput: string,
  userIdInput: number,
) => {
  const mostRecentId = await db.post.findFirst({
    select: {
      id: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return await db.post.create({
    data: {
      id: mostRecentId.id + 1,
      title: titleInput,
      content: contentInput,
      userId: userIdInput,
    },
  });
};

export const queryPostbyID = async (idInput: number) => {
  const post = await db.post.findUnique({
    where: {
      id: idInput,
    },
  });

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    like: post.like,
    userId: post.userId,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    deletedAt: post.deletedAt,
  };
};

export const queryPostbyUserID = async (userIdInput: number) => {
  const posts = await db.post.findMany({
    where: {
      userId: userIdInput,
    },
  });

  const formattedPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    like: post.like,
    userId: post.userId,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    deletedAt: post.deletedAt,
  }));

  return formattedPosts;
};

export const queryAllPost = async () => {
  const posts = await db.post.findMany();

  const formattedPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    like: post.like,
    userId: post.userId,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    deletedAt: post.deletedAt,
  }));

  return formattedPosts;
};

export const editPost = async (postId: number, data: PostRequest) => {
  await db.post.update({
    where: {
      id: postId,
    },
    data: {
      title: data.title,
      content: data.content,
    },
  });

  return await queryPostbyID(postId);
};

export const removePost = async (postId: number) => {
  await db.post.update({
    where: {
      id: postId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return await queryPostbyID(postId);
};

export const queryLikebyUserPost = async (
  userIdInput: number,
  postIdInput: number,
) => {
  const like = await db.like.findFirst({
    where: {
      userId: userIdInput,
      postId: postIdInput,
    },
  });

  return like;
};

export const updateLikeCount = async (
  userIdInput: number,
  postIdInput: number,
) => {
  const currentData = await queryPostbyID(postIdInput);
  const currentLike = await queryLikebyUserPost(userIdInput, postIdInput);

  if (!currentLike) {
    const mostRecentId = await db.like.findFirst({
      select: {
        id: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    await db.like.create({
      data: {
        id: mostRecentId.id + 1,
        userId: userIdInput,
        postId: postIdInput,
      },
    });

    await db.post.update({
      where: {
        id: postIdInput,
      },
      data: {
        like: currentData.like + 1,
      },
    });
  } else {
    await db.like.delete({
      where: {
        id: currentLike.id,
      },
    });

    await db.post.update({
      where: {
        id: postIdInput,
      },
      data: {
        like: currentData.like - 1,
      },
    });
  }

  return await queryPostbyID(postIdInput);
};
