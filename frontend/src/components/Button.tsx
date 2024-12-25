import React from 'react'

const Button = ({onClick,children}: {onClick: () => void,children:React.ReactNode}) => {
  return (
    <div>
           <button onClick={onClick} className="w-full h-full bg-[#7FA650] hover:bg-[#8fb55c] px-8 py-4 text-white rounded font-bold text-xl justify-center flex items-center gap-3">
              
                {children}
                
            </button>

    </div>
  )
}

export default Button