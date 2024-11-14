'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DropAreaProps {
  id: string;
  isActive: boolean;
  onDrop: (e: React.DragEvent) => void;
  className: string;
}

const DropArea: React.FC<DropAreaProps> = ({ id, isActive, onDrop, className }) => {
  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      id={id}
      className={`${className} ${isActive ? 'border-dashed' : 'border-solid'} border-2 border-[#0c2522] absolute z-10 w-[100px] h-[100px] overflow-hidden`}
      onDrop={onDrop}
      onDragOver={allowDrop}
    />
  );
};

const OhmsLaw = () => {
  const [currentLayout, setCurrentLayout] = useState<'serial' | 'parallel'>('serial');
  const [isPowered, setIsPowered] = useState(false);
  const [voltage, setVoltage] = useState(0);
  const [resistance, setResistance] = useState(0);
  const [currentFlow, setCurrentFlow] = useState(0);
  const [serialSlot1Content, setSerialSlot1Content] = useState<string | null>(null);
  const [serialSlot2Content, setSerialSlot2Content] = useState<string | null>(null);
  const [parallelSlot1Content, setParallelSlot1Content] = useState<string | null>(null);
  const [parallelSlot2Content, setParallelSlot2Content] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent, itemType: string) => {
    e.dataTransfer.setData('text', itemType);
  };

  const handleDrop = (e: React.DragEvent, position: string) => {
    e.preventDefault();
    const itemType = e.dataTransfer.getData('text');
    
    switch (position) {
      case 'serial1':
        setSerialSlot1Content(itemType);
        break;
      case 'serial2':
        setSerialSlot2Content(itemType);
        break;
      case 'parallel1':
        setParallelSlot1Content(itemType);
        break;
      case 'parallel2':
        setParallelSlot2Content(itemType);
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/background1.avif')" }}>
      <main className="flex-1 flex flex-col items-center justify-center pb-8">

        <div className="w-4/5 h-10 flex">
          <button
            onClick={() => setCurrentLayout('serial')}
            className={`h-10 w-20 rounded-t-md ${
              currentLayout === 'serial' 
                ? 'bg-[#C4DAD2] text-[#16423C]' 
                : 'bg-[#16423C] text-[#E9EFEC] shadow-inner'
            }`}
          >
            Serial
          </button>
          <button
            onClick={() => setCurrentLayout('parallel')}
            className={`h-10 w-20 rounded-t-md -ml-1 ${
              currentLayout === 'parallel' 
                ? 'bg-[#C4DAD2] text-[#16423C]' 
                : 'bg-[#16423C] text-[#E9EFEC] shadow-inner'
            }`}
          >
            Parallel
          </button>
        </div>

        <div className="w-4/5 h-4/5 bg-[#C4DAD2] rounded-b-xl rounded-tr-xl shadow-md flex">
          <div className="w-1/4 p-5 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Circuit Components</h1>
            <div className="w-4/5 h-1/2 border-2 border-[#16423C] rounded">
              <h2 className="text-xl border-b-2 border-[#16423C] p-2">Select Component</h2>
              <div className="h-1/2 flex items-center justify-center border-b-2 border-[#16423C]">
                <Image
                  src="/resistor.png"
                  alt="Resistor"
                  width={100}
                  height={50}
                  className="cursor-move"
                  draggable
                  onDragStart={(e) => handleDrag(e, 'resistor')}
                />
              </div>
              <div className="h-1/2 flex items-center justify-center">
                <Image
                  src="/lightbulb-off.png"
                  alt="Light Bulb"
                  width={50}
                  height={90}
                  className="cursor-move"
                  draggable
                  onDragStart={(e) => handleDrag(e, 'lightbulb')}
                />
              </div>
            </div>
          </div>

          {/* Middle Section - Circuit */}
          <div className="w-1/2 p-5 relative">
            <div className="flex justify-center mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isPowered}
                  onChange={() => setIsPowered(!isPowered)}
                />
                <div className="w-24 h-12 bg-red-600/70 peer-checked:bg-[#16423ca4] rounded-full
                               after:content-[''] after:absolute after:top-0.5 after:left-0.5
                               after:bg-white after:border-[#0c2522] after:border-2 after:h-10 after:w-10
                               after:rounded-full after:transition-all peer-checked:after:translate-x-12">
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    {isPowered ? 'ON' : 'OFF'}
                  </span>
                </div>
              </label>
            </div>

            {/* Circuit Area */}
            <div className="relative h-[80%] bg-contain bg-no-repeat bg-center"
                 style={{ backgroundImage: `url('/${currentLayout}.png')` }}>
              {currentLayout === 'serial' ? (
                <>
                  <DropArea
                    id="serialSlot1"
                    isActive={!serialSlot1Content}
                    onDrop={(e) => handleDrop(e, 'serial1')}
                    className="top-[2%] left-[28%]"
                  />
                  <DropArea
                    id="serialSlot2"
                    isActive={!serialSlot2Content}
                    onDrop={(e) => handleDrop(e, 'serial2')}
                    className="top-[2%] left-[57%]"
                  />
                </>
              ) : (
                <>
                  <DropArea
                    id="parallelSlot1"
                    isActive={!parallelSlot1Content}
                    onDrop={(e) => handleDrop(e, 'parallel1')}
                    className="top-[1.5%] left-[42.5%]"
                  />
                  <DropArea
                    id="parallelSlot2"
                    isActive={!parallelSlot2Content}
                    onDrop={(e) => handleDrop(e, 'parallel2')}
                    className="top-[32%] left-[42.5%]"
                  />
                </>
              )}
            </div>
          </div>

          {/* Right Section - Controls */}
          <div className="w-1/4 p-5">
            <div className="h-[70%] bg-[#C4DAD2] rounded-lg p-4">
              <div className="mb-8">
                <h2 className="text-[#16423C] text-xl font-bold mb-2">V</h2>
                <p className="mb-4">Voltage (Battery only)</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={voltage}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                  className="w-32 rotate-270"
                />
                <p>{voltage} V</p>
              </div>

              <div className="mb-8">
                <h2 className="text-[#16423C] text-xl font-bold mb-2">R</h2>
                <p className="mb-4">Resistance (Per Component)</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={resistance}
                  onChange={(e) => setResistance(Number(e.target.value))}
                  className="w-32 rotate-270"
                />
                <p>{resistance} Ω</p>
              </div>
            </div>

            <div className="mt-4 text-xl">
              Current Flow: {currentFlow} A
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OhmsLaw;