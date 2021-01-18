import React from 'react'
import {useAuth} from '../contexts/AuthContext'
import {useHistory} from 'react-router-dom'
import Doctor from './views/Doctor'
import jwt_decode from 'jwt-decode'

export default function Dashboard() {

    const history = useHistory()
    const {currentUser} = useAuth()
    const {logout} = useAuth()
    const {getBeds} = useAuth()
    
    


    if (currentUser)
    {
        const userData = jwt_decode(currentUser.token);
        if (userData.perm === 0)
        {
            return <div>Pacjent</div>
        }
        else
        {
        return (
                Doctor()
            
                    
                    
            )
        }
    }
    else
    {
        history.push('/login')
        return null
    }
}
