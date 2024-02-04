import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const History = () => {

    const [hisData, setHisData] = useState([]);
    const navigate = useNavigate();

    const gotHistory = async () => {
        try {
            const { data }: any = await axios.get("http://localhost:7070/api/v1/pr/history", { withCredentials: true });
            setHisData(data.historyData)
            console.log(data)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        gotHistory();
    }, []);

    return (
        <div>
            {hisData.length>0 ? (
                <div className='m-2 p-4'>
                    <div className='text-2xl font-semibold m-2 py-4'>Prescription History</div>
                    {hisData.map((hd:any, index) => (
                        <div className='m-2 p-4 border-2' key={index} onClick={() => navigate(`/history/id?id=${hd?._id}`)}>
                           Pescription Id : {hd?._id}
                        </div>
                    ))}
                </div>
            ) : (
                <div className='m-6 text-xl font-semibold'>
                    No History Yet
                </div>
            )}
        </div>
    )
}

export default History;