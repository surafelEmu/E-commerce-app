import React , {Fragment ,useState , useEffect} from 'react'

// import {useDispatch , useSelector} from 'react-redux' ;
// import { getProducts } from '../../actions/productActions'
// import Pagination from 'react-js-pagination' ;
// import { MetaData  } from './MetaData';
// import Loader from './layout/loader'
// import Product from './product/product' ;
// import { useAlert } from 'react-alert' ;

 const Search = ({history}) => {

    const [keyword ,setKeyword] = useState(1) ;

        const searchHandler = (e) => {
        e.preventDefault()

        if(keyword) {
            history.push(`/search/${keyword}`)

        }else {
            history.push(`/`)
        }
    }


    return (
                    <form onSubmit={searchHandler}>
                <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
            </form>
       
  
    )
}

export default  Search ;



// import React , {useState} from 'react'


// const search = ({history}) => {

//     const [keyword ,setKeyword] = useState('') ;

//     const searchHandler = (e) => {
//         e.preventDefault()

//         if(keyword) {
//             history.push(`/search/${keyword}`)

//         }else {
//             history.push(`/`)
//         }
//     }
//     return (
        
//             <form onSubmit={searchHandler}>
//                 <div className="input-group">
//           <input
//             type="text"
//             id="search_field"
//             className="form-control"
//             placeholder="Enter Product Name ..."
//             onChange={(e) => setKeyword(e.target.value)}
//           />
//           <div className="input-group-append">
//             <button id="search_btn" className="btn">
//               <i className="fa fa-search" aria-hidden="true"></i>
//             </button>
//           </div>
//         </div>
//             </form>
       
//     )
// }

// export default search
