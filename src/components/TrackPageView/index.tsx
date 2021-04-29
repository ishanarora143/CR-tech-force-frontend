import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { pageview } from '../../utils/gtag';

function TrackPageView() {
    const history = useHistory();

    const submitPageTrackData = (location: any) => {
        pageview(location.pathname)
    }

    useEffect(() => {
        submitPageTrackData(history.location)
        history.listen(location => {
            submitPageTrackData(location)
        })
    }, [history])

    return null
}

export default TrackPageView
