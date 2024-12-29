import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Sidebar.css';
import { Constext } from '../../context/Context';

export default function Sidebar() {
  const [extended, setExtended] = useState(false);

  const { onSent, prevPrompt, setRecentPrompt , newChat } = useContext(Constext);

    const loadPromt = async (promp) =>
    {
            setRecentPrompt(promp);
          await onSent(promp);
    }

  function handleSidebarToggle() {
    setExtended(!extended);  
  }

  return (
    <div className="sidebar">
      
      <div className="top">
        <img 
          onClick={handleSidebarToggle} 
          className="menu" 
          src={assets.menu_icon} 
          alt="Menu Icon"
        />
        <div onClick={()=>newChat() } className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}  
        </div>

       
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => (
              <div key={index} onClick={()=>loadPromt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0,15)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}