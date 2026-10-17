import React,{useState} from 'react'

const Chat = () => {

    const [currQue,setQue]=useState();



  return (
    <div className='Chat px-5 py-7 relative'>
        <form className="chat-input absolute bottom-4 left-5" onSubmit={(e)=>{e.preventDefault();}}>
            <div className="box bg-[#FF0033] border-none rounded-2xl flex gap-5 px-5 py-3">
                <input onChange={(e)=>{setQue(e.target.value)}} className=' font-medium text-white py-1.5 px-5' type="text" size='65' />
                <input className='bg-gray-50 py-1 px-2 rounded-lg cursor-pointer' type='submit'></input>
            </div>
        </form>
    </div>
  )
}

export default Chat