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
import { projectProfiles } from '../data/portfolioData';


function OpenProject() {

  const [iframeKey, setIframeKey] = useState(0);
  const [expandAddy, setExpandAddy] = useState(false);
  const allIEPRojects = projectProfiles.flatMap((project) => {
    const descriptionEntry = {
      id: project.id,
      label: `${project.title} (Details)`,
      url: `project://${project.id}`,
      type: 'details',
    };

    const publicEntry = project.url
      ? {
          id: `${project.id}-public`,
          label: `${project.title} (Public URL)`,
          url: project.url,
          type: 'public',
        }
      : null;

    return publicEntry ? [descriptionEntry, publicEntry] : [descriptionEntry];
  });

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

  function isFrameBlockedUrl(url) {
    if (!url) return false;
    return url.includes('github.com') || url.includes('linkedin.com');
  }

  function getMirrorUrl(url) {
    if (!url || !url.startsWith('http')) return '';
    return `https://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`;
  }

  function openInsideBrowser(url) {
    if (!url) return;
    setProjectUrl(url);
    setBackTrackIe(prev => [...prev, url]);
    setForwardTrackIe([]);
    setExpandAddy(false);
    setIframeKey(prevKey => prevKey + 1);
  }

  const activeProject = (() => {
    const byId = projectProfiles.find((project) => projectUrl === `project://${project.id}`);
    if (byId) return byId;

    const byUrl = [...projectProfiles]
      .filter((project) => Boolean(project.url))
      .sort((a, b) => b.url.length - a.url.length)
      .find((project) => projectUrl.includes(project.url));

    return byUrl;
  })();

  const isProjectDetailsView = projectUrl.startsWith('project://');
  const embeddableUrl = !isProjectDetailsView && projectUrl.startsWith('http') ? projectUrl : '';
  const canEmbed = Boolean(embeddableUrl) && !isFrameBlockedUrl(embeddableUrl);
  const mirrorUrl = isFrameBlockedUrl(embeddableUrl) ? getMirrorUrl(embeddableUrl) : '';
  const splitColumns = window.innerWidth <= 800 ? '1fr' : '1.1fr 1fr';

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
                    {projectname() === 'Www' ? 'Project Search' : projectname()}
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
                    <p>{projectUrl.length > 1 ? projectUrl : 'Search project details or choose a public URL'}</p>
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
                      openInsideBrowser(project.url)
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
            <div style={{ display: 'grid', gridTemplateColumns: splitColumns, height: '100%' }}>
              <div style={{ borderRight: '1px solid #b8b8b8', position: 'relative' }}>
                {openProjectExpand.show && canEmbed ? (
                  <iframe
                    key={iframeKey}
                    src={embeddableUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    scrolling="yes"
                  />
                ) : (
                  <div style={{ padding: '18px', fontSize: '14px' }}>
                    <h3 style={{ marginBottom: '10px' }}>Project Search Results</h3>
                    <p style={{ marginBottom: '10px' }}>
                      {activeProject?.title || 'Select a project details page from the address list to view structured project results.'}
                    </p>
                    {embeddableUrl && !canEmbed ? (
                      <div style={{ marginBottom: '10px' }}>
                        <p style={{ marginBottom: '8px' }}>
                          This site blocks embedding in iframes. Use the links on the right to continue.
                        </p>
                        {mirrorUrl ? (
                          <button
                            type="button"
                            onClick={() => openInsideBrowser(mirrorUrl)}
                            style={{ padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}
                          >
                            Open text mirror in emulator
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                    <div style={{ border: '1px solid #d0d0d0', padding: '10px', background: '#f8f8f8' }}>
                      <p style={{ fontWeight: 'bold' }}>{activeProject?.title || 'No project selected'}</p>
                      <p>{activeProject?.summary || 'Project summary will appear here.'}</p>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: '12px', overflowY: 'auto', fontSize: '13px' }}>
                {activeProject ? (
                  <>
                    <h3>{activeProject.title}</h3>
                    <p><strong>{activeProject.projectType}</strong> - {activeProject.period}</p>
                    <p style={{ margin: '8px 0' }}>{activeProject.summary}</p>
                    <p><strong>What I built</strong></p>
                    <ul style={{ paddingLeft: '18px', marginBottom: '8px' }}>
                      {activeProject.whatIBuilt.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                    <p><strong>Outcomes</strong></p>
                    <ul style={{ paddingLeft: '18px', marginBottom: '8px' }}>
                      {activeProject.outcomes.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                    <p><strong>Skills used</strong></p>
                    <p>{activeProject.skillsUsed.join(', ')}</p>
                    {activeProject.url ? (
                      <div style={{ marginTop: '10px' }}>
                        <p>
                          <strong>Public URL:</strong>{' '}
                          <a
                            href={activeProject.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'blue', textDecoration: 'underline' }}
                          >
                            {activeProject.url}
                          </a>
                        </p>
                        <button
                          type="button"
                          onClick={() => openInsideBrowser(activeProject.url)}
                          style={{ marginTop: '6px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}
                        >
                          Open Public URL Here
                        </button>
                        <p style={{ marginTop: '8px' }}>
                          <a
                            href={activeProject.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'blue', textDecoration: 'underline' }}
                          >
                            View in your own browser
                          </a>
                        </p>
                      </div>
                    ) : null}
                    <p style={{ marginTop: '10px' }}>
                      <strong>Availability:</strong> {activeProject.url ? 'Public resources available in Address list.' : 'Contact Khizar Ahmed for more details.'}
                    </p>
                    {activeProject.confidentialityNote && (
                      <p style={{ marginTop: '8px' }}><strong>Note:</strong> {activeProject.confidentialityNote}</p>
                    )}
                  </>
                ) : (
                  <p>Select a project to view full sections and details.</p>
                )}
              </div>
            </div>
          </div>
          <div className='ifram_text_container'>
            <p>
                {activeProject?.url ? 'Use Open Public URL Here to load the page in this browser emulator, or View in your own browser to open a new tab.' : 'Contact Khizar Ahmed for non-public project details.'}
            </p>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default OpenProject
