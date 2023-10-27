import React, {FC} from "react";
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'


interface PaginationProps {
    onChangePage: (number: number) => void,
    countPage: number
}

const Pagination:FC<PaginationProps> = ({ onChangePage, countPage }) => {
    return (
        <ReactPaginate className={styles.root}
                       breakLabel="..."
                       nextLabel=">"
                       onPageChange={(event => onChangePage(event.selected + 1))}
                       pageRangeDisplayed={5}
                       pageCount={countPage}
                       previousLabel="<"
                       renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
