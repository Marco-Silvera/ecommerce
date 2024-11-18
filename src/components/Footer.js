import React from 'react'

function Footer() {
    return (
        <footer className="bg-white">
            <div className="mx-auto w-full max-w-[1500px] p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://github.com/Marco-Silvera" className="flex items-center">
                            <img src="https://pbs.twimg.com/profile_images/1533454803/isotipo_400x400.jpg" className="h-8 me-3" alt="FlowBite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">Perfumerias Unidas</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6">
                        <div>
                            <a className="mb-6 text-sm font-semibold text-gray-500 uppercase hover:underline" href='https://github.com/Marco-Silvera' target='_blank'>Instagram</a>
                        </div>
                        <div>
                            <a className="mb-6 text-sm font-semibold text-gray-500 uppercase hover:underline" href='https://github.com/Marco-Silvera' target='_blank'>Tiktok</a>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">© 2024 <a href="https://www.linkedin.com/in/marcosilvera/" className="hover:underline">Perfumerias Unidas</a>. Todos los derechos reservados.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 gap-2 items-center">
                        <p className='text-xs text-gray-500 font-light'>Desarrollado por:</p>
                        <a href='https://www.linkedin.com/in/marcosilvera/' target='_blank'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className='text-gray-400'>
                                <path d="M0,1.19v21.62C0,23.6,0.4,24,0.89,24h21.62c0.49,0,0.89-0.4,0.89-0.89V1.19c0-0.49-0.4-0.89-0.89-0.89H0.89 C0.4,0.3,0,0.7,0,1.19z M7.12,20.59H3.88V9h3.24V20.59z M5.5,7.56C4.28,7.56,3.38,6.65,3.38,5.56C3.38,4.47,4.28,3.56,5.5,3.56 c1.22,0,2.12,0.91,2.12,2C7.62,6.65,6.72,7.56,5.5,7.56z M20.59,20.59h-3.24v-5.72c0-1.36-0.02-3.11-2.1-3.11 c-2.1,0-2.42,1.52-2.42,3.02v5.81H9.59V9h3.1v1.59h0.05c0.43-0.82,1.49-1.69,3.07-1.69c3.29,0,3.9,2.17,3.9,5v6.69H20.59z" />
                            </svg>
                        </a>
                        <a href='https://github.com/Marco-Silvera' target='_blank'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className='text-gray-400'>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.304 3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 013.003-.404c1.02.004 2.045.137 3.003.404 2.29-1.553 3.297-1.23 3.297-1.23.654 1.653.242 2.873.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.804 5.625-5.476 5.92.43.372.823 1.103.823 2.222v3.293c0 .32.218.694.824.576C20.565 22.093 24 17.596 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer   