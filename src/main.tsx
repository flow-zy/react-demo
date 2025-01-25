import { createRoot } from 'react-dom/client'

import '@/language/index'
import App from './App.tsx'
import './styles/base.css'
// @ts-ignore
import 'virtual:svg-icons-register'

createRoot(document.getElementById('root')!).render(<App />)
