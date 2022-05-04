import { FirebaseProps } from '../config/firebaseProps';
import { Mobile } from '../modules/mobile';

const IndexPage = () => (
  <FirebaseProps>
    <Mobile />
  </FirebaseProps>
);

export default IndexPage;
