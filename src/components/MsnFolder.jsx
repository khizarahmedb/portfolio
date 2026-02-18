import UseContext from '../Context';
import { useContext, useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import msnPic from '../assets/msn.png';
import chat from '../assets/chat.png';
import nudge from '../assets/nudge.png';
import nudgeSound from '../assets/nudgeSound.mp3';
import '../css/MSN.css';

function MsnFolder() {

  const {
    handleShow,
    ringMsnOff,
    ringMsn, setRingMsn,
    connectWebSocket,
    websocketConnection,
    chatLogin,
    clearChatSession,
    chatAuthToken,
    chatAuthUser,
    chatBotActive, setChatBotActive,
    onlineUser,
    loadedMessages, setLoadedMessages,
    themeDragBar,
    sendDisable,
    endOfMessagesRef,
    createChat,
    userNameValue, setUserNameValue,
    chatValue, setChatValue,
    chatData,
    MSNExpand, setMSNExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
  } = useContext(UseContext);


  const [userName, setUserName] = useState(false);
  const [chatLoginModal, setChatLoginModal] = useState(false);
  const [chatLoginName, setChatLoginName] = useState('');
  const [chatLoginError, setChatLoginError] = useState('');
  const [chatLoginLoading, setChatLoginLoading] = useState(false);
  const topOfMessagesRef = useRef(null); // Ref to track the top of the chat container
  const [initialLoading, setInitialLoading] = useState(false)
  const hasScrolledRef = useRef(false);

  const lastMessage = chatData.length > 0
    ? chatData[chatData.length - 1].date.split('').slice(0, 10).join('')
    : 'No messages yet';

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [MSNExpand.show])

  useEffect(() => {
    if (MSNExpand.show && !chatAuthToken) {
      setChatLoginModal(true);
      setChatLoginName(chatAuthUser?.username || localStorage.getItem('username') || '');
      setChatLoginError('');
    }
  }, [MSNExpand.show, chatAuthToken, chatAuthUser?.username]);

  useEffect(() => {
    if (!MSNExpand.show || chatLoginModal || !chatAuthToken || websocketConnection) return;
    const retry = setTimeout(() => {
      connectWebSocket(chatAuthToken);
    }, 1200);
    return () => clearTimeout(retry);
  }, [MSNExpand.show, chatLoginModal, chatAuthToken, websocketConnection, connectWebSocket]);
  

  useEffect(() => {
    
    if (ringMsn) {
      handleShow('MSN');
      const audio = new Audio(nudgeSound);
      audio.play().catch((err) => console.error("Audio play failed:", err));
      
    }
  }, [ringMsn]);


useEffect(() => {
  if (!hasScrolledRef.current && MSNExpand.show) {
    const timeoutId = setTimeout(() => {
      if (loadedMessages.length > 0) {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
        hasScrolledRef.current = true; // Mark as executed
      }
    }, 1000);

    return () => clearTimeout(timeoutId); // Cleanup timeout
  }
}, [MSNExpand.show, loadedMessages.length]); // Dependencies to trigger effect

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(true)
    }, 5000);
  },[])

  useEffect(() => {
    if(initialLoading) {
      const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreMessages();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    });

    if (topOfMessagesRef.current) {
      observer.observe(topOfMessagesRef.current);
    }

    return () => {
      if (topOfMessagesRef.current) {
        observer.unobserve(topOfMessagesRef.current);
      }
    };
    }
    
  }, [topOfMessagesRef.current, loadedMessages, initialLoading]);

  function loadMoreMessages() {

    const currentLength = loadedMessages.length;
    const moreMessages = chatData.slice(Math.max(chatData.length - currentLength - 20, 0), chatData.length - currentLength);
    
    setTimeout(() => {
        setLoadedMessages(prevMessages => [...moreMessages, ...prevMessages]);
    }, 1500);
  }


  function handleDragStop(event, data) {
    const positionX = data.x;
    const positionY = data.y;
    setMSNExpand(prev => ({
      ...prev,
      x: positionX,
      y: positionY
    }));
  }

  function handleExpandStateToggle() {
    setMSNExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setMSNExpand(prevState => ({
        ...prevState,
        expand: !prevState.expand
      }));
    }
    setLastTapTime(now);
  }

  return (
    <>
      <Draggable
        axis="both"
        handle={'.folder_dragbar-MSN'}
        grid={[1, 1]}
        scale={1}
        disabled={MSNExpand.expand}
        bounds={{ top: 0 }}
        defaultPosition={{
          x: window.innerWidth <= 500 ? 20 : 50,
          y: window.innerWidth <= 500 ? 40 : 120,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('MSN')}
      >
        <div className={`folder_folder-MSN ${ringMsn ? 'shake' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleSetFocusItemTrue('MSN');
          }}
          onAnimationEndCapture={() => {
              setRingMsn(false)
            }}
          style={
            MSNExpand.expand ? inlineStyleExpand('MSN') : inlineStyle('MSN')
          }
        >

          {/* -------------------------- Add username --------------------------------- */}
          <div className={userName ? 'Username_input_div_active' : 'Username_input_div_disabled'}>
            <div className="container_username">
              <div className="form_banner"
                style={{ background: MSNExpand.focusItem ? themeDragBar : '#757579' }}
              >
                <img src={chat} alt="chat" />
                <p className='username_text_banner'>
                  Username
                </p>
                <div className="close_form_banner"
                  onClick={() => setUserName(false)}
                >
                  <p>×</p>
                </div>
              </div>
              <form onSubmit={(e) => { e.preventDefault() }}>
                <p>
                  Username:
                </p>
                <input type="text" maxLength={20} placeholder='Enter your username here...'
                  value={userNameValue}
                  onChange={(e) => setUserNameValue(e.target.value)}
                />
                <div className="ok_cancel_username">
                  <button
                    onClick={() => {
                      setUserName(false)
                      localStorage.setItem('username', userNameValue)
                    }}
                  >
                    Ok
                  </button>
                  <button
                    onClick={() => {
                      setUserName(false);
                      setUserNameValue(() => {
                        const localName = localStorage.getItem('username')
                        return localName && localName.length > 0 ? localName : ''
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* ------------------------------------------------------------------------------ */}
          <div className="folder_dragbar-MSN"
            onDoubleClick={handleExpandStateToggle}
            onTouchStart={handleExpandStateToggleMobile}
            style={{ background: MSNExpand.focusItem ? themeDragBar : '#757579' }}
          >
            <div className="folder_barname-MSN">
              <img src={msnPic} alt="msnPic" />
              <span>MSN</span>
            </div>
            <div className="folder_barbtn-MSN">
              <div onClick={!isTouchDevice ? (e) => {
                e.stopPropagation();
                setMSNExpand(prev => ({ ...prev, hide: true, focusItem: false }));
                StyleHide('MSN');
              } : undefined}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  setMSNExpand(prev => ({ ...prev, hide: true, focusItem: false }));
                  StyleHide('MSN');
                }}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-MSN'></p>
              </div>
              <div
                onClick={!isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-MSN ${MSNExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {MSNExpand.expand ?
                  (
                    <div className="expand_2-MSN"></div>
                  )
                  :
                  (null)}
              </div>
              <div>
                <p className='x-MSN'
                  onClick={!isTouchDevice ? () => {
                    deleteTap('MSN');
                    setUserName(false);
                    setChatValue('')
                  } : undefined}
                  onTouchEnd={() => {
                    deleteTap('MSN');
                    setUserName(false);
                    setChatValue('')
                  }}
                >
                  ×
                </p>
              </div>
            </div>
          </div>

          <div className="file_edit_container-MSN">
            <p>File<span style={{ left: '-23px' }}>_</span></p>
            <p>Edit<span style={{ left: '-24px' }}>_</span></p>
            <p>View<span style={{ left: '-32px' }}>_</span></p>
            <p>Help<span style={{ left: '-30px' }}>_</span></p>
          </div>
          <div className='groove_div'>
            <div className="chat_name_msn_div"
              onClick={() => setUserName(true)}
            >
              <img src={chat} alt="chat" />

            </div>
            <div className="shake_message"
              onClick={() => {
                ringMsnOff()
              }}
            >
              <img src={nudge} alt="" />
            </div>
            <span>Username: {chatAuthUser?.username || userNameValue || 'Anonymous'}</span>
            <div className={`activate_bot ${chatBotActive ? 'active' : ''}`}
              onClick={() => setChatBotActive(!chatBotActive)}
            >
              <span>{chatBotActive? 'Bot Online' : 'Bot Offline' }</span>
            </div>     
            {chatAuthToken ? (
              <div className="activate_bot"
                onClick={() => {
                  clearChatSession();
                  setChatLoginModal(true);
                }}
              >
                <span>Logout</span>
              </div>
            ) : null}
          </div>
          <div className="chat_to_div">
            <span>
              Online User: <span>{onlineUser}</span>
            </span>
          </div>
          
          <div className="folder_content-MSN"
            style={{ 
              background: !websocketConnection ? 'rgba(0, 0, 0, 0.426)' : '',
            }}
          >
            {!websocketConnection && !chatLoginModal && (
              <div className="reconnect_container">
                <p
                  onClick={() => {
                    if (!chatAuthToken) {
                      setChatLoginModal(true);
                      return;
                    }
                    connectWebSocket()
                  }}
                >
                  {chatAuthToken ? 'Click here to reconnect' : 'Login required'}
                </p>
              </div>
            )}
            {chatData.length === 0 && (
              <span style={{ position: 'relative', fontSize: '13px' }}>
                {websocketConnection ? 'No messages yet. Say hello.' : 'LOADING.......'}
              </span>
            )}
            <div ref={topOfMessagesRef} /> {/* Ref to track the top of the chat container */}
            {loadedMessages?.map((chat, index) => (            
              chat.chat.length > 0 && (
                <div className='text_container' key={index}>
                  <p>
                    <span style={{ color: chat?.dev ? 'red' : chat.bot ? 'purple' : 'blue' }}>&lt;{chat?.dev ? 'Dev' : chat.name}&gt;: </span>
                    <span style={{ color: chat?.dev ? 'red' : chat.bot ? 'purple' : '#171616' }}>{chat.chat}</span>
                  </p>
                </div>
              )
            ))}
            
            <div ref={endOfMessagesRef} />
          </div>
            
          <div className="enter_text_div">
            <textarea
              maxLength={100}
              placeholder='Enter your message here...'
              value={chatValue}
              disabled={!chatAuthToken}
              onChange={(e) => setChatValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') createChat()
              }}
            />
            <button
              style={{ color: sendDisable || !chatAuthToken ? 'grey' : null }}
              disabled={sendDisable || !chatAuthToken}
              onClick={() => {
                createChat()
              }}
            >
              Send
            </button>
          </div>
          <div className="status_div">
            <p>
              {chatValue.trim().length > 0
                ? `${userNameValue} is typing...`
                : `Last message received on ${lastMessage}`}
            </p>

          </div>

          {chatLoginModal ? (
            <div
              style={{
                position: 'absolute',
                inset: '30px 10px 28px 10px',
                background: 'rgba(0,0,0,0.72)',
                zIndex: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: 'min(380px, 96%)',
                  background: '#d4d2d2',
                  border: '2px solid #f5f5f5',
                  borderRight: '1px solid #222',
                  borderBottom: '1px solid #222',
                  padding: '12px',
                }}
              >
                <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Live Chat Login</p>
                <p style={{ marginBottom: '8px' }}>Enter your username to join chat.</p>
                <input
                  type="text"
                  maxLength={20}
                  placeholder="Username"
                  value={chatLoginName}
                  onChange={(e) => setChatLoginName(e.target.value)}
                  style={{ width: '100%', marginBottom: '8px', padding: '5px' }}
                />
                {chatLoginError ? (
                  <p style={{ color: '#8d0000', marginBottom: '8px' }}>{chatLoginError}</p>
                ) : null}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    disabled={chatLoginLoading}
                    onClick={async () => {
                      setChatLoginLoading(true);
                      setChatLoginError('');
                      try {
                        await chatLogin(chatLoginName);
                        setChatLoginModal(false);
                      } catch (error) {
                        setChatLoginError(error?.message || 'Unable to login');
                      } finally {
                        setChatLoginLoading(false);
                      }
                    }}
                  >
                    {chatLoginLoading ? 'Logging in...' : 'Login'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setChatLoginModal(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Draggable>
    </>
  );
}

export default MsnFolder;
