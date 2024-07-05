import { images } from "../../utils/images"
import "./ChatList.css"
export default ({ chats,isLoading }: any) => {
  console.log(chats);
  const user_id  =JSON.parse(localStorage.getItem('sego_user')!)?.id
  if(isLoading) return <p className="animate-pulse text-blue-500">loading...</p>
  return(
  <ul>
    {chats?.map((chat:any) => {
      return (
        <div className={`p-2 my-1 rounded ${user_id === chat?.receiver 
            ? 'bg-sky-700' :  'bg-teal-700 text-end'}`}>
          <span className={`inline-block  text-white`}>{chat?.message}</span>
          {/* <div className="row show-grid">
            <div className="col-xs-12">
              <div className="chatMessage">
                <div key={chat.id} className="box">
                  <p>
                    <strong>{chat.username}</strong>
                  </p>
                  <p>{chat.message}</p>
                </div>
                <div className="imageHolder">
                  <img
                    src={images.avatar}
                    className="img-responsive avatar"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      )
    })}
  </ul>
)}
