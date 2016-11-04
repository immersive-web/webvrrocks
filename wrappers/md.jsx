import React from 'react'
import DocumentTitle from 'react-document-title'
import { config } from 'config'

module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },
  render () {
    const homeActive = this.props.location.pathname === '/'
    const post = this.props.route.page.data
    const title = homeActive ? config.siteTitle : `${post.title} | ${config.siteTitle}`

    return (
      <DocumentTitle title={title}>
        <div className="markdown">
          <h1>{post.title} {post.permalink}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </DocumentTitle>
    )
  },
})
