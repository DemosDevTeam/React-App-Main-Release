import compose from './compose'
import { hasLoading} from './hoc'
import ErrorBoundary from './ErrorBoundary'
// to.js
function to(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
 }

export {
    compose,
    to,
    ErrorBoundary,
    hasLoading
}