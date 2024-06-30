import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Pusher from "pusher-js"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getData } from "../../api/getData"
import ChatBox from "./ChatBox"
import ChatList from "./ChatList"
const Chat = ({ company, isReply }: { company: any; isReply?: boolean }) => {
  const base_url = import.meta.env.VITE_BASEURL
  const token = localStorage.getItem("sego_token")
  const user = JSON.parse(localStorage.getItem("sego_user")!)

  const [text, setText] = useState("")
  const [chats, setChats] = useState([])
  const navigate = useNavigate()
  // get all chats
  const queryClient = useQueryClient()
  const { data: allChatMessages, isRefetching } = useQuery({
    queryKey: ["chats-messages", company.id],
    queryFn: () =>
      getData({
        endpoint: `messages/${company.id}`,
      }),
  })

  useEffect(() => {
    if (allChatMessages?.data?.message === " Token invaild!") {
      navigate("/login")
      localStorage.removeItem("sego_user")
      localStorage.removeItem("sego_token")
      return
    }
    if (allChatMessages?.data?.message === "No messages yet") {
      setChats(["no messages yet"])
      return
    }
    const lastChats = allChatMessages?.data?.message?.map((msg) => msg?.message)
    setChats(() => setChats(lastChats))
  }, [allChatMessages])

  useEffect(() => {
    const pusher = new Pusher("e6a5f3f9d3b02b734e1b", {
      cluster: "eu",
      auth: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
    const channel = pusher.subscribe("chat-App")
    channel.bind("sendMessage", (data) => {
      // console.log("🚀 ~ channel.bind ~ data:", data)
      // setChats((prevChats) => [...prevChats, data]);
      setText("")
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [])

  const handleTextChange = (e) => {
    if (e.keyCode === 13) {
      const payload = {
        message: text,
      }
      axios
        .post(`${base_url}message/${company.id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() =>
          queryClient.refetchQueries({
            queryKey: ["chats-messages", company.id],
          })
        )
    } else {
      setText(e.target.value)
    }
  }

  return (
    <section>
      <ChatList chats={chats} isLoading={isRefetching} />
      <ChatBox text={text} handleTextChange={handleTextChange} />
    </section>
  )
}

export default Chat