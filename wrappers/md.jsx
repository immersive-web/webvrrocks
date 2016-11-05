import React from 'react';
import DocumentTitle from 'react-document-title';
import { config } from 'config';
import { prefixLink } from 'gatsby-helpers';

module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object
    }
  },
  render () {
    const isHome = this.props.location.pathname === prefixLink('/');
    const post = this.props.route.page.data;
    const title = isHome ? config.siteTitle : `${post.title} | ${config.siteTitle}`;

    return (
      <DocumentTitle title={title}>
        <div className="markdown">
          <h1>{post.title} {post.permalink}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </DocumentTitle>
    );
  },
});

