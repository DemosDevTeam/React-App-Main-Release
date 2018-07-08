import React from 'react'

import Loading from './Loading'

export const hasProps = (injectedProps) => (WrappedCompponent) => {
    const HasProps = props => <WrappedCompponent {...injectedProps} {...props} />

    return HasProps
}

export const branch = (test, ComponentOnSuccess, ComponentOnFailure) => props => test
    ? <ComponentOnSuccess {...props} />
    : ComponentOnFailure 
        ? <ComponentOnFailure {...props} />
        : null;

export const hasLoader = WrappedComponent => {
    const HasLoader = props => branch(
        props.loading,
        hasProps({message: props.loadingMessage})(Loading),
        WrappedComponent
    )(props)
    
    return HasLoader
}
