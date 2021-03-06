import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function checkoutHandler(_params, request) {
  return withGlobalState(request, globalState, { title: 'React Storefront - Check Out' })
}
