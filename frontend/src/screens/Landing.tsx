import React from 'react'
import { useNavigate } from 'react-router-dom'
import chess from '../assets/chess.image.png'
import {  Users } from 'lucide-react'
import Button from '../components/Button'
export const Landing = () => {
    const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        
        <div className="aspect-square w-full max-w-xl mx-auto">
          <img
            src={chess}
            alt="Chess board"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Play Chess Online on the #1 Site!
            </h1>
            

          <div className="space-y-4">
            <Button onClick={()=>{
                navigate('/game')
              }}>Play Online
                
            </Button>

            
          </div>
        </div>
      </div>
    </div>
</div>

  )
}
