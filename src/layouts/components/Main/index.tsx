import { Outlet, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { useEffect, useState } from 'react'

import { Layout } from 'antd'

import Tabs from '../Tabs'

import { TRANSITION_CLASSES } from '@/enums/appEnum'
import { useAppStore } from '@/store/application'

const { Content } = Layout
export default function Main() {
  const { getProjectConfig } = useAppStore()
  const [show, setShow] = useState(true)
  const location = useLocation()
  const [transitionKey, setTransitionKey] = useState(location.key)
  useEffect(() => {
    setShow(false)
  }, [location])
  return (
    <TransitionGroup>
      <CSSTransition
        key={transitionKey}
        classNames={TRANSITION_CLASSES[getProjectConfig().transitionName]}
        timeout={300}
        mountOnEnter
        unmountOnExit
        in={show}
        appear
        onExited={() => {
          setTransitionKey(location.key)
          setShow(true)
        }}
      >
        <Content>
          {getProjectConfig().showTabs && <Tabs></Tabs>}
          <Outlet></Outlet>
        </Content>
      </CSSTransition>
    </TransitionGroup>
  )
}
