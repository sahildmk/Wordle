import React from "react";

const HowToPlayModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="mt-5 rounded bg-gray-600 px-6 py-5 text-sm font-bold uppercase tracking-wider text-white active:bg-gray-700"
        type="button"
        onClick={() => setShowModal(true)}
      >
        How To Play
      </button>
      {showModal ? (
        <>
          <div className="animate-modal-show fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl text-center">
              <div className="border-800 flex w-full flex-col rounded-lg bg-slate-800 shadow-lg outline-none focus:outline-none">
                <div className="border-b border-solid border-slate-200 p-6 text-center">
                  <h3 className="text-3xl font-semibold text-slate-200">
                    Instructions
                  </h3>
                </div>
                <div className="relative flex-auto p-6">
                  <div className="my-4 text-lg leading-relaxed text-slate-200">
                    You have to guess the WORDLE in six attempts.
                    <br />
                    Each guess is a five-letter word. To submit your guess, hit
                    ENTER.
                    <br />
                    The colour of the tiles will change to show you how close
                    your guess is.
                    <div className="m-auto flex h-14 w-56 py-2">
                      <div className="how-to-play-default-tile">A</div>
                      <div className="how-to-play-correct-tile">U</div>
                      <div className="how-to-play-default-tile">D</div>
                      <div className="how-to-play-default-tile">I</div>
                      <div className="how-to-play-default-tile">O</div>
                    </div>
                    The letter U is in the word and in the correct position.
                    <div className="m-auto flex h-14 w-56 py-2">
                      <div className="how-to-play-default-tile">S</div>
                      <div className="how-to-play-default-tile">H</div>
                      <div className="how-to-play-default-tile">A</div>
                      <div className="how-to-play-incorrect-tile">P</div>
                      <div className="how-to-play-default-tile">E</div>
                    </div>
                    The letter P is in the word but in the incorrect position.
                    <div className="m-auto flex h-14 w-56 py-2">
                      <div className="how-to-play-default-tile">W</div>
                      <div className="how-to-play-default-tile">R</div>
                      <div className="how-to-play-default-tile">O</div>
                      <div className="how-to-play-default-tile">N</div>
                      <div className="how-to-play-default-tile">G</div>
                    </div>
                    The letter W is not in the word, in any position.
                  </div>
                </div>
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mr-1 mb-1 px-1 font-bold uppercase text-slate-200 outline-none transition-all duration-150 ease-linear hover:text-slate-400 focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Let's play!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
        </>
      ) : null}
    </>
  );
};

export default HowToPlayModal;
