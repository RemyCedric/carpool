/* eslint-disable no-console */
import { useParams } from 'react-router-dom';

export default function Evenement(): React.ReactElement {
    const params = useParams();
    console.log(params.eventId);
    return <></>;
}
