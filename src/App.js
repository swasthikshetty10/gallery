import { useState } from "react";
import { data } from "./data";

function App() {
  const [selected, setSelected] = useState({ id: 0, imageId: 0 });
  return (
    <div className="App">
      <div className="w-screen h-screen flex overflow-hidden">
        <div className={`scrollbar h-screen overflow-y-scroll p-4 items-center flex flex-col gap-4  bg-red-200 lg:w-1/4 w-full`}>
          {data.map((item, index) => <button key={index}
            onClick={(e) => {
              if (index + 1 === selected.id) { setSelected({ id: 0, imageId: 0 }); return }
              setSelected({ id: index + 1, imageId: 0 })
            }}
            className={`${index + 1 === selected.id ? 'bg-sky-500' : 'bg-sky-200'}
             w-full max-w-[10rem] bg-sky-200 px-3 py-2 rounded-md shadow-md font-semibold  
             hover:scale-105 transition-transform duration-200`}>
            {item.name}
          </button>)}
        </div>
        <div className="scrollbar w-full h-screen lg:w-2/4 bg-blue-100 flex flex-col  overflow-y-scroll">
          {selected.id === 0 && <p className="text-center p-4">Click on any subjects to show related images </p>}
          {
            selected.id !== 0 && data[selected.id - 1].images.map((item, index) => <div key={index}
              className={`${selected.imageId === index + 1 ? 'bg-sky-300' : 'bg-slate-200'} h-full cursor-pointer p-4`}
              onClick={() => {
                if (selected.imageId === index + 1) { setSelected((prev) => ({ ...prev, imageId: 0 })); return }
                setSelected((prev) => ({ ...prev, imageId: index + 1 }))
              }} >
              <img className="w-auto mx-auto h-full" src={item.url} />
            </div>
            )
          }
        </div>
        <div className="w-full h-screen scrollbar overflow-y-scroll lg:w-1/4 bg-yellow-100 flex flex-col gap-4 p-4">
          {/* links */}
          {selected.id != 0 && selected.imageId === 0 && <p className="text-center p-4">Click on any images to show related links</p>}

          {(selected.id !== 0 && selected.imageId !== 0) && data[selected.id - 1].images[selected.imageId - 1].links.map((item, index) => <a key={index} href={item} target="_blank" className="overflow-hidden bg-sky-200 px-3 py-2 rounded-md shadow-md font-semibold cursor-pointer  hover:scale-105 transition-transform duration-200   ">
            {item}
          </a>)}
        </div>
      </div>
    </div >
  );
}

export default App;

