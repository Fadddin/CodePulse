import { useState } from 'react';
import axios from 'axios';
// import { createWorker } from 'tesseract.js';

const Dash = () => {

    const [avatarPreview, setAvatarPreview] = useState<any | null>();
    const [respo, setRespo] = useState("");
    const [meds, setMeds] = useState([]);
    const [loading, setLoading] = useState("");

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
        const subData = {
            prompt: avatarPreview
        }
        console.log(subData)
        setLoading("loading...")
        try {
            const { data }: any = await axios.post("http://localhost:7070/api/v1/pr/pres", subData, { withCredentials: true });
            console.log(data)
            if (data){
                setLoading("")
            }
            setRespo(data.msg)
            setMeds(data.meds)
        } catch (error) {
            console.log(error)
            setLoading("")
        }
    }

    return (
        <div>
            <div className='m-8'>
                <div className='flex justify-center'>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={readImage} />
                </div>
                <div className='flex justify-center'>
                    <button className='bg-indigo-600 px-4 py-2 m-4 rounded text-white' onClick={handleSubmit} disabled={loading==="loading..."?true:false}>Upload Image</button>
                </div>

                <div className='m-6'>
                    {respo ? (
                        <div className='rounded-lg border border-solid border-indigo-600 p-4'>
                        <div>
                            <p>Medicines Detected</p>
                            {meds.map((med) => (
                                <div key={med}>
                                    {med}
                                </div>
                            ))}
                        </div>
                        {respo}
                    </div>
                    )
                    : loading}
                    {/* {respo && (
                        <div className='rounded-lg border border-solid border-indigo-600 p-4'>
                            
                            {loading? "wait":""}
                            <div>
                                <p>Medicines Detected</p>
                                {meds.map((med) => (
                                    <div key={med}>
                                        {med}
                                    </div>
                                ))}
                            </div>
                            {respo}
                        </div>
                    )} */}
                </div>

            </div>
        </div>
    )
}

export default Dash;