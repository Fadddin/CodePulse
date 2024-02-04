import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dash = () => {

    const [avatarPreview, setAvatarPreview] = useState<any | null>("");
    const [respo, setRespo] = useState("");
    const [meds, setMeds] = useState([]);
    const [loading, setLoading] = useState(false);

    const readImage = (e: any) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader?.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (avatarPreview === ""){
            console.log("data de sale")
        } else {
            setRespo("")
            const subData = {
                prompt: avatarPreview
            }
            console.log(subData)
            setLoading(true)
            try {
                const { data }: any = await axios.post("http://localhost:7070/api/v1/pr/pres", subData, { withCredentials: true });
                console.log(data)
                if (data){
                    setLoading(false)
                }
                setRespo(data.msg)
                setMeds(data.meds)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    }

    return (
        <div>
            <div className='m-8'>
                <div className=''>
                    <Link className="bg-black text-white px-4 py-2 rounded" to="/history">History</Link>
                </div>
                
                <div className='flex justify-center'>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        required
                        onChange={readImage} 
                    />
                </div>
                <div className='flex justify-center'>
                    <button className='bg-indigo-600 px-4 py-2 m-4 rounded text-white' onClick={handleSubmit} disabled={loading==="loading..."?true:false}>Upload Image</button>
                </div>

                <div className='m-6'>
                    {respo ? (
                        <div className='rounded-lg border border-solid border-indigo-600 p-4'>
                        <div>
                            {meds.toString()}
                        </div>
                        {respo}
                    </div>
                    )
                    :( <div className='flex justify-center items-center text-xl m-10'>   
                        {loading && (<img className='h-16' src="/Loads.svg" alt="" />)}
                        {/* <img className='h-16' src="/Loads.svg" alt="" /> */}
                    </div>) }
                </div>

            </div>
        </div>
    )
}

export default Dash;