import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class Repo extends Component {
  render() {
    const { route } = this.props;
    const { repo } = route.params;

    console.tron.log(repo);

    return <WebView source={{ uri: repo.html_url }} />;
  }
}

export default Repo;
