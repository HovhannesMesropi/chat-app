import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "../../api";

export const Display = () => {
    const [users,setUsers] = useState<{nickname: string, id: number}[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/accounts');
        }
    }, [navigate])

    useEffect(() => {
        API.getUsers().then((data) => setUsers(data))
    }, [])

    console.log(users);

    return (
        <div className="page page__display">
            <div className="page page__display--write-message">
                <div>
                    <div className="me">
                        Hello
                    </div>
                    <div className="to">
                        Hello Man
                    </div>
                </div>
                <textarea>

                </textarea>
                <button>Send</button>
            </div>
            <ul className="page page__display--friend-list">
                <div>People List</div>
                {users.map(user => <li key={user.id}>{user.nickname}</li>)}
            </ul>
        </div>
    )
}