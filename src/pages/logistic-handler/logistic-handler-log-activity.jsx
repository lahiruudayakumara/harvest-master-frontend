import React from "react";
import { Helmet } from "react-helmet";
import { LogActivityView } from "../../section/logistic-handler/log-activity/view";
const LogisticHandlerLogActivity = () => {
    return (
        <>
            <Helmet>
                <title>Log Activity : Logisic Handler</title>
            </Helmet>
            <LogActivityView />
        </>
    )
}

export default LogisticHandlerLogActivity