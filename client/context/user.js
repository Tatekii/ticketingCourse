"use client"
import { useContext, createContext } from "react"

const UserContext = createContext({})

export const UserProvider = ({ children, value }) => {
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useCurUser = () => useContext(UserContext)
