import "./styles.scss";

import { Input } from '../../components/input';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../../api";

export const Accounts = (props: { register?: boolean }) => {
    const [formInputs, setFormInputs] = useState({
        nickname: "",
        password: ""
    })
    const navigate = useNavigate();

    const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const data = await API.login(formInputs.nickname, formInputs.password);

        console.log(data);

        navigate('/');
    }

    return <div className="accounts">
        <h3>Accounts</h3>
        <form onSubmit={onFormSubmit} className="accounts__form-box">
            <div className="accounts__form-box--input-box">
                <label htmlFor="nickname">Nickname</label>
                <Input
                    value={formInputs.nickname}
                    onChange={(e) => setFormInputs({ ...formInputs, nickname: e.target.value })} id="nickname" name="nickname"
                />
            </div>
            <div className="accounts__form-box--input-box">
                <label htmlFor="password">Password`</label>
                <Input
                    value={formInputs.password}
                    onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })} id="password" type="password" name="password"
                />
            </div>
            <div className="accounts__form-box--input-box">
                <button type="submit">Login</button>
            </div>
        </form>
        <a href="javascript;" onClick={() => navigate('/accounts/register')}>Dont have account create</a>
    </div>
}