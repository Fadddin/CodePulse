import { useState } from 'react';
// import { createWorker } from 'tesseract.js';

const Dash = () => {

    const [avatarPreview, setAvatarPreview] = useState<any | null>();

    const readImage = (e: any) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader?.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div>
            <img src={avatarPreview} alt="Avatar Preview" />
            <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={readImage}
            />
        </div>
    )
}

export default Dash;