// src/app/models/post.model.ts
export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
    media?: string; 
  videoUrl?: string;
  likes: string[];
  dislikes: string[];
  comments: Comment[];
}

export interface Comment {
  _id: string;
  text: string;
  likes: string[];
  replies: Comment[];
}
