import { Modal } from "@mantine/core"
import Chat from "../chat/Chat"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getData } from "../../api/getData"
import { useNavigate } from "react-router-dom"

const AllChats = () => {
  const [openChatModal, setOpenChatModal] = useState(false)
  const [company, setCompany] = useState(false)
  const navigate = useNavigate()
  const { data: allChats } = useQuery({
    queryKey: ["all-chats"],
    queryFn: () =>
      getData({
        endpoint: `get_all_chat`,
      }),
    select: (data) => data.data.message,
  })
  return (
    <div className="p-16">
      <div className="flex flex-col gap-4">
        {allChats?.map((msg) => (
          <button onClick={()=>{
            setCompany(msg)
            setOpenChatModal(true)
        }} className="flex gap-4 items-center bg-slate-200 p-4 rounded-xl">
            <img width={40} height={40} src={msg?.image} alt={msg?.name} className="mx-4 rounded-full" onClick={()=>navigate(`/company/${msg.id}`)}/>
            <span>{msg?.['last message']}</span>
          </button>
        ))}
      </div>
      <Modal
        centered
        onClose={() => setOpenChatModal(false)}
        opened={openChatModal}
      >
        <Chat company={company} isReply/>
      </Modal>
    </div>
  )
}

export default AllChats