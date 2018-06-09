import React from 'react'
import Loadable from 'react-loadable';
// import Loader from 'lib/Loader'

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else {
    return null
  }
}

const LoadableEvent = Loadable({
  loader: () => import('pages/Event/EventWrapper'),
  loading : Loading
});

export const routes = [
  { 
    path: '/',
    exact: true,
    component: LoadableEvent
  }
]

