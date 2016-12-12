import { Observable } from 'rxjs'
import { h } from 'preact'

export default (store, ...args) => TargetComponent => class extends TargetComponent {

  stores = store.length ? store : [store]

  constructor() {
    super()
  }

  filterState = state => JSON.stringify(args.reduce((acc, curr) => ({ ...acc, [curr]: state[curr] }), {}))

  filterStores = stores => args.length
    ? Observable.merge(...stores.map($ => $
        .startWith({})
        .distinctUntilChanged((a, b) => a === b, ::this.filterState)))
    : Observable.merge(...stores)

  componentDidMount = () => this.subscription = this.filterStores(this.stores).subscribe(::this.setState)

  componentWillUnmount = () => this.subscription.unsubscribe()

  shouldComponentUpdate = (prevState, nextState) => JSON.stringify(prevState) !== JSON.stringify(nextState)

  render = (props, state) => <TargetComponent { ...props } { ...state } />

}
