import '../index.css';

function Footer(){
  return(
    <footer className="footer">
      <p className="footer__paragraph">© {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  )
}
export default Footer