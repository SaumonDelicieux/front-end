import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

const darkMode = () => {
    const [themeDark, setThemeDark] = React.useState<boolean>(false)
    const darkMode = () => {
        if (document.querySelector('html')?.classList.contains('dark')) {
            document.querySelector('html')?.classList.remove('dark')
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f8fafc')
            document
                .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
                ?.setAttribute('content', '#f8fafc')
            setThemeDark(false)
        } else {
            document.querySelector('html')?.classList.add('dark')
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#334155')
            document
                .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
                ?.setAttribute('content', '#334155')
            setThemeDark(true)
        }

        return (
            <div
                className="cursor-pointer m-1 text-slate-800 dark:text-slate-200"
                onClick={darkMode}
            >
                {themeDark ? <FiMoon /> : <FiSun />}
            </div>
        )
    }
}

export default darkMode
