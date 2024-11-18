import React, { useState } from 'react'

function MiniatureGallery({ image, imagetwo, imagethree }) {

    const [mainImage, setMainImage] = useState(image)

    return (
        <section className='w-full flex flex-col gap-5'>
            <img src={mainImage} alt="Perfume" className="w-full aspect-square rounded-lg object-cover object-center" />
            <div className='grid grid-cols-3 gap-x-2 md:gap-x-5'>
                <img src={image} className="w-full object-cover aspect-square rounded-lg cursor-pointer" onClick={() => setMainImage(image)} />
                <img src={imagetwo} alt="Perfume" className="w-full object-cover aspect-square rounded-lg cursor-pointer" onClick={() => setMainImage(imagetwo)} />
                <img src={imagethree} alt="Perfume" className="w-full object-cover aspect-square rounded-lg cursor-pointer" onClick={() => setMainImage(imagethree)} />
            </div>
        </section>
    )
}

export default MiniatureGallery