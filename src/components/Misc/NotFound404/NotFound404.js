import React from 'react'
import PageError from '../PageError/PageError'

const NotFound404 = () => {
    return (
        <PageError
            error="Resource Not Found. Invalid path"
            severity="error" 
            svgPath="/images/not_found.svg" 
        />
    )
}

export default NotFound404
