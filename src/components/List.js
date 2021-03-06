import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const style = {
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            marginLeft:'5px',
            padding: '10px 15px',
            border:'none',
            backgroundColor: 'lightblue',
            fontSize: '14px',
            borderRadius: '5px',
            cursor: 'pointer'
        },
        favoriteBtn:{
            marginTop: '10px'
        }
    },
    squareStyle : {
        width: "30px",
        height: "30px",
        border : '1px solid black',
        backgroundColor: "#ddd",
        margin: "4px",
        display: "flex",
        justifyContent: "left",
        alignItems: "left",
        fontSize: "20px",
        color: "black"
    },
    showImage : {
      height :'100%',
      width: '100%'
    },
    divFlex : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}

const List = ({ search }) => {

    const [listFavorites, setListFavorites] = useState([]);
    const [listShow, setListShows] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [showIMDB, setShowIMDB] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                debugger;
                let lstFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
                setListFavorites(lstFavorites);

                if(showFavorites && listFavorites.length && search){
                    lstFavorites = lstFavorites.filter(item =>{

                        return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                    });
                    setListFavorites(lstFavorites);
                } else {
                    const currentSearch = search ? 'search/' : '';
                    const searchDynamic = search ? `?q=${search}` : '';

                    axios.get(`http://api.tvmaze.com/${currentSearch}shows${searchDynamic}`)
                        .then((data) => {
                            if (data.data) {

                                let arrayTemp = [];
                                data.data.map(item => {
                                    const newShow = {
                                        id: item?.show?.id || item?.id,
                                        name: item?.show?.name || item?.name,
                                        imageMedium: item?.show?.image?.medium || item.image?.medium,
                                        imageOriginal: item?.show?.image?.original || item.image?.original,
                                        summary: item?.show?.summary || item?.summary,
                                        imdb: item?.show?.externals?.imdb || item.externals?.imdb
                                    }
                                    arrayTemp.push(newShow);
                                });
                                setListShows(arrayTemp);

                            }
                        })
                        .catch(error => {
                            //setCity(null);
                        });

                }

            } catch (error) {
                //setCity(null);
            };





        })();

    }, [search]);

    const deleteFromFavorites = ( e) => {
        e.preventDefault();debugger;

        if(existsInFavorites(showSelected.id)){
            setShowQuestion(true);
        }else {
            addFavorites(showSelected);
        }
    }
    const addFavorites = (show, e) =>{
        if(e){
            e.preventDefault();
        }

        let tmpListFavorite = [];

        if(existsInFavorites(show.id)){
            tmpListFavorite = listFavorites.filter(item => item.id !== show.id);
        } else {
            tmpListFavorite = [...listFavorites, show];
        }

        setListFavorites(tmpListFavorite);
        localStorage.setItem("favorites", JSON.stringify(tmpListFavorite));

        if(showQuestion){
            setShowQuestion(false);
        }


    }
    const showImdb = (e,show) => {
        e.preventDefault();
        setShowIMDB(true);
    }

    const Modal = ({ show, handleClose, children, element }) => {
        const showHideClassName = show ? "modal display-block" : "modal display-none";
        const exists = existsInFavorites(element.id || -1);
        return (
            <div className={showHideClassName}>
                <section className="modal-main text-center">
                    <button onClick={handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div>
                        <h2>{element?.name}</h2>
                        <a href="" onClick={ (e)=> deleteFromFavorites(e)}>
                            { exists ? 'Remove from favorites' :'Add to favorites'}
                        </a>
                        <br/>
                        <img src={element?.imageMedium} />
                        <br/>

                        <div dangerouslySetInnerHTML={{__html: element?.summary}} />
                        <br/>
                        <a className={element.imdb ? 'display-block' : 'display-none'} href={element.imdb ? 'https://www.imdb.com/title/'+ element.imdb : ''} target="_blank">View IMDB</a>
                    </div>
                </section>
            </div>
        );
    };

    const existsInFavorites = (id) => {
        if (listFavorites.find( favorite => favorite.id === id)){
            return true;
        }
        return false;
    }

    const viewFavorites = (e) => {
        e.preventDefault();
        setShowFavorites(showFavorites !== true);
        //setListShows(showFavorites ? listFavorites : listShow);
    }

    const openModal = (show) =>{
        setShowSelected(show);
        setShowModal(true);

    }

    const listDynamic = showFavorites ? listFavorites : listShow;

    const rows = listDynamic.map((item, index ) => {

        return  (<tr key={index}>
            <td className="text-center">
                <div className="square" style={style.squareStyle}>
                    <img src={item.imageMedium} style={style.showImage}/>
                </div>
            </td>
            <td><span onClick={()=>openModal(item)}>{item.name}</span></td>
            <td className="text-center">
                <input type="radio" checked={ existsInFavorites(item.id)} name={item.name} value={item.id} onChange={()=> addFavorites(item)}/>
            </td>
        </tr>)
    });

    return (
        <div>
            <div className="row">

                <div className="col-12">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th colSpan="3" className="text-center">
                                <button onClick={(e) => viewFavorites(e)}>
                                    {showFavorites ? 'View All' : 'View Favorites'}
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody id="myTable">
                        {rows}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal element={showSelected} show={showModal} handleClose={()=>setShowModal(false)}>

            </Modal>
            <div className={ showQuestion ? "modal display-block" : "modal display-none"} tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Question</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setShowQuestion(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>¿Do you want to remove this element from favorites?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>setShowQuestion(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => addFavorites(showSelected, e)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

List.propTypes = {
}

const mapStateToProps = state => ({
    search: state.simpleReducer.search
});

export default connect(mapStateToProps, null)(List);

