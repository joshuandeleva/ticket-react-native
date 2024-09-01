import { AuthCredentials, RegisterCredentials, userService } from "@/services/user";
import { User } from '@/types/user';
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


interface AuthContextProps {
    isLoggedIn: boolean;
    isLoadingAuth: boolean;
    authenticate: {
        (authMode: "login", credentials: AuthCredentials): Promise<void>;
        (authMode: "register", credentials: RegisterCredentials): Promise<void>;
    };
    logout: VoidFunction,
    user: User | null
}

export const AuthContext = createContext({} as AuthContextProps)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoadingAuth, setIsLoadingAuth] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        async function checkAuth() {
            const token = await AsyncStorage.getItem("token")
            const user = await AsyncStorage.getItem("user")
            if (token && user) {
                setIsLoggedIn(true)
                setUser(JSON.parse(user))
                router.replace("/(auth)")
            } else {
                setIsLoggedIn(false)
            }
        }
        checkAuth()
    }, [])
    async function authenticate(authMode: "login" | "register", credentials: AuthCredentials | RegisterCredentials): Promise<void> {
        setIsLoadingAuth(true)
        try {
            let response;
            switch (authMode) {
                case "login":
                    response = await userService.login(credentials as AuthCredentials)
                    break;
                case "register":
                    response = await userService.register(credentials as RegisterCredentials)
                    break;
                default:
                    throw new Error("Invalid auth mode")
            }
            if(response){
                const {data} = response
                const {user , token} = data
                await AsyncStorage.setItem("token", token)
                await AsyncStorage.setItem("user", JSON.stringify(user))
                setIsLoggedIn(true)
                setUser(user)
                router.replace("/(auth)")
            }
        } catch (error) {
            setIsLoggedIn(false)
        } finally {
            setIsLoadingAuth(false)
        }
    }
    async function logout() {
        setIsLoggedIn(false)
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("user")
    }
    return (
        <AuthContext.Provider value={{ isLoadingAuth, isLoggedIn, user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}