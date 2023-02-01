import "./App.css"
import { useEffect, useRef } from "react"
import { useSpring, animated as a, to } from "react-spring"
import useWindowScroll from "@react-hook/window-scroll"
import useScrollWidth from "./useScrollWidth"

import { Nav } from "./Nav"
import { Section } from "./Section"

function ScrollCarousel({ children }) {
  const refHeight = useRef(null)
  const refTransform = useRef(null)

  const { scrollWidth } = useScrollWidth(refTransform)
  const elHeight = scrollWidth - (window.innerWidth - window.innerHeight)

  const [{ scrollTop }, api] = useSpring(() => ({ scrollTop: 0 }))

  const interpolateTransform = to([scrollTop], scrollOffset => {
    return `translate3d(${-scrollOffset}px, 0, 0)`
  })

  const scrollY = useWindowScroll(45)

  useEffect(() => {
    api.start({ scrollTop: scrollY })
  }, [scrollY])

  return (
    <div className="scroll-carousel" ref={refHeight} style={{ height: elHeight }}>
      <div className="sticky-box">
        <a.div
          style={{ transform: interpolateTransform }}
          className="transform-box"
          ref={refTransform}
        >
          {children}
        </a.div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <ScrollCarousel>
          <div className="box">
            <div className="hero">
              <h1>Hero</h1>
              <div>Use vertical scroll to move the content ⥟</div>
            </div>
          </div>
          <div className="box">
            <Section index={1} />
          </div>
          <div className="box">
            <Section index={2} />
          </div>
          <div className="box">
            <Section index={3} />
          </div>
        </ScrollCarousel>
      </div>
    </>
  )
}
