import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
};

export const INITIAL_STATE = {
    USER: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setisAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,

};//to know we have a loged in user all time 

const AuthContext = createContext<IContextType>(INITIAL_STATE);



const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    const checkAuthUser = async () => {

        try {
            const currentAccount = await getCurrentUser()
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })
                setIsAuthenticated(true);
                return true;
            }
            return false;

        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        // localStorage.getItem('cookieFallback') === null
        if (localStorage.getItem('cookieFallback') === '[]' 
        ) navigate('/sign-in')

        checkAuthUser();
    }, []);


    const value = {  user, setUser, isLoading, isAuthenticated, setIsAuthenticated, checkAuthUser  };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
}

export default AuthProvider
export const useUsercontext=()=>useContext(AuthContext)