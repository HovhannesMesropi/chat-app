import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/input';

export const Register = (props: { register?: boolean }) => {
    const navigate = useNavigate();
    
    return <div className="accounts">
        <h3>Register</h3>
        <form className="accounts__form-box">
            <div className="accounts__form-box--input-box">
                <label htmlFor="login">Nickname</label>
                <Input id="login" name="login" />
            </div>
            <div className="accounts__form-box--input-box">
                <label htmlFor="password">Password`</label>
                <Input id="password" type="password" name="login" />
            </div>
            <div className="accounts__form-box--input-box">
                <Input type="submit" value="Login"></Input>
            </div>
        </form>
        <a href="#" onClick={() => navigate('/accounts')}>Have allready account login</a>
    </div>
}