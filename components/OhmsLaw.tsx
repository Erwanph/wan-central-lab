import { useState, useEffect } from 'react';
import {  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Switch from '@/components/Switch';
import OhmsDescription from './OhmsDescription';
import Quiz from './Quiz';

interface Component {
  id: number;
  type: 'bulb' | 'resistor';
  resistance: number;
  position: number;
}

interface DataPoint {
  resistance1: number;
  resistance2: number;
  totalResistance: number;
  voltage: number;
  current: number;
}

const DropArea: React.FC<{
  circuitType: 'serial' | 'parallel';
  components: Component[];
  onDrop: (type: string, position: number) => void;
}> = ({ circuitType, components, voltage, onDrop}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text');
    onDrop(type, position);
  };

  return (
    <div 
      className="relative h-[340px] w-full bg-cover bg-center"
      style={{ backgroundImage: `url('${circuitType === 'serial' ? 'serial.png' : 'parallel.png'}')` }}
    >
      {[1, 2].map(position => (
        <div
          key={position}
          onDrop={(e) => handleDrop(e, position)}
          onDragOver={handleDragOver}
          className="absolute w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg"
          style={{
            top: position === 1 ? '25%' : '75%',
            left: position === 1 ? '25%' : '75%',
          }}
        >
          {components
            .filter(comp => comp.position === position)
            .map(comp => (
              <img
                key={comp.id}
                src={comp.type === 'bulb' && voltage >0 && components.length===2? 'lightbulb-on.png' : 'lightbulb-off.png'}
                alt={comp.type}
                className="absolute w-16 h-16"
              />
          ))}
        </div>
      ))}
    </div>
  );
};


