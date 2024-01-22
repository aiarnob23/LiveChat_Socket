import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../axiosConfig";




const Chat = () => {

    const { isPending, error, data } = useQuery({
        queryKey: ['users'],
        queryFn: () =>
            axiosInstance.get('/users',{
                withCredentials:true,
            })
                .then(response => response.data)
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message


    return (
        <div>
            {data.length}
        </div>
    );
};

export default Chat;