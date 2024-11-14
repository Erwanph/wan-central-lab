interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }
  
const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange }) => {
return (
    <button
    onClick={() => onCheckedChange(!checked)}
    className={`w-12 h-6 flex items-center rounded-full p-1 ${
        checked ? 'bg-blue-500' : 'bg-gray-300'
    }`}
    >
    <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-0'
        }`}
    ></div>
    </button>
);
};
  
  export default Switch;