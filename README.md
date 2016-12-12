##Preact + RxJS subscribe decorator

Class decorator, returns Preact component which subscribes to given Rx.Subject(s), Optionally filters incoming values and renders new state as props on the target component. It does not affect manually given props.
I'm using RxJS streams as redux-like stores, with `scan` to reduce state. A store is basically a Rx.Subject that holds an object `{}` called state, which might change over time.
Components can subscribe to these changes and re-render when the state of the store changes.
Optionally: specify keys as arguments to subscribe only to those properties in state from given store(s).  

This decorator only works with Preact.  
Also make sure not to pass DOM elements (or circular structures) to your store, that will break because i'm using `JSON.stringify` to compare state.

Version 0.001, feel free to comment or to create a pull request.  

###Usage:
```
// Subscribe to all changes of a store
import { h, Component } from 'preact'
import SomeStore from '../stores/some-store'

@(SomeStore)
export default class MyPage extends Component {

  constructor() {
    super()
  }

  render = (props, state) => <h1>There is my { props.value }!</h1>

  // OR..
  // render = ({ value }) => <h1>There is my { value }!</h1>
}
```
```
// Filter on property from a store
import { h, Component } from 'preact'
import SomeStore from '../stores/some-store'

@(SomeStore, 'someProperty')
export default class MyPage extends Component {

  constructor() {
    super()
  }

  render = (props, state) => <h1>There is my { props.someProperty }!</h1>

  // OR..
  // render = ({ someProperty: value }) => <h1>There is my { value }!</h1>
}
```
```
// Using multiply stores and/or properties
@(SomeStore, 'someProperty', 'otherProperty')
@([SomeStore, OtherStore], 'someProperty')
@([SomeStore, OtherStore], 'someProperty', 'otherProperty', 'someOtherProperty')
```
