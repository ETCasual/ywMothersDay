import { FirebaseProps } from '../config/firebaseProps';
import { Approval } from '../modules/Approval';

const ApprovalPage = () => (
  <FirebaseProps>
    <Approval />
  </FirebaseProps>
);

export default ApprovalPage;
