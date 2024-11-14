import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Switch from '@/components/Switch';

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
  onDrop: (type: string, position: number) => void;
}> = ({ circuitType, onDrop }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text');
    onDrop(type, position);
  };

  return (
    <div className="relative h-[300px] w-full">
      <img 
        src={circuitType === 'serial' ? 'serialcircuit.png' : 'parallelcircuit.png'} 
        alt={`${circuitType} circuit`}
        className="w-full h-full object-contain"
      />
      
      {/* Placeholder drop zones - adjust positions based on circuit images */}
      <div
        onDrop={(e) => handleDrop(e, 1)}
        onDragOver={handleDragOver}
        className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg"
      />
      <div
        onDrop={(e) => handleDrop(e, 2)}
        onDragOver={handleDragOver}
        className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg"
      />
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
      className="flex items-center gap-2 p-2 bg-white border rounded-lg cursor-move hover:bg-gray-50"
    >
      <img 
        src={type === 'bulb' ? 'lightbulb-off.png' : 'resistor.png'}
        alt={type}
        className="w-8 h-8"
      />
      {type === 'bulb' ? 'Lightbulb' : 'Resistor'}
    </div>
  );
};

const OhmsLaw: React.FC = () => {
  const [circuitType, setCircuitType] = useState<'serial' | 'parallel'>('serial');
  const [isPowered, setIsPowered] = useState(false);
  const [voltage, setVoltage] = useState<number>(0);
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
    if (!isPowered || components.length !== 2 || voltage === 0) {
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
    setIsPowered(false);
  };

  const handleDragStart = (type: string) => {
    // Handle drag start if needed
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
    setIsPowered(false);
  };

  useEffect(() => {
    const calculatedCurrent = calculateCurrent();
    setCurrent(calculatedCurrent);
  }, [voltage, components, circuitType, isPowered]);

  return (
    <div className="max-w-8xl mx-auto p-12 space-y-8">

    {/* Deskripsi */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-1 order-2 md:order-1 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Ohm's Law</h2>
            <p className="text-gray-600 mb-4">
              Ohm's Law is a fundamental principle in electrical physics that explains the relationship between voltage (V), electric current (I), and resistance (R) in an electrical circuit. Discovered by Georg Simon Ohm in 1827, this law states that the electric current flowing through a material is directly proportional to the voltage applied and inversely proportional to the material's resistance. Simply put, the greater the resistance, the lower the current flow, and vice versa. Ohm's Law is essential for understanding and designing various electronic devices and electrical systems.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Formulas</h3>
            <ul className="space-y-2 text-gray-600">
              <li>V = IR (Ohm's Law)</li>
              <li>Series: Rtotal = R1 + R2</li>
              <li>Parallel: 1/Rtotal = 1/R1 + 1/R2</li>
            </ul>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center md:justify-start">
          <img src="georgohm.jpg" alt="Georg Ohm" className="w-48 h-48 rounded-lg object-cover" />
        </div>
    </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Component Selection */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Components</h3>
          <div className="space-y-4">
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
              <span>Power</span>
              <Switch
                checked={isPowered}
                onCheckedChange={setIsPowered}
              />
            </div>
          </div>
          <DropArea circuitType={circuitType} onDrop={handleDrop} />
          {components.map(comp => (
            comp.type === 'bulb' && isPowered && (
              <img
                key={comp.id}
                src="lightbulb-on.png"
                alt="Powered bulb"
                className="absolute"
                style={{
                  top: `${comp.position === 1 ? '25%' : '75%'}`,
                  left: `${comp.position === 1 ? '25%' : '75%'}`,
                  width: '64px',
                  height: '64px'
                }}
              />
            )
          ))}
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Circuit Analysis</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-2">Circuit Information</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Circuit Type: {circuitType === 'serial' ? 'Serial' : 'Parallel'}</li>
                <li>Power Status: {isPowered ? 'On' : 'Off'}</li>
                <li>Voltage: {voltage}V</li>
                <li>R1: {components[0].resistance}Ω</li>
                <li>R2: {components[1].resistance}Ω</li>
                <li>Total Resistance: {calculateTotalResistance().toFixed(2)}Ω</li>
                <li>Current: {current.toFixed(2)}A</li>
              </ul>

              <h4 className="text-lg font-medium mt-4 mb-2">Measurements Table</h4>
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

            {showPlot && dataPoints.length >= 2 && (
              <div>
                <h4 className="text-lg font-medium mb-2">R-I Characteristic</h4>
                <LineChart width={400} height={300} data={dataPoints}>
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OhmsLaw;