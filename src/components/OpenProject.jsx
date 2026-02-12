import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import ie from '../assets/ie.png'
import '../css/OpenProject.css'
import left from '../assets/ie_left.png'
import right from '../assets/ie_right.png'
import home from '../assets/ie_home.png'
import refresh from '../assets/ie_refresh.png'
import stop from '../assets/ie_stop.png'
import downArrow from '../assets/arrow-down.png'


function OpenProject() {

  const [iframeKey, setIframeKey] = useState(0);
  const [expandAddy, setExpandAddy] = useState(false);
  const allIEPRojects = [
    { id: 'Nft', label: 'MUNIK XVI Website', url: 'https://munik.iba.edu.pk' },
    { id: 'Note', label: 'Invader Shop', url: 'https://invader.shop' },
    {
      id: '3dObject',
      label: 'Decentralized Insurance (FYP)',
      url: 'https://github.com/khizarahmedb/DecentralizedInsurance',
    },
    {
      id: 'Fortune',
      label: 'Insurance Backend API',
      url: 'https://github.com/khizarahmedb/decentralizedInsurance-backend',
    },
    {
      id: 'PixelPic',
      label: 'QA + AppSec Thesis',
      url: '/reports/thesis-report-khizar-ahmed.pdf',
    },
    {
      id: 'IE',
      label: 'LinkedIn Profile',
      url: 'https://www.linkedin.com/in/khizar-ahmed-0a62841b5/',
    },
  ];

  const { 
    handleShow,
    forwardTrackIe, setForwardTrackIe,
    backTrackIe, setBackTrackIe,
    themeDragBar,
    projectname,
    projectUrl,
    setProjectUrl,
    openProjectExpand, setOpenProjectExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,

   } = useContext(UseContext);



      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setOpenProjectExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setOpenProjectExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setOpenProjectExpand(prevState => ({
            ...prevState,
            expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
}

  function handleBackTrack() {
    if (backTrackIe.length > 0) {
      const lastUrl = backTrackIe[backTrackIe.length - 1];
      setProjectUrl(lastUrl);
      setBackTrackIe(prev => prev.slice(0, -1));
      setForwardTrackIe(prev => [...prev, lastUrl]);
    }
  }

  function handleForwardTrack() {
    if (forwardTrackIe.length > 0) {
      const lastUrl = forwardTrackIe[forwardTrackIe.length - 1]; 
      setProjectUrl(lastUrl);
      setForwardTrackIe(prev => prev.slice(0, -1)); 
      setBackTrackIe(prev => [...prev, lastUrl]);
    }
  }

  function handleRefresh() {
    setIframeKey(prevKey => prevKey + 1);
  }

  function handleFetchLinkDes(projectName) {
    return allIEPRojects.find((project) => project.id === projectName)?.url;
  }
  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={openProjectExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Internet')}
      >
        <div className='folder_folder-open-project' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Internet');
            }}
            style={ openProjectExpand.expand ? inlineStyleExpand('Internet') : inlineStyle('Internet')}>
          <div className="folder_dragbar"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: openProjectExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname">
              <img src={ie} alt="ie" style={{ width: '20px'}} />
                <span>
                    {projectname() === 'Www' ? 'Google' : projectname()}
                </span>
              </div>
            <div className="folder_barbtn">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setOpenProjectExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Internet') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setOpenProjectExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Internet')
                  }}
                    onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand ${openProjectExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {openProjectExpand.expand ? 
                (
                <div className="expand_2"></div>
                )
                :
                (null)}
              </div>
              <div>
                <p className='x'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Internet')
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('Internet')
              }}
                >×</p>
              </div>
            </div>
          </div>

          <div className="file_edit_container">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="address_container_btn">
            <div className="btn_addy"
              onClick={handleBackTrack}
            >
              <img src={left} alt="" />
              <p>Back</p>
            </div>
            <div className="btn_addy"
              onClick={handleForwardTrack}
            >
              <img src={right} alt="" />
              <p>Right</p>
            </div>
            <div className="btn_addy">
              <img src={stop} alt="" style={{top: '-1px'}} />
              <p>Stop</p>
            </div>
            <div className="btn_addy"
              onClick={handleRefresh}
            >
              <img src={refresh} alt="" style={{top: '-1px', width: '18px'}} />
              <p>Refresh</p>
            </div>
            <div className="btn_addy"
              onClick={() => {
                setIframeKey(prevKey => prevKey + 1);
                handleShow('IE')
              }}
            >
              <img src={home} alt="" style={{top: '-1px'}} />
              <p>Home</p>
            </div>
            
          </div>
          <div className="address_container">
            <p className='address'>Address:</p>
            <div className="address_box">
                <p>{projectUrl.length > 1 ? projectUrl : 'Type your URL here'}</p>
                <div 
                  onClick={() => setExpandAddy(prev => !prev)}
                >
                  <img src={downArrow} alt="" />
                </div>
            </div>
            {expandAddy && (
              <div className="addy_expand_container">
                {allIEPRojects.map((project) => (
                  <div key={project.id}
                    onClick={() => {
                      handleShow(project.id)
                      setExpandAddy(false)
                    }}
                  >
                    <p>
                      {project.label}
                    </p>
                    <span>
                      {project.url}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="openproject_content"
            onClick={() => iconFocusIcon('Internet')}
            style={openProjectExpand.expand ? 
              { height: 'calc(100svh - 175px)'} 
              : 
              {}
            }
          >
        {openProjectExpand.show && (
          <iframe
          key={iframeKey}
          src={projectUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          scrolling="yes"
        />
        )}
        
          </div>
          <div className='ifram_text_container'>
            <p>
                If page does not load, please click <a href={projectUrl.length < 1 ? '#' : projectUrl} target="_blank" rel="noopener noreferrer">here</a> to view directly.
            </p>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default OpenProject
