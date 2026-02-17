import UseContext from '../Context';
import { useContext, useEffect, useMemo, useState } from 'react';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import { imageMapping } from './function/AppFunctions';
import '../css/AdminPanel.css';

function formatDate(value) {
  if (!value) return 'n/a';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'n/a';
  return date.toLocaleString();
}

function AdminPanel() {
  const {
    AdminExpand,
    setAdminExpand,
    themeDragBar,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,
    lastTapTime,
    setLastTapTime,
    adminAuthToken,
    adminOverview,
    fetchAdminOverview,
    clearAdminSession,
  } = useContext(UseContext);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const users = adminOverview?.users || [];
  const messages = adminOverview?.messages || [];

  const stats = useMemo(
    () => adminOverview?.stats || { totalUsers: 0, totalMessages: 0 },
    [adminOverview]
  );

  useEffect(() => {
    if (!AdminExpand.show || !adminAuthToken) return;

    const run = async () => {
      setLoading(true);
      setError('');
      try {
        await fetchAdminOverview();
      } catch (fetchError) {
        setError(fetchError?.message || 'Unable to load admin data');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [AdminExpand.show, adminAuthToken, fetchAdminOverview]);

  function handleDragStop(event, data) {
    const positionX = data.x;
    const positionY = data.y;
    setAdminExpand((prev) => ({
      ...prev,
      x: positionX,
      y: positionY,
    }));
  }

  function handleExpandStateToggle() {
    setAdminExpand((prev) => ({
      ...prev,
      expand: !prev.expand,
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setAdminExpand((prev) => ({
        ...prev,
        expand: !prev.expand,
      }));
    }
    setLastTapTime(now);
  }

  return (
    <Draggable
      axis="both"
      handle={'.folder_dragbar'}
      grid={[1, 1]}
      scale={1}
      disabled={AdminExpand.expand}
      bounds={{ top: 0 }}
      defaultPosition={{
        x: window.innerWidth <= 500 ? 8 : 70,
        y: window.innerWidth <= 500 ? 80 : 70,
      }}
      onStop={handleDragStop}
      onStart={() => handleSetFocusItemTrue('Admin')}
    >
      <div
        className="folder_folder-admin"
        onClick={(e) => {
          e.stopPropagation();
          handleSetFocusItemTrue('Admin');
        }}
        style={AdminExpand.expand ? inlineStyleExpand('Admin') : inlineStyle('Admin')}
      >
        <div
          className="folder_dragbar"
          onDoubleClick={handleExpandStateToggle}
          onTouchStart={handleExpandStateToggleMobile}
          style={{ background: AdminExpand.focusItem ? themeDragBar : '#757579' }}
        >
          <div className="folder_barname">
            <img src={imageMapping('Admin')} alt="" style={{ width: '16px' }} />
            <span>Admin Console</span>
          </div>
          <div className="folder_barbtn">
            <div
              onClick={
                !isTouchDevice
                  ? (e) => {
                      e.stopPropagation();
                      setAdminExpand((prev) => ({ ...prev, hide: true, focusItem: false }));
                      StyleHide('Admin');
                    }
                  : undefined
              }
              onTouchEnd={(e) => {
                e.stopPropagation();
                setAdminExpand((prev) => ({ ...prev, hide: true, focusItem: false }));
                StyleHide('Admin');
              }}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <p className="dash"></p>
            </div>
            <div onClick={!isTouchDevice ? handleExpandStateToggle : undefined} onTouchEnd={handleExpandStateToggle}>
              <motion.div className={`expand ${AdminExpand.expand ? 'full' : ''}`}></motion.div>
              {AdminExpand.expand ? <div className="expand_2"></div> : null}
            </div>
            <div>
              <p
                className="x"
                onClick={!isTouchDevice ? () => deleteTap('Admin') : undefined}
                onTouchEnd={() => deleteTap('Admin')}
              >
                ×
              </p>
            </div>
          </div>
        </div>

        <div
          className="admin_content"
          onClick={() => iconFocusIcon('Admin')}
          style={AdminExpand.expand ? { height: 'calc(100svh - 90px)' } : {}}
        >
          <div className="admin_actions">
            <button
              type="button"
              onClick={async () => {
                setLoading(true);
                setError('');
                try {
                  await fetchAdminOverview();
                } catch (fetchError) {
                  setError(fetchError?.message || 'Unable to load admin data');
                } finally {
                  setLoading(false);
                }
              }}
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={() => {
                clearAdminSession();
                deleteTap('Admin');
              }}
            >
              Logout Admin
            </button>
            <span>
              Users: {stats.totalUsers} | Messages: {stats.totalMessages}
            </span>
          </div>

          {!adminAuthToken ? (
            <div className="admin_empty">Admin session not authenticated.</div>
          ) : null}

          {error ? <div className="admin_error">{error}</div> : null}
          {loading ? <div className="admin_empty">Loading...</div> : null}

          <div className="admin_grid">
            <div className="admin_section">
              <h3>Users</h3>
              <div className="admin_table_scroll">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Messages</th>
                      <th>Last Seen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.messageCount}</td>
                        <td>{formatDate(user.lastSeenAt)}</td>
                      </tr>
                    ))}
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={4}>No users found.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin_section">
              <h3>Messages</h3>
              <div className="admin_messages_scroll">
                {messages.map((message) => (
                  <div key={message.id} className="admin_message_card">
                    <p className="meta">
                      #{message.id} | {message.username} | {formatDate(message.createdAt)}
                    </p>
                    <p>{message.body}</p>
                  </div>
                ))}
                {messages.length === 0 ? <p>No messages found.</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default AdminPanel;
