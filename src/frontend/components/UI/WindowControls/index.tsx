import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './index.scss'

export default function WindowControls() {
  const [maximized, setMaximized] = useState<boolean>()
  const { t } = useTranslation()

  useEffect(() => {
    // get initial window state since app might start maximized
    window.api.isMaximized().then((val) => setMaximized(val))
  }, [])
  // need to subscribe to maximized/unmaximized events to update our state
  // since double clicking on draggable areas will also maximize/unmaximize the window
  useEffect(() => window.api.handleMaximized(() => setMaximized(true)), [])
  useEffect(() => window.api.handleUnmaximized(() => setMaximized(false)), [])

  const handleMinimize = () => window.api.minimizeWindow()

  const handleMaximize = () =>
    maximized ? window.api.unmaximizeWindow() : window.api.maximizeWindow()

  const handleClose = () => window.api.closeWindow()

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '40px',
    backgroundColor: '#1a1a1a',
    borderBottom: '1px solid #2d2d2d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
    WebkitAppRegion: 'drag',
    userSelect: 'none'
  } as React.CSSProperties & { WebkitAppRegion: string }

  const titleStyle: React.CSSProperties = {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    paddingLeft: '16px',
    flex: 1
  }

  const controlsContainerStyle = {
    display: 'flex',
    height: '100%',
    WebkitAppRegion: 'no-drag'
  } as React.CSSProperties & { WebkitAppRegion: string }

  const buttonBaseStyle: React.CSSProperties = {
    width: '46px',
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    padding: 0,
    outline: 'none'
  }

  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const getButtonStyle = (buttonType: string): React.CSSProperties => {
    const isHovered = hoveredButton === buttonType
    const baseStyle = { ...buttonBaseStyle }

    if (isHovered) {
      if (buttonType === 'close') {
        baseStyle.backgroundColor = '#e81123'
      } else {
        baseStyle.backgroundColor = 'rgba(255, 255, 255, 0.1)'
      }
    }

    return baseStyle
  }

  return (
    <div style={headerStyle}>
      <div style={titleStyle}>Heroic Games Launcher</div>
      <div style={controlsContainerStyle}>
        <button
          style={getButtonStyle('minimize')}
          title={t('window.minimize', 'Minimize window')}
          onClick={handleMinimize}
          onMouseEnter={() => setHoveredButton('minimize')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="0" y="5" width="12" height="2" fill="currentColor" />
          </svg>
        </button>
        <button
          style={getButtonStyle('maximize')}
          title={
            maximized
              ? t('window.restore', 'Restore window')
              : t('window.maximize', 'Maximize window')
          }
          onClick={handleMaximize}
          onMouseEnter={() => setHoveredButton('maximize')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {maximized ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect
                x="2"
                y="0"
                width="10"
                height="10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <rect
                x="0"
                y="2"
                width="10"
                height="10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect
                x="0.75"
                y="0.75"
                width="10.5"
                height="10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          )}
        </button>
        <button
          style={getButtonStyle('close')}
          title={t('window.close', 'Close')}
          onClick={handleClose}
          onMouseEnter={() => setHoveredButton('close')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
