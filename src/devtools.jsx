import React from 'react'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

var DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" defaultIsVisible={false} changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
)

export default DevTools;