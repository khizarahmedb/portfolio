import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import resumefile from '../assets/resume.png'
import '../css/ResumeFile.css'



function ResumeFile() {

  const { 
    themeDragBar,
    ResumeFileExpand, setResumeFileExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,

   } = useContext(UseContext);

   const [activeSection, setActiveSection] = useState('experience')

   const sections = {
    experience: {
      title: 'Experience',
      items: [
        'Head of Automations for Marketing - Nysonian Inc (Sep 2025 - Present)',
        'Software Team Lead - TFG Solutions (Jan 2025 - Aug 2025)',
        'Junior Engineer - CodeCargo (Oct 2024 - Dec 2024)',
        'Web Developer - Split Creatives (Apr 2024 - Sep 2024)',
        'Software Engineer Intern - Simation Studios (Sep 2023 - Mar 2024)'
      ]
    },
    impact: {
      title: 'Impact',
      items: [
        'Reduced reporting turnaround by 90% using automation pipelines.',
        'Verified 8 security findings including 2 critical account-impact paths.',
        'Built production workflows for finance, marketing, and operations.'
      ]
    },
    education: {
      title: 'Education',
      items: [
        'BS Computer Science - SZABIST, Karachi',
        'Graduated: 2024',
        'GPA: 3.40'
      ]
    },
    contact: {
      title: 'Contact',
      items: [
        'Khizar Ahmed',
        'Software Engineer',
        'Email: khizar18ahmed@gmail.com',
        'Phone: +92 345 3666623',
        'Location: Karachi, Pakistan',
        'LinkedIn: https://www.linkedin.com/in/khizar-ahmed-0a62841b5/'
      ]
    }
   }

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setResumeFileExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setResumeFileExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setResumeFileExpand(prevState => ({
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
        handle={'.folder_dragbar-resumefile'}
        grid={[1, 1]}
        scale={1}
        disabled={ResumeFileExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('ResumeFile')}
      >
        <div className='folder_folder-resumefile' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('ResumeFile');
            }}
            style={ ResumeFileExpand.expand ? inlineStyleExpand('ResumeFile') : inlineStyle('ResumeFile')}>
          <div className="folder_dragbar-resumefile"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ResumeFileExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname-resumefile">
              <img src={resumefile} alt="resumefile" />
              <span>Resume</span>
            </div>
            <div className="folder_barbtn-resumefile">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setResumeFileExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('ResumeFile') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setResumeFileExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('ResumeFile')
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-resumefile'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-resumefile ${ResumeFileExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {ResumeFileExpand.expand ? 
                (
                <div className="expand_2-resumefile"></div>
                )
                :
                (null)}
              </div>
              <div>
                <p className='x-resumefile'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('ResumeFile')
                  setActiveSection('experience')
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('ResumeFile')
                  setActiveSection('experience')
              }}
                >×</p>
              </div>
            </div>
          </div>

          <div className="file_edit_container-resumefile" style={{ paddingLeft: '8px', gap: '12px' }}>
            {Object.entries(sections).map(([key, val]) => (
              <p
                key={key}
                onClick={() => setActiveSection(key)}
                style={{
                  cursor: 'pointer',
                  fontWeight: activeSection === key ? 'bold' : 'normal',
                  textDecoration: activeSection === key ? 'underline' : 'none'
                }}
              >
                {val.title}
              </p>
            ))}
          </div>

          <div className="folder_content-resumefile"
            style={ResumeFileExpand.expand ? 
              { height: 'calc(100svh - 72px)'} /// fullscreen btm nav
              : 
              {}
            }

          >
            {ResumeFileExpand.show ? (
              <div style={{ padding: '14px', fontSize: '14px', lineHeight: '1.45' }}>
                <h3 style={{ marginBottom: '10px' }}>{sections[activeSection].title}</h3>
                <ul style={{ paddingLeft: '18px' }}>
                  {sections[activeSection].items.map((item) => (
                    <li key={item} style={{ marginBottom: '8px' }}>{item}</li>
                  ))}
                </ul>
                {activeSection !== 'contact' && (
                  <p style={{ marginTop: '14px' }}>
                    Open the Projects window for full case studies, outcomes, and technical breakdowns.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </Draggable>
    </>
  )
}          


export default ResumeFile
