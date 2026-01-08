import Examdetails from './Examdetails.jsx';
import Table from './Table.jsx';
const Header=()=>{
    return(
        <header>
            <div className="header-container">
                <div className="logo">
                   
                </div>
                <div className="header-info">
                    <h2 className="text-center  m-20 text-3xl font-medium decoration-solid ">B-Form(Faculty/Invigilator Copy)</h2>
                    <Examdetails />
                    

                </div>
            </div>
        </header>
    )
}
export default Header;