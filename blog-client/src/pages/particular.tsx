import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Particular = () => {

    const navigate = useNavigate();
    const [search] = useSearchParams();
    const id = search.get("id");

    if (!id){
        navigate(-1)
    }

    const [hisData, setHisData] = useState<any | null>();

    const gotSingle = async () => {
        try {
            const { data } = await axios.get(`http://localhost:7070/api/v1/pr/history/${id!}`, { withCredentials: true });
            console.log(data)
            setHisData(data.historyData)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        gotSingle();
    }, []);

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:7070/api/v1/pr/history/${id!}`, { withCredentials: true });
            console.log(data)
            navigate(-1)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div>
            {hisData?._id}
            <img src={hisData?.image} alt={hisData?._id} height={200} width={150} />
            {hisData?.name.map((he: string, index: number) => (
                <p key={index}>{he}</p>
            ))}
            <button className="bg-red-500" onClick={handleDelete}>Delete this prescription data</button>
        </div>
    )
}

export default Particular