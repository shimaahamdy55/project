import { images } from "../../utils/images"
import "./ChatList.css"
export default ({ chats,isLoading }: any) => {
  if(isLoading) return <p className="animate-pulse text-blue-500">loading...</p>
  return(
  <ul>
    {chats?.map((chat:any) => {
      return (
        <div>
          <span>{chat}</span>
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