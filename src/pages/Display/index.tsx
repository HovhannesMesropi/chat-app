import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "../../api";
import { getPayload } from "../../helpers/getPayload";
import { connect } from 'socket.io-client';
const currentUser = getPayload();

export const Display = () => {
    const [users, setUsers] = useState<{ nickname: string, id: number }[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [currentDirect, setCurrentDirect] = useState<string>('');
    const [directMessages, setDirectMessages] = useState<{
        message: string;
        owner: number;
        to: number;
        id: number;
    }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        connect('http://localhost:3001').on('messages_updated', async () => {
            const { data } = await API.getDirectMessages();;
            setDirectMessages(data);
        })
    }, [])

    useEffect(() => {
        if (selectedUser) {
            API.getDirectMessages().then(({ data }) => {
                setDirectMessages(data);
            })
        }

    }, [selectedUser])



    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/accounts');
        }
    }, [navigate])

    useEffect(() => {
        API.getUsers().then((data) => setUsers(data))
    }, [])


    const onSendMessage = () => {
        if (selectedUser && currentDirect) {
            API.directMessage(selectedUser, currentDirect)
            setCurrentDirect('');
        }
    }

    const renderDirectMessages = () => {
        const tokenPayload = getPayload();
        const filtered = directMessages.filter((c) => {
            if (c.owner === tokenPayload.id || c.to === tokenPayload.id || c.owner === selectedUser || c.to === selectedUser) {
                return true;
            }
            return false;
        })

        return filtered.map((c) => {

            return <>
                <div key={c.id} className={c.owner === tokenPayload.id ? 'me' : 'to'}>
                    {c.message}
                </div>
            </>
        })
    }

    return (
        <div className="page page__display">
            <div className="page page__display--write-message">
                <div>
                    {renderDirectMessages()}
                </div>
                <textarea value={currentDirect} onChange={({ target }) => setCurrentDirect(target.value)}>

                </textarea>
                <button onClick={() => onSendMessage()}>Send</button>
            </div>
            <ul className="page page__display--friend-list">
                <div>People List</div>
                {users.map(user => {
                    if (currentUser && currentUser.id === user.id) {
                        return <li key={user.id}>Me. {user.nickname}</li>
                    }
                    return <li className={selectedUser && selectedUser === user.id ? 'selected' : ''} onClick={() => setSelectedUser(user.id)} key={user.id}>{user.nickname}</li>
                })}
            </ul>
        </div>
    )
}