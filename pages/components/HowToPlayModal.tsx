import React from "react";

export default function HowToPlayModal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="bg-gray-600 active:bg-gray-700 text-white font-bold uppercase text-sm px-6 py-5 mt-5 rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        How To Play
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl text-center">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="text-center p-5 border-b border-solid border-slate-200">
                  <h3 className="text-3xl text-slate-900 font-semibold">
                    Instructions
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    You have to guess the WORDLE in six attempts.<br/>
                    Each guess is a five-letter word. To submit your guess, hit ENTER.<br/>
                    The colour of the tiles will change to show you how close your guess is.
                    <div className="flex m-auto py-2 w-52 h-14">
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">A</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-emerald-700 bg-emerald-600">U</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">D</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">I</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">O</div>
                    </div>
                    The letter U is in the word and in the correct position.
                    <div className="flex m-auto py-2 w-52 h-14">
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">S</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">H</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">A</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-yellow-700 bg-yellow-600">P</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">E</div>
                    </div>
                    The letter P is in the word but in the incorrect position.
                    <div className="flex m-auto py-2 w-52 h-14">
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">W</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">R</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">O</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">N</div>
                      <div className="flex-1 pt-2 text-white text-sm font-bold uppercase place-items-center rounded-md border-2 border-solid border-gray-700 bg-gray-600">G</div>
                    </div>
                    The letter W is not in the word, in any position.
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-slate-900 background-transparent font-bold uppercase px-1 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Let's play!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
