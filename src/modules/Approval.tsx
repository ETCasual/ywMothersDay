import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { useDatabase, useDatabaseObjectData } from 'reactfire';
import { useSubmitted } from '../store/useSubmitted';
import { ToastContainer, toast } from 'react-toastify';

export const Approval: React.FC = () => {
  const dbRef = useDatabase();

  const gameRef = ref(dbRef, '/');
  const { status, data } =
    useDatabaseObjectData<
      Record<string, { approved: boolean; text: string; name: string; cg: string }>
    >(gameRef);

  return status === 'success' ? (
    <div className="w-full h-screen" style={{ backgroundColor: '#f7941d' }}>
      <div className="w-full  grid grid-cols-1 gap-5 p-5" style={{ backgroundColor: '#f7941d' }}>
        {Object.values(data).map((d, i) =>
          d && !d.approved ? <PostCard name={d.name} cg={d.cg} text={d.text} key={i} /> : null
        )}
      </div>
      <ToastContainer />
    </div>
  ) : (
    <>Loading</>
  );
};

interface PostCardProps {
  name: string;
  cg: string;
  text: string;
}

const PostCard: React.FC<PostCardProps> = ({ name, cg, text }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const dbRef = useDatabase();

  const updateApproval = () => {
    return set(ref(dbRef, `/${encodeURI(name)}-${encodeURI(cg)}`), {
      approved: true,
      text: text,
      name: name,
      cg: cg,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl flex p-3 font-roboto flex-col">
      <p className="font-bold text-xl">{name}</p>
      <p className="text-lg">{cg}</p>
      <p className="text-xl mb-1">{text}</p>
      <button
        onClick={() =>
          updateApproval()
            .then(() => {
              toast(`${name} - ${cg} Approved!`, {
                type: 'success',
                position: 'bottom-center',
                theme: 'colored',
              });
            })
            .finally(() => setLoading(false))
        }
        disabled={loading}
        className="bg-[#00C851] hover:bg-[#00b159] rounded-xl px-2 py-1 text-white font-roboto font-bold"
      >
        Approve
      </button>
    </div>
  );
};
