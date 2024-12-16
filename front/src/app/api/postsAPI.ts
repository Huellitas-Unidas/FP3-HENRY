//Operaciones relacionadas con publicaciones: crear, obtener, actualizar, eliminar.

{/* import {ICardAnimal} from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPosts(): Promise<ICardAnimal[]> {
    try {
        const res = await fetch(`${API_URL}/posts`, {next: {revalidate: 600}});

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const posts: ICardAnimal[] = await res.json();
        return posts;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching posts:", error.message);
            throw new Error(error.message);
        } else {
            console.error("Unknown error fetching posts");
            throw new Error("Unknown error occurred");
        }
    }
}

export async function getPostsById(id: string): Promise<ICardAnimal> {
    try {
        const posts = await getPosts();
        const post = posts.find((post) => post.id.toString() === id);

        if (!post) {
            throw new Error("This post is not available right now");
        }

        return post;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching post by ID:", error.message);
            throw new Error(error.message);
        } else {
            console.error("Unknown error fetching post by ID");
            throw new Error("Unknown error occurred");
        }
    }
}
*/}
