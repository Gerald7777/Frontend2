import React, {useContext, useState} from 'react'
import axios from 'axios'

const AuthContext = React.createContext()
const api = axios.create({
    baseURL: 'http://localhost:7071/api/covidapp'
})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()

    async function signup(name, PESEL, passwd, facilityCode)
    {
            setCurrentUser({})
            setTimeout(() => {
                return false
            }, 10000);
            try{
                let res = await api.post('/', {
                    "cmd": "REGISTER",
                    "user": {
                        "PESEL": PESEL,
                        "password": passwd,
                        "name": name,
                        "facility": facilityCode,
                        "perm": 0
                    }
                })
                clearTimeout()
                setCurrentUser(res.data)
            }catch(err)
            {
                return false
            }
            return true
    }

    async function logout()
    {
         setCurrentUser({})
         return true;
    }

    async function login(PESEL, passwd)
    {
        let res = await api.post('/', {
            "cmd": "LOGIN",
            "user": {
            "PESEL": PESEL,
            "password": passwd
            
            }
           })
        if (res.data)
        {
            setCurrentUser(res.data)
            return true
        }
        else
        {
            return false
        }
    }

    async function getBeds()
    {
        let res = await api.post('/', {
            "cmd": "LIST_BEDS",
            "token": currentUser.token
        })
        return res.data
    }

    async function getPatients()
    {
        let res = await api.post('/', {
            "cmd": "LIST_PATIENTS",
            "token": currentUser.token
        })
        return res.data
    }

    async function assignBed(bed, PESEL)
    {
        console.log("assign "+bed+" to "+PESEL)
        //let res = await api.post('/', {
        //    "cmd": "ASSIGN_BED",
        //    "token": currentUser.token,
        //    "bedId": bed,
        //    "PESEL": PESEL
        //})
        return true //res.data
    }

    const value = {
        currentUser,
        signup,
        login,
        logout,
        getBeds,
        getPatients,
        assignBed
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}



