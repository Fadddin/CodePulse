import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Particular = () => {

    const navigate = useNavigate();
    const [search] = useSearchParams();
    const id = search.get("id");

    if (!id) {
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
            {hisData ? (
                <div className="flex justify-evenly items-center">
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <div className="text-xl font-semibold">
                            Id : {hisData?._id}
                        </div>
                        <div className="text-xl">
                            {hisData?.name}
                        </div>
                        <div className="text-sm w-[550px] text-center">
                            {hisData?.info}
                        </div>
                        <button className="m-4 bg-red-600 px-4 py-2 rounded-lg text-white" onClick={handleDelete}>Delete Prescription</button>
                    </div>
                    <div>
                        <img className="w-[500px] m-4 border-2 rounded-xl border-indigo-600" src={hisData?.image} alt={hisData?._id} height={200} width={150} />
                    </div>
                </div>
            ) : (
              <div className="flex justify-center items-center">
                Loading
              </div>  
            )}
        </div>
    )
}

export default Particular