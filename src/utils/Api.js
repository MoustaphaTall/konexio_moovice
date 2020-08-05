import { API_KEY, API_ROOT } from '../Config';
import moment from 'moment';

class Api {
    getLatestMovies() {
        const today = moment().format('YYYY-MM-DD');
        const nextWeek = moment().add(1, "weeks").format('YYYY-MM-DD');        

        return this.load({
            path: 'discover/movie',
            query: {
                'primary_release_date.gte': today,
                'primary_release_date.lte': nextWeek
            }
        }).then(json => json.results);
    }

    getMovie(id) {
        return this.load({
            path: `movie/${id}`,
        });
    }

    getPopularMovies() {
        return this.load({
            path: 'discover/movie',
            query: {
                sort_by: 'popularity.desc'
            }
        }).then(json => json.results);
    }

    load({
        path = '',
        query = {}
    }) {        
        /* Comments are for popularMovies

            path: 'discover/movie'
            query: {
                sort_by: 'popularity.desc',
            }
        */        

        const defaultQuery = {
            api_key: API_KEY
        }

        const urlQuery = {
            ...defaultQuery,
            ...query
        }        

        const keys = Object.keys(urlQuery); // ['api_key', 'sort_by'];        
        const params = keys.map((key) => `${key}=${urlQuery[key]}`); // ['api_key=API_KEY', 'sort_by=popularity.desc']
        
        const url = `${API_ROOT}/${path}?${params.join('&')}`;

        return fetch(url)
            .then(result => result.json());            
        
    }
}

export default new Api();