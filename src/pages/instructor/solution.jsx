import React from 'react'
import { Helmet } from 'react-helmet'
import { SolutionView } from 'src/section/instructor/solutions/view'

const Solution = () => {
    return (
        <>
            <Helmet>
                <title>Solutions : Instructor</title>
            </Helmet>
            <SolutionView />
        </>
    )
}

export default Solution
