'use client'
import { IPostAnimal } from '@/interfaces/types'
import React from 'react'

const ButtonCard: React.FC<{ animalPost: IPostAnimal }> = ({ animalPost }) => {

    const { status } = animalPost;

    const buttonClass = status === 'lost' ? 'bg-red-500 hover:bg-red-300' : 'bg-green-500 hover:bg-green-300';

    return (
        <button
            type="button"
            className={`px-4 py-2 rounded-lg text-gray-800 text-sm font-semibold tracking-wider outline-none ${buttonClass}`}
        > {status} </button>
    )
}

export default ButtonCard