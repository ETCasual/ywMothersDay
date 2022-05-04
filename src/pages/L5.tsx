import { FirebaseProps } from '../config/firebaseProps';
import { L5Screen } from '../modules/L5Screen';

const L5Page = () => (
  <FirebaseProps>
    <L5Screen />
  </FirebaseProps>
);

export default L5Page;
