import "./Nav.css"

const nav = ["Home", "Studios", "Events", "Contact"]
export const Nav = () => {
  return (
    <nav className="nav">
      <div className="logo">
        <img src="/assets/the-fold-logo.svg" alt="" width={120} height={25} />
      </div>
      <ul className="primary-nav">
        {nav.map((item, i) => (
          <li className="primary-nav--item" key={i}>
            <a href="/">{item}</a>
          </li>
        ))}
      </ul>
      <button className="btn">Become a Member</button>
    </nav>
  )
}
