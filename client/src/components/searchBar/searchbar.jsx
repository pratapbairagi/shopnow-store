import {Search, XLg} from "react-bootstrap-icons"
import { useDispatch } from "react-redux"
import { get_all_products_action } from "../../redux/product/product_actions"

const SearchBar = ({toggleSearchBar}) => {

    const dispatch = useDispatch()



    // <input type="text" placeholder="Keyword Search" defaultValue="" onChange={(e) => setSearch_options({ ...search_options, name: e.target.value })} className="form-control" />

    return(
        <div id={toggleSearchBar} className="d-flex" style={{width:"100%", maxWidth:"1000px", display:"flex", flexDirection:"column", padding:"0 0 16px 0", boxShadow:"grey 0 15px 10px -18px", justifyContent:"center", alignItems:"center", gap:"0", borderBottomLeftRadius:"8px", borderBottomRightRadius:"8px", background:"var(--white)", position:"fixed", top:"-100%", transition:".5s linear", margin:"auto", zIndex:"10", height:"20vh"  }}>
           <h4 className="text-success">SEARCH</h4>
            <div className="m-0" style={{display:"flex", padding:"2px", width:"80%", maxWidth:"400px",  minWidth:"200px", position:"relative", right:"0", height:"2.5rem", border:"1px solid grey", borderRadius:"8px"}}>
            <input placeholder="Search..." onChange={(e)=> dispatch(get_all_products_action(e.target.value))} className="py-1 px-3" style={{height:"100%", outline:"none", borderRadius:"8px", borderTopRightRadius:"0", borderBottomRightRadius:"0", color:"grey",  width:"calc(100% - 30px)", display:"block", padding:"1px 6px"}} type="search" name="" id="" />
            <button className="btn btn-success d-flex justify-content-center align-items-center "><Search size="20"/></button>
            </div>

            <button onClick={()=> document.getElementById(toggleSearchBar).style.top = "-100%"} style={{width:"25px", height:"25px", position:"absolute", bottom:"12px", background:"transparent", right:"6px", display:"grid", placeItems:"center"}}>
                <XLg size="16"/>
            </button>
        </div>
    )
}

export default SearchBar