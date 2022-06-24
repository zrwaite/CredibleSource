import { createContext } from 'react'

export const UserContext = createContext<{ user: User | null; setUser: Function }>({
	user: null,
	setUser: () => {},
})

export const PostsContext = createContext<{ posts: Post[]; setPosts: Function }>({
	posts: [],
	setPosts: () => {},
})
