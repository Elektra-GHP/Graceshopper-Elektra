import React, {Component} from 'react'
import {connect} from 'react-redux'

export class Account extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
            Name:
            <input />
          </label>

          <label>
            Email:
            <input />
          </label>

          <label>
            Address:
            <input />
          </label>
        </form>

        <div> .... pass orders! </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
