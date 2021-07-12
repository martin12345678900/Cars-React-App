import { carListingsSearch } from '../../../services/requests';
import CarList from '../Common/CarList/CarList';
import Loader from '../Common/Loader/Loader';
import useFetch from '../../../CustomHook/FetchDataCustomHook';

import style from './SearchResult.module.css';

function SearchResultByYear({
    match
}) {
    const [searchResults, isResults] = useFetch(carListingsSearch, [], match.params.year);

    return (
        <section>
            <h2 className={style.searchTitle}>Results:</h2>
            <div className={style.searchListings}>

                {
                    !isResults
                        ? <Loader />
                        : searchResults.length === 0 ? <p className={style.noCars}> No search results.</p> : searchResults.map(search => <CarList key={search._id} {...search} />)
                }
            </div>
        </section>
    );
}

export default SearchResultByYear;