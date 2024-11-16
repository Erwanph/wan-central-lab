import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import OhmsDescription from './OhmsDescription';
import Quiz from './Quiz';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

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
  voltage: number;
  onDrop: (type: string, position: number) => void;
}> = ({ circuitType, components, voltage, onDrop }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    onDrop(type, position);
  };

  return (
    <div
      className="relative h-[340px] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('/${circuitType === 'serial' ? 'serial.png' : 'parallel.png'}')`,
      }}
    >
      {[1, 2].map((position) => (
        <div
          key={position}
          onDrop={(e) => handleDrop(e, position)}
          onDragOver={handleDragOver}
          className="absolute w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg"
          style={{
            top: circuitType === 'serial' 
              ? (position === 1 ? '1%' : '1%')  // Posisi vertikal untuk serial
              : (position === 1 ? '1%' : '34.3%'), // Posisi vertikal untuk paralel

            left: circuitType === 'parallel'
              ? (position === 1 ? '42%' : '42%')  // Posisi horisontal untuk serial (di tengah)
              : (position === 1 ? '25%' : '60%'), // Posisi horisontal untuk paralel
          }}
        >
          {components
            .filter((comp) => comp.position === position)
            .map((comp) => (
              <img
                key={comp.id}
                src={
                  comp.type === 'bulb' && voltage > 0 && components.length === 2
                    ? '/lightbulb-on.png'
                    : comp.type === 'bulb'
                    ? '/lightbulb-off.png'
                    : '/resistor.png'
                }
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
    e.dataTransfer.setData('text/plain', type);
    onDragStart(type);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center justify-center p-4 bg-white border rounded-lg cursor-move hover:bg-gray-50 w-36 h-36 relative"
    >
      <img
        src={type === 'bulb' ? '/lightbulb-off.png' : '/resistor.png'}
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
  const [components, setComponents] = useState<Component[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [showPlot, setShowPlot] = useState(false);

  const calculateTotalResistance = (): number => {
    if (components.length !== 2) return 0;

    if (circuitType === 'serial') {
      return components[0].resistance + components[1].resistance;
    } else {
      return 1 / (1 / components[0].resistance + 1 / components[1].resistance);
    }
  };

  const calculateCurrent = (): number => {
    if (components.length !== 2 || voltage === 0 || components.some((comp) => comp.resistance === 0)) {
      return 0;  
    }
  
    const totalResistance = calculateTotalResistance();
    return voltage / totalResistance;
  };

  const handleCircuitTypeChange = (newType: 'serial' | 'parallel') => {
    setCircuitType(newType);
    setComponents([]);
    setDataPoints([]);
    setShowPlot(false);
    // setCurrent(null);
  };

  const handleDrop = (type: string, position: number) => {
    if (type !== 'bulb' && type !== 'resistor') return;

    if (!components.some((comp) => comp.position === position)) {
      const newComponent: Component = {
        id: Date.now(),
        type: type as 'bulb' | 'resistor',
        resistance: 10,
        position,
      };
      setComponents([...components, newComponent]);
    }
  };

  // const handleClear = () => {
  //   setComponents([]);
  //   setVoltage(0);
  //   setCurrent(null);
  //   setDataPoints([]);
  //   setShowPlot(false);
  // };

  const handleAddToTable = () => {
    const totalResistance = calculateTotalResistance();
    const calculatedCurrent = calculateCurrent();

    if (
      voltage > 0 &&
      components.length === 2 &&
      components.every((comp) => comp.resistance > 0) &&
      calculatedCurrent !== null
    ) {
      const isDuplicate = dataPoints.some(
        (data) =>
          data.resistance1 === components[0].resistance &&
          data.resistance2 === components[1].resistance &&
          data.voltage === voltage
      );

      if (!isDuplicate) {
        setDataPoints((prevDataPoints) => [
          ...prevDataPoints,
          {
            resistance1: components[0].resistance,
            resistance2: components[1].resistance,
            totalResistance,
            voltage,
            current: calculatedCurrent,
          },
        ]);
      }
    }
  };

  const exportTable = () => {
    const csvData = [
      ['R1 (Ω)', 'R2 (Ω)', 'Total R (Ω)', 'Voltage (V)', 'Current (A)'],
      ...dataPoints.map((data) => [
        data.resistance1,
        data.resistance2,
        data.totalResistance.toFixed(2),
        data.voltage,
        data.current.toFixed(2),
      ]),
    ];

    const csvContent = csvData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'ohms_law_table.csv');
  };

  const exportPlot = () => {
    const chartElement = document.querySelector('.bg-white.p-6.shadow.mt-8');
    if (chartElement) {
      html2canvas(chartElement as HTMLElement).then((canvas: HTMLCanvasElement) => {
        canvas.toBlob((blob) => {
          if (blob) saveAs(blob, 'ohms_law_plot.png');
        });
      });
    }
  };

  useEffect(() => {
    const calculatedCurrent = calculateCurrent();
    setCurrent(calculatedCurrent);  
  }, [voltage, components, circuitType]);

  return (
    <div className="max-w-8xl mx-auto p-12 space-y-8">
      <OhmsDescription />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Components</h3>
          <div className="flex justify-center space-x-6">
            <DraggableComponent type="bulb" onDragStart={() => {}} />
            <DraggableComponent type="resistor" onDragStart={() => {}} />
          </div>
        </div>

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
          </div>
          <DropArea
            circuitType={circuitType}
            components={components}
            voltage={voltage}
            onDrop={handleDrop}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Circuit Controls</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Voltage (V)</label>
              <input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(Math.max(0, Number(e.target.value)))}
                className="w-full border rounded p-2"
                min="0"
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
                    const index = newComponents.findIndex((c) => c.id === comp.id);
                    newComponents[index].resistance = Math.max(0, Number(e.target.value));
                    setComponents(newComponents);
                  }}
                  className="w-full border rounded p-2"
                  min="0"
                />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded">
              <h4 className="text-md font-medium mb-2">Data Table</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th>R1 (Ω)</th>
                    <th>R2 (Ω)</th>
                    <th>Total R (Ω)</th>
                    <th>Voltage (V)</th>
                    <th>Current (A)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPoints.map((data, index) => (
                    <tr key={index}>
                      <td>{data.resistance1}</td>
                      <td>{data.resistance2}</td>
                      <td>{data.totalResistance.toFixed(2)}</td>
                      <td>{data.voltage}</td>
                      <td>{data.current.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddToTable}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add to Table
            </button>
            <button
              onClick={exportTable}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Export Table
            </button>
            <button
              onClick={() => setShowPlot(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={dataPoints.length < 2}
            >
              Plot
            </button>
            <button
              onClick={exportPlot}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              disabled={!showPlot}
            >
              Export Plot
            </button>
          </div>
        </div>
      </div>

      {showPlot && (
        <div className="bg-white p-6 rounded-lg shadow mt-8">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataPoints} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="voltage" label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Current (A)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="current" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <Quiz />
    </div>
  );
};

export default OhmsLaw;