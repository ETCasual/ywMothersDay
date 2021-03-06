import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { useDatabase } from 'reactfire';
import { useSubmitted } from '../store/useSubmitted';
import { ToastContainer, toast } from 'react-toastify';

export const Mobile: React.FC = () => {
  const dbRef = useDatabase();

  const { setSubmitted, value } = useSubmitted();

  const updateText = () => {
    return set(ref(dbRef, `/${encodeURI(name)}-${encodeURI(cg)}`), {
      approved: false,
      text: text,
      name: name,
      cg: cg,
    });
  };

  const [name, setName] = useState<string>('');
  const [cg, setCG] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return typeof window !== 'undefined' ? (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center p-5 bg-secondary">
        <div className=" w-full p-5 flex flex-col rounded-xl bg-white">
          <p className="text-xl font-roboto font-bold text-primary mb-1">你的名字</p>
          <input
            className="rounded-md px-2 py-1 border-2 border-primary font-roboto mb-2"
            disabled={loading}
            onChange={(e) => (e.target.value ? setName(e.target.value) : null)}
            placeholder={value ? value.name : 'Your Name...'}
          />
          <p className="text-xl font-roboto font-bold text-primary mb-1">你的小组</p>
          <input
            className="rounded-md px-2 py-1 border-2 border-primary font-roboto mb-2"
            disabled={loading}
            placeholder={value ? value.cg : 'Your CG...'}
            onChange={(e) => (e.target.value ? setCG(e.target.value) : null)}
          />
          <p className="text-xl font-roboto font-bold text-primary mb-1">Say Something!</p>
          <textarea
            className="rounded-md border-2 px-2 py-1 border-primary font-roboto"
            rows={3}
            style={{ resize: 'none' }}
            disabled={loading}
            placeholder={value ? value.text : 'Say Something!'}
            onChange={(e) => (e.target.value ? setText(e.target.value) : null)}
          />
          <button
            className="w-full px-2 py-1 font-roboto font-bold text-xl rounded-lg bg-primary text-white mt-3"
            disabled={loading}
            onClick={async () => {
              if (name && cg && text) {
                setLoading(true);
                await updateText()
                  .then(() => {
                    setSubmitted({
                      text: text,
                      name: name,
                      cg: cg,
                    });
                    toast('Submitted!', {
                      type: 'success',
                      position: 'bottom-center',
                      theme: 'colored',
                    });
                  })
                  .finally(() => setLoading(false));
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  ) : (
    <>Loading</>
  );
};
