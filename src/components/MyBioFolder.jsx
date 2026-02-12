import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import About from '../assets/ipng.png'
import bioPC from '../assets/bio_pc.png'
import tech from '../assets/tech.png'
import hobby from '../assets/hobby.png'
import { skillCatalog } from '../data/portfolioData';
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [generalTap, setGenerapTap] = useState(true)
  const [careerTap, setCareerTap] = useState(false)
  const [technologyTap, setTechnologyTap] = useState(false)
  const [hobbTap, setHobbTap] = useState(false)

  const { 
    themeDragBar,
    MybioExpand, setMybioExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    setCurrentFolder,
    setMyComputerExpand,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

  function openSkillsDialog() {
    setCurrentFolder('DiskC');
    setMyComputerExpand((prev) => ({
      ...prev,
      show: true,
      hide: false,
      focusItem: true,
    }));
    handleShow('MyComputer');
  }

  const technologyText = ( // don't have to use DangerousHTML
    <>
        <strong>Core Stack:</strong>
        <br />
        <span>{skillCatalog.languages.slice(0, 8).join(', ')}</span>
        <br />
        <span>{skillCatalog.frontend.slice(0, 8).join(', ')}</span>
        <br />
        <span>{skillCatalog.backend.slice(0, 8).join(', ')}</span>
        <br />
        <br />
        <strong>Data + Security + Automation:</strong>
        <br />
        <span>{skillCatalog.data.slice(0, 7).join(', ')}</span>
        <br />
        <span>{skillCatalog.qaSecurity.slice(0, 7).join(', ')}</span>
        <br />
        <span>{skillCatalog.automation.slice(0, 7).join(', ')}</span>
        <br />
        <br />
        <strong>Infra + Delivery:</strong>
        <br />
        <span>{skillCatalog.infra.slice(0, 8).join(', ')}</span>
        <br />
        <br />
        <strong>Applied In:</strong>
        <br />
        <span>MUNIK XVI, Invader Shop, TripleWhale Assistant, agents-config, QA/AppSec execution workflows.</span>
    </>
  );

  const bioText = ( // don't have to use DangerousHTML
    <>
        <strong>Objective:</strong>
        <br />
        <span>Build scalable software and automation systems that connect paid-media data, business analytics,</span>
        <br />
        <span>and daily operating decisions.</span>
        <br />
        <br />
        <strong>Information:</strong>
        <br />
        <span>Khizar Ahmed</span>
        <br />
        <span>Software Engineer</span>
        <br />
        <span>+92 345 3666623</span>
        <br />
        <span>khizar18ahmed@gmail.com</span>
        <br />
        <br />
        <strong>Location: </strong>
        <br />
        <span>Karachi, Pakistan</span>
        <br />
        <span>Open to work</span>
        <br />
        <span>Remote / Hybrid / On-site</span>
        <br />
        <br />
        <strong>Impact Snapshot:</strong>
        <br />
        <span>Reporting time reduction: 90%</span>
        <br />
        <span>Verified security findings: 8</span>
        <br />
        <span>Delivery stack: Next.js + TypeScript</span>
        <br />
        <br />
        <strong>Quick Links:</strong>
        <br />
        <a href="https://www.linkedin.com/in/khizar-ahmed-0a62841b5/" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>LinkedIn</a>
        <br />
        <a href="https://github.com/khizarahmedb" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>GitHub</a>
        <br />
        <span>CV and thesis details are available on direct request.</span>
    </>
  );

  const careerText = (
    <>
        <strong>Current and Recent Roles:</strong>
        <br />
        <span>Head of Automations for Marketing, Nysonian Inc (Sep 2025 - Present)</span>
        <br />
        <span>Software Team Lead, TFG Solutions (Jan 2025 - Aug 2025)</span>
        <br />
        <span>Junior Engineer, CodeCargo (Oct 2024 - Dec 2024)</span>
        <br />
        <span>Web Developer, Split Creatives (Apr 2024 - Sep 2024)</span>
        <br />
        <span>Software Engineer Intern, Simation Studios (Sep 2023 - Mar 2024)</span>
        <br />
        <br />
        <strong>Education:</strong>
        <br />
        <span>BS Computer Science, SZABIST Karachi, 2024</span>
        <br />
        <span>GPA: 3.40</span>
        <br />
        <br />
        <strong>Primary Projects:</strong>
        <br />
        <span>MUNIK XVI website, Invader Shop, TripleWhale Assistant, agents-config, decentralized insurance FYP, QA/AppSec execution.</span>
    </>
  );

  const hobbyText = ( // don't have to use DangerousHTML
    <>
        Outside work, I like shipping side projects, improving developer workflows,
        and experimenting with unusual UI concepts.
        I also follow security research, growth analytics, and long-form technical writing.
        Most weekends are spent polishing product ideas or exploring automation scripts.
    </>
  );

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMybioExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }


  function handleBiotap(name) {
    setGenerapTap(name === 'general');
    setCareerTap(name === 'career');
    setTechnologyTap(name === 'technology');
    setHobbTap(name === 'hobby');
  }

  const activeBtnStyle = {
    bottom: '2px',
    outline: '1px dotted black',
    outlineOffset: '-5px',
    borderBottomColor: '#c5c4c4',
    zIndex: '3'
  };


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={MybioExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 35 : 70,
          y: window.innerWidth <= 500 ? 35 : 40,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('About')}
      >
        <motion.div className='bio_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('About');
            }}
            style={ MybioExpand.expand ? inlineStyleExpand('About') : inlineStyle('About')}>
          <div className="folder_dragbar"
             style={{ background: MybioExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="bio_barname">
              <img src={About} alt="About" />
              <span>About</span>
            </div>
            <div className="bio_barbtn">
              <div onClick={ !isTouchDevice ? (e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('About')
              } : undefined
              }   
                onTouchEnd={(e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('About')
              }}
              onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>

                <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => {
                    deleteTap('About')
                    handleBiotap('general')
                  }: undefined}
                  onTouchEnd={() => {
                    deleteTap('About')
                    handleBiotap('general')
                  }}
                >×
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bio">
          <p  onClick={() => handleBiotap('general')}
              style={generalTap ? activeBtnStyle : {}}
          >General
          </p>
          <p onClick={() => handleBiotap('career')}
              style={careerTap ? activeBtnStyle : {}}
          >Career
          </p>
          <p onClick={() => handleBiotap('technology')}
              style={technologyTap ? activeBtnStyle : {}}
          >Technology
          </p>
          <p onClick={() => handleBiotap('hobby')}
                  style={hobbTap ? activeBtnStyle : {}}
          >Hobby
          </p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bio"
              style={{ display: generalTap || careerTap ? 'grid' : 'block' }}
            >
            <img
              alt="bioPC"
              className={generalTap || careerTap ? 'bio_img' : 'bio_img_other'}
              src={generalTap || careerTap ? bioPC : (technologyTap ? tech : hobby)}
            />
            <div
              className="biotext_container">

              <p className={generalTap || careerTap ? 'bio_text_1' : 'bio_text_1_other'}>
                {generalTap ? bioText : careerTap ? careerText : technologyTap ? technologyText : hobbyText}
              </p>
              {technologyTap ? (
                <p className='bio_text_1_other' style={{ paddingTop: '6px' }}>
                  <span
                    onClick={openSkillsDialog}
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Open Skills Dialog
                  </span>
                </p>
              ) : null}
            </div>
              
            </div>
            <div className="bio_btn_container">
              <div className="bio_btn_ok"
              onClick={!isTouchDevice ? () => {
                deleteTap('About')
                handleBiotap('general')
              } : undefined}
              onTouchEnd={() => {
                deleteTap('About')
                handleBiotap('general')
              }}
              >
                <span>
                  OK
                </span>
              </div>
              <div className="bio_btn_cancel"
              onClick={!isTouchDevice ? () => {
                deleteTap('About')
                handleBiotap('general')
              } : undefined}
              onTouchEnd={() => {
                deleteTap('About')
                handleBiotap('general')
              }}
              ><span>Cancel</span></div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default MyBioFolder
