import React, {FC} from "react";
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {setCurrentPage} from "../../redux/slices/paginationSlice";


const Pagination: FC = () => {
    const dispatch = useAppDispatch();
    const {countPage} = useAppSelector((state) => state.pagination)

    return (
        <ReactPaginate className={styles.root}
                       breakLabel="..."
                       nextLabel=">"
                       onPageChange={(event => dispatch(setCurrentPage(event.selected + 1)))}
                       pageRangeDisplayed={5}
                       pageCount={countPage}
                       previousLabel="<"
                       renderOnZeroPageCount={null}
                       marginPagesDisplayed={0}/>
    );
};

export default Pagination;
