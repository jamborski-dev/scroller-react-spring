import "./Section.css"

import { useRef, useEffect } from "react"
import useWindowScroll from "@react-hook/window-scroll"
import useScrollWidth from "./useScrollWidth"
import { useSpring, animated as a, to } from "react-spring"

export const Section = ({ index }) => {
  const refTransform = useRef(null)
  const { scrollWidth: sectionWidth } = useScrollWidth(refTransform)

  const scrollY = useWindowScroll(45)

  const [{ y }, api] = useSpring(() => ({ y: 0 }))

  const inViewPercentage = () => {
    const inView = sectionWidth * index - scrollY

    if (inView <= 0) return 0

    return (inView / sectionWidth) * 100
  }

  const interpolatePosition = to([y], scrollOffset => {
    return `translate3d(0, ${-scrollOffset}%, 0)`
  })

  const interpolatePositionInvert = to([y], scrollOffset => {
    return `translate3d(0, ${scrollOffset}%, 0)`
  })

  useEffect(() => {
    api.start({ y: inViewPercentage() })
  }, [scrollY])

  return (
    <section ref={refTransform} className="section-grid grid-v1">
      <a.header className="slide-title" style={{ transform: interpolatePosition }}>
        <h2 className="heading">Spaces</h2>
      </a.header>

      <a.div
        className="image-container slide-primary-image"
        style={{ transform: interpolatePositionInvert }}
      >
        <img src={`/assets/${index}.jpeg`} alt="Image" />
      </a.div>
      <a.div
        className="image-container slide-secondary-image"
        style={{ transform: interpolatePosition }}
      >
        <img src={`/assets/${index + 1}.jpeg`} alt="Image" />
      </a.div>
      <a.div className="slide-content" style={{ transform: interpolatePositionInvert }}>
        <h3 className="heading">Heading here</h3>
        <p className="text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, eius. Debitis magni
          beatae laboriosam illum optio nostrum cupiditate. Aut, dolorum.
        </p>
        <button className="btn -primary">Call to action</button>
      </a.div>
    </section>
  )
}
