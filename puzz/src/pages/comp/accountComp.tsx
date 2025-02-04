import { UserType } from '../../types/index';
import UserContextProvider from "../../contexts/userContextProvider.tsx";

interface MyProps {
    user: UserType;
}

//the user item
export default function MineralItem({user}: MyProps){
    return (
        <UserContextProvider>
            <div>
                <div>
                    <h3>{user.username}</h3>

                    <div>
                        <h3>About the user</h3>
                        <h3>{user.about}</h3>
                    </div>
                </div>
            </div>
        </UserContextProvider>
    );
}