import React, { PureComponent } from 'react'

export default class RenderError extends PureComponent {
  render() {
    return (
      <div style={{
        background: "red",
        color: "#fff",
        padding: ".5rem",
        fontFamily: "monospace",
        marginBottom: "1rem"
      }}>
        There was a render error: {this.props.componentName}
      </div>
    )
  }
}