const DraggableComponent: React.FC<{
  type: string;
  onDragStart: (type: string) => void;
}> = ({ type, onDragStart }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text', type);
    onDragStart(type);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center justify-center p-4 bg-white border rounded-lg cursor-move hover:bg-gray-50 w-36 h-36 relative"
    >
      <img
        src={type === 'bulb' ? 'lightbulb-off.png' : 'resistor.png'}
        alt={type}
        className={`absolute ${type === 'bulb' ? 'w-16 h-20' : 'w-22 h-12'}`}
        style={{
          top: type === 'bulb' ? '15px' : '35px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <span
        className="absolute text-center w-full"
        style={{
          bottom: type === 'bulb' ? '10px' : '10px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {type === 'bulb' ? 'Lightbulb' : 'Resistor'}
      </span>
    </div>
  );
};


const OhmsLaw: React.FC = () => {
  const [circuitType, setCircuitType] = useState<'serial' | 'parallel'>('serial');
  const [voltage, setVoltage] = useState<number>(0);
  const [firstVoltage, setFirstVoltage] = useState(null);  
  const [components, setComponents] = useState<Component[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [showPlot, setShowPlot] = useState(false);

  const calculateTotalResistance = (): number => {
    if (components.length !== 2) return 0;
    
    if (circuitType === 'serial') {
      return components[0].resistance + components[1].resistance;
    } else {
      return 1 / (1/components[0].resistance + 1/components[1].resistance);
    }
  };

  const calculateCurrent = (): number | null => {
    if (components.length !== 2 || voltage === 0) {
      return null;
    }

    if (components.some(comp => comp.resistance === 0)) {
      return null;
    }

    const totalResistance = calculateTotalResistance();
    return voltage / totalResistance;
  };

  const handleCircuitTypeChange = (newType: 'serial' | 'parallel') => {
    setCircuitType(newType);
    setComponents([]);
    setDataPoints([]);
    setShowPlot(false);
    setCurrent(null);
  };

  const handleDragStart = (type: string) => {
  };

  const handleDrop = (type: string, position: number) => {
    if (!components.some(comp => comp.position === position)) {
      const newComponent: Component = {
        id: Date.now(),
        type: type as 'bulb' | 'resistor',
        resistance: 10,
        position
      };
      setComponents([...components, newComponent]);
    }
  };

  const handleAddToTable = () => {
    const calculatedCurrent = calculateCurrent();
    if (calculatedCurrent !== null && components.length === 2) {
      const totalResistance = calculateTotalResistance();
      setDataPoints([...dataPoints, {
        resistance1: components[0].resistance,
        resistance2: components[1].resistance,
        totalResistance,
        voltage,
        current: calculatedCurrent
      }]);
    }
  };

  const handleClear = () => {
    setComponents([]);
    setVoltage(0);
    setCurrent(null);
    setDataPoints([]);
    setShowPlot(false);
  };

  useEffect(() => {
    const calculatedCurrent = calculateCurrent();
    setCurrent(calculatedCurrent);
  }, [voltage, components, circuitType]);

  return (
    <div className="max-w-8xl mx-auto p-12 space-y-8">
      <OhmsDescription/>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Component Selection */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Components</h3>
          <div className="flex justify-center space-x-6">
            <DraggableComponent type="bulb" onDragStart={handleDragStart} />
            <DraggableComponent type="resistor" onDragStart={handleDragStart} />
          </div>
        </div>

        {/* Circuit Area */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <select
              value={circuitType}
              onChange={(e) => handleCircuitTypeChange(e.target.value as 'serial' | 'parallel')}
              className="border rounded p-2"
            >
              <option value="serial">Serial Circuit</option>
              <option value="parallel">Parallel Circuit</option>
            </select>
            <div className="flex items-center gap-2">
            </div>
          </div>
          <DropArea circuitType={circuitType} components={components} voltage={voltage} onDrop={handleDrop} />
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Circuit Controls</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Voltage (V)</label>
              <input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(Math.min(20, Math.max(0, Number(e.target.value))))}
                className="w-full border rounded p-2"
                min="0"
                max="20"
              />
            </div>
            {components.map((comp) => (
              <div key={comp.id}>
                <label className="block text-sm font-medium mb-1">
                  {comp.type === 'bulb' ? 'Lightbulb' : 'Resistor'} {comp.position} Resistance (Ω)
                </label>
                <input
                  type="number"
                  value={comp.resistance}
                  onChange={(e) => {
                    const newComponents = [...components];
                    const index = newComponents.findIndex(c => c.id === comp.id);
                    newComponents[index].resistance = Math.min(100, Math.max(0, Number(e.target.value)));
                    setComponents(newComponents);
                  }}
                  className="w-full border rounded p-2"
                  min="0"
                  max="100"
                />
              </div>
            ))}
          </div>
          <div className="space-x-2 space-y-4">
              <button
                onClick={handleAddToTable}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add to Table
              </button>
              <button
                onClick={() => setShowPlot(true)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={dataPoints.length < 2}
              >
                Plot
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear
              </button>
            </div>
        </div>
      </div>

      {/* Results Section */}
      {current !== null && components.length === 2 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-center items-center mb-4">
            <h3 className="text-xl font-semibold">Circuit Analysis</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10">
            {/* Circuit Information */}
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-medium mt-2 mb-2">Circuit Information</h4>
              <ul className="space-y-2 text-gray-900">
                <li>Circuit Type: {circuitType === 'serial' ? 'Serial' : 'Parallel'}</li>
                <li>Voltage: {voltage}V</li>
                <li>R1: {components[0].resistance}Ω</li>
                <li>R2: {components[1].resistance}Ω</li>
                <li>Total Resistance: {calculateTotalResistance().toFixed(2)}Ω</li>
                <li>Current: {current.toFixed(2)}A</li>
              </ul>
            </div>

            {/* Measurements Table */}
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-medium mt-2 mb-2">Measurements Table</h4>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border p-2">Voltage (V)</th>
                    <th className="border p-2">R1 (Ω)</th>
                    <th className="border p-2">R2 (Ω)</th>
                    <th className="border p-2">Rtotal (Ω)</th>
                    <th className="border p-2">Current (A)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPoints.map((point, index) => (
                    <tr key={index}>
                      <td className="border p-2">{point.voltage}</td>
                      <td className="border p-2">{point.resistance1}</td>
                      <td className="border p-2">{point.resistance2}</td>
                      <td className="border p-2">{point.totalResistance.toFixed(2)}</td>
                      <td className="border p-2">{point.current.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* R-I Plot */}
            {showPlot && dataPoints.length >= 2 && (
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-medium mt-2 mb-2">R-I Plot</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dataPoints}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="totalResistance"
                      label={{ value: 'Total Resistance (Ω)', position: 'bottom' }}
                    />
                    <YAxis
                      label={{ value: 'Current (A)', angle: -90, position: 'left' }}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="current" stroke="#2563eb" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      )}

      <Quiz/>
    </div>
  );
};

export default OhmsLaw;