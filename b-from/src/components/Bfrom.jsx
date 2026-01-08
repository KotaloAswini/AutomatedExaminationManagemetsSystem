import Header from './Header';
import Table from './Table';
import Tableinfo from './Tableinfo';
import Footer from './Footer';



const Bfrom=()=>{
    return(
        <>
        <div className="b-from min-h-screen px-8 py-6 flex flex-col items-center">  
            <div className="w-full max-w-5xl px-8 space-y-6">    
            <Header />
            <Table />
            <Tableinfo />   
            <Footer />
            </div>
        </div>
        </>
    )
}
export default Bfrom;